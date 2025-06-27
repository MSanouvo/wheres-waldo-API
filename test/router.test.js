const index = require("../routes/router")

const request = require("supertest")
const express = require("express")
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use("/", index)

//Outdated Tests

test('Game sends image when started', done => {
    const url = "https://slqnrxbkxzpvpuzkidpd.supabase.co/storage/v1/object/public/maps/test/wimmelbilder.png"
    request(app)
        .get('/game/start')
        .expect('Content-type', /json/)
        .expect({ image: url })
        .expect(200, done)
})

test('test correct user coordinates', done => {
    request(app)
        .post('/game/target')
        .type('form')
        .send({ x: 875, y: 225, target: 'Target 1' })
        .expect({ hit: true })
        .expect(200, done)
})

test('test bad user coordinates', done => {
    request(app)
        .post('/game/target')
        .type('form')
        .send({ x: 15, y: 100, target: 'Target 1' })
        .expect({ hit: false })
        .expect(200, done)
})

test('test adding to leaderboard', done => {
    request(app)
        .post('/game/game-over')
        .type('form')
        .send({ name: 'player'})
        .then(() => {
            request(app)
                .get('/game/score')
                .expect({ name: 'player', time: 0 }, done)
        })
})