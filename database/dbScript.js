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
        data: {
            name: 'Winner',
            completion_time: 2.1,
        }
    })
}

async function addTestMap() {
    const { data } = supabase.storage.from('maps/test').getPublicUrl('wimmelbilder.png')
    const map = await prisma.map.create({
        data: {
            name: 'test_map',
            url: data.publicUrl
        }
    })
}

async function addTestTarget() {
    const target1 = await prisma.targets.update({
        where: {
            name: 'Dummy1',
            id: 2
        },
        data: {
            x_min: 100,
            x_max: 200,
            y_min: 500,
            y_max: 600
        }
    })
    const target2 = await prisma.targets.update({
        where: {
            name: 'Dummy2',
            id: 3
        },
        data: {
            x_min: 500,
            x_max: 600,
            y_min: 200,
            y_max: 300
        }
    })
    const target3 = await prisma.targets.update({
        where: {
            name: 'Dummy3',
            id: 4
        },
        data: {
            x_min: 700,
            x_max: 800,
            y_min: 500,
            y_max: 600
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