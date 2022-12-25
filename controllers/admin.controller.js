// panggil model customer
const { request, response } = require("express")
const adminModel = require(`../models/admin.model`)

const crypt = require(`../crypt`)

// request -> melihat data customer 
// response -> menampilkan data customer melalui view
exports.showDataAdmin = async (request, response) => {
    try {
        // ambil data customer menggunakan model
        let dataAdmin = await adminModel.ambilDataAdmin()
        // passing ke view
        let sendData = {
            page: `admin`,
            data: dataAdmin,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menampilkan form customer untuk tambah data
exports.showTambahAdmin = async(request, response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            nama_admin : ``,
            username : ``,
            password : ``,
            page : `form-admin`,
            targetRoute : `/petugas/add`,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk memproses data customer baru'
exports.prosesTambahData = async(request, response) => {
    try {
        // membaca data dari yg diisikan user
        let newData = {
            nama_admin : request.body.nama_admin,
            username : request.body.username,
            password : crypt.enkripsi(request.body.password)
        }
        // eksekusi tambah data
        await adminModel.tambahAdmin(newData)
        // dialihkan ke tampilan data pelanggan
        return response.redirect(`/petugas`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menampilkan data customer yg akan diubah
exports.showEditAdmin = async (request, response) => {
    try {
        // mendapatkan id dari customer yang akan diubah
        let id = request.params.id

        // menampung id kedalam object 
        let parameter = {
            id: id
        }

        // ambil data sesuai parameteer
        let admin = await adminModel.ambilDataDenganParameter(parameter)

        // prepare data yg akan ditampilkan view
        let sendData = {
            nama_admin: admin[0].nama_admin,
            username: admin[0].username,
            password: admin[0].password,
            page:`form-admin`,
            targetRoute: `/petugas/edit/${id}`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk memproses data yg diedit
exports.prosesUbahData = async (request, response) => {
    try {
        // mendapatkan id yg diubah
        let id = request.params.id
        
        // membungkus id ke bentuk object
        let parameter = {
            id: id
        }

        // menampung perubahan data ke dalam object
        let perubahan = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        // eksekusi perubahan data nya
        await adminModel.ubahAdmin(perubahan, parameter)

        // direct ke tampilan data customer
        return response.redirect(`/petugas`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.processDelete = async (request, response) => {
    try {
        let id = request.params.id
        let parameter = {
            id: id 
        }
        await adminModel.delete(parameter)
        return response.redirect(`/petugas`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}