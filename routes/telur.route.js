// panggil si express
const express = require(`express`)

// buat object nama app
const app = express()

// minta izin untuk membaca data yang dikirimkan melalui form
app.use(express.urlencoded({extended:true}))

// panggil contoller customer
const telurController = require(`../controllers/telur.controller`)

// load authorization from middleware
const authorization = require(`../middleware/authorization`)

// define route  untuk akses data customer 
app.get(`/`,authorization.cekUser, telurController.showDataTelur)

// define route untuk nampilin form customer
app.get(`/add`,authorization.cekUser, telurController.showTambahTelur)

// define route untuk memproses tambah data customer
app.post(`/add`,authorization.cekUser, telurController.prosesTambahData)

// define route untuk menampilkan form-customer dengan dgn data yg akan diubah
app.get(`/edit/:id`,authorization.cekUser, telurController.showEditTelur)

// define route untuk memproses perubahan data 
app.post(`/edit/:id`,authorization.cekUser, telurController.prosesUbahData)

// define route untuk meproses penghapusan data
app.get(`/delete/:id`,authorization.cekUser, telurController.processDelete)

// export object app
module.exports = app

