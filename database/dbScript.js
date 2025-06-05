const { Client } = require("pg")
const { PrismaClient } = require("@prisma/client");
const { createClient } = require("@supabase/supabase-js");

const prisma = new PrismaClient()
require("dotenv").config()


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SERVICE_KEY
);

async function addTestScore() {
    const score = await prisma.leaderboard.create({
        data:{
            name: 'Winner',
            completion_time: 2.1,
        }
    })
}

async function addTestMap() {
    const { data } = supabase.storage.from('maps/test').getPublicUrl('wimmelbilder.png')
    const map = await prisma.map.create({
        data:{
            name: 'test_map',
            url: data.publicUrl
        }
    })
}

async function addTestTarget() {
    const target1 = await prisma.targets.create({
        data:{
            name: 'Dummy1',
            map: {
                connect: {
                    id: 3
                }
            },
            x_min: 10,
            x_max: 20,
            y_min: 5,
            y_max: 15
        }
    })
    const target2 = await prisma.targets.create({
        data:{
            name: 'Dummy2',
            map: {
                connect: {
                    id: 3
                }
            },
            x_min: 50,
            x_max: 60,
            y_min: 100,
            y_max: 110
        }
    })
    const target3 = await prisma.targets.create({
        data:{
            name: 'Dummy3',
            map: {
                connect: {
                    id: 3
                }
            },
            x_min: 100,
            x_max: 110,
            y_min: 50,
            y_max: 60
        }
    })
}

async function main() {
    // addTestScore()
    // addTestMap()
    addTestTarget()
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