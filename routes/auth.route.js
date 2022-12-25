// panggil si express
const express = require(`express`)

// buat object untuk express
const app = express()

// minta ijin untuk membaca reques dari user
app.use(express.urlencoded({extended: true }))

// panggil controller auth
const authController = require(`../controllers/auth.controller`)

// membuat route untuk proses login
app.post(`/`, authController.authentication)

// membuat route untuk menampilkaan halaman login
app.get(`/`, authController.showLogin )



// membuat route untuk proses log out
app.get(`/logout`, authController.logout)

// export object app
module.exports = app