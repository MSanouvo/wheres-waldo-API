const { Router } = require("express")
const { PrismaClient } = require("@prisma/client");
require("dotenv").config()

const prisma = new PrismaClient()
const index = Router()

//Game Vars
let START_TIME = 0
let END_TIME = 0
let TOTAL_TIME = 0
let TARGETS = []

// function secondsToTime(time){
//     const hour = Math.floor(time / 3600).toString().padStart(2,'0')
//     const min = Math.floor(time % 3600 / 60).toString().padStart(2,'0')
//     const sec = Math.floor(time % 60).toString().padStart(2,'0')

//     return hour + ':' + min + ':' + sec;
// }

function startTime() {
    START_TIME = new Date()
    // console.log('Start Time')
    // console.log(START_TIME)
}

function endTime() {
    END_TIME = new Date()
    TOTAL_TIME = Math.floor((END_TIME - START_TIME) / 1000)
    // console.log('End Time')
    // console.log(END_TIME)
    // console.log(TOTAL_TIME)
}

async function setTargets(id) {
    TARGETS = []
    const targets = await prisma.targets.findMany({
        where: {
            mapId: id
        },
        include: {
            Icons: true
        }
    })
    // console.log(targets)
    targets.map(target => {
        TARGETS.push(target)
    })

}

index.get('/game/start', async (req, res) => {
    startTime()

    //if we add more maps
    //MAP_NAME = req.body.map

    const map = await prisma.map.findMany({
        where: {
            //name: MAP_NAME
            name: "Map 1"
        }
    })
    // console.log(map)
    await setTargets(map[0].id)

    res.json({ image: map[0].url, targets: TARGETS })
})

// Returning most recent score, assuming it is the latest entry submitted by the user
index.get('/game/score', async (req, res) => {
    // console.log('getting score')
    const score = await prisma.leaderboard.findMany({
        orderBy: {
            id: 'desc'
        }
    })
    // console.log(score)
    res.json({ id: score[0].id, name: score[0].name, time: score[0].completion_time })
})

index.get('/game/game-over', (req, res) => {
    endTime()
    res.status(200).json({ time: TOTAL_TIME })
})

index.post('/game/game-over', async (req, res) => {
    const name = req.body.name
    const score = await prisma.leaderboard.create({
        data: {
            name: name,
            completion_time: Number(TOTAL_TIME)
        }
    })
    console.log(score)
    res.status(200).json({ ok: true })
})

index.post('/game/target', async (req, res) => {
    const xCoord = req.body.x
    const yCoord = req.body.y
    const target = req.body.target
    // console.log(req.body)

    const checkTarget = await prisma.targets.findMany({
        where: {
            name: target,
            x_max: {
                gt: Number(xCoord)
            },
            x_min: {
                lt: Number(xCoord)
            },
            y_max: {
                gt: Number(yCoord)
            },
            y_min: {
                lt: Number(yCoord)
            }
        }
    })
    console.log(checkTarget)
    if (checkTarget.length != 0) {
        let hit = false
        for (let i = 0; i < TARGETS.length; i++) {
            // console.log(TARGETS[i])
            if (TARGETS[i].name === checkTarget[0].name) {
                // console.log('hit')
                TARGETS.splice(i, 1)
                hit = true
                if (TARGETS.length === 0) res.redirect('/game/game-over')
                else res.status(200).json({ hit: hit })
            }
        }
        if (hit === false) {
            res.status(200).json({ hit: hit })
        }
    }
    else res.status(200).json({ hit: false })
})

index.get('/game/leaderboard', async (req, res) => {
    const leaderboard = await prisma.leaderboard.findMany({
        orderBy: {
            completion_time: 'asc'
        }
    })
    // console.log(leaderboard)
    res.json({ leaderboard: leaderboard })
})

module.exports = index