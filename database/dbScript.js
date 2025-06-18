const { Client } = require("pg")
const { PrismaClient } = require("@prisma/client");
const { createClient } = require("@supabase/supabase-js");

const prisma = new PrismaClient()
require("dotenv").config()


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SERVICE_KEY
);

// async function addTestScore() {
//     const score = await prisma.leaderboard.create({
//         data: {
//             name: 'Winner',
//             completion_time: 2.1,
//         }
//     })
// }

async function addTestMap() {
    // const { data } = supabase.storage.from('maps/test').getPublicUrl('wimmelbilder.png')
    const map = await prisma.map.create({
        data: {
            name: 'Map 1',
            url: "/static/assets/maps/map1/wimmelbilder.png"
        }
    })
}

async function addTestTarget() {
    const target1 = await prisma.targets.update({
        where: {
            name: 'Target 1',
            id: 6
        },
        data: {
            x_min: 850,
            x_max: 900,
            y_min: 200,
            y_max: 250
        }
    })
    const target2 = await prisma.targets.update({
        where: {
            name: 'Target 2',
            id: 7
        },
        data: {
            x_min: 560,
            x_max: 620,
            y_min: 400,
            y_max: 460
        }
    })
    const target3 = await prisma.targets.update({
        where: {
            name: 'Target 3',
            id: 8
        },
        data: {
            x_min: 375,
            x_max: 415,
            y_min: 470,
            y_max: 520
        }
    })
    // const target1 = await prisma.targets.create({
    //     data: {
    //         name: "Target 1",
    //         mapId: 4,
    //         x_min: 100,
    //         x_max: 200,
    //         y_min: 200,
    //         y_max: 300
    //     }
    // })
    // const target2 = await prisma.targets.create({
    //     data: {
    //         name: "Target 2",
    //         mapId: 4,
    //         x_min: 400,
    //         x_max: 500,
    //         y_min: 400,
    //         y_max: 500
    //     }
    // })
    // const target3 = await prisma.targets.create({
    //     data: {
    //         name: "Target 3",
    //         mapId: 4,
    //         x_min: 600,
    //         x_max: 700,
    //         y_min: 600,
    //         y_max: 700
    //     }
    // })
    
}

async function addTestIcons(){
    const icon1 = await prisma.icons.create({
        data:{
            targetId: 6,
            url: "/static/assets/maps/map1/targets/Target1.png"
        }
    })
    const icon2 = await prisma.icons.create({
        data:{
            targetId: 7,
            url: "/static/assets/maps/map1/targets/Target2.png"
        }
    })
    const icon3 = await prisma.icons.create({
        data:{
            targetId: 8,
            url: "/static/assets/maps/map1/targets/Target3.png"
        }
    })
}

async function main() {
    addTestMap()
    addTestTarget()
    addTestIcons()
    console.log('done')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })