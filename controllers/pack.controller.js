// panggil model customer
const { request, response } = require("express")
const packModel = require(`../models/pack.model`)

// request -> melihat data customer 
// response -> menampilkan data customer melalui view
exports.showDataPack = async (request, response) => {
    try {
        // ambil data customer menggunakan model
        let dataPack = await packModel.ambilDataPack()
        // passing ke view
        let sendData = {
            page: `pack`,
            data: dataPack,
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
exports.showTambahPack = async(request, response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            nama_pack : ``,
            harga : ``,
            page : `form-pack`,
            targetRoute : `/kemasan/add`,
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
            nama_pack : request.body.nama_pack,
            harga : request.body.harga
        }
        // eksekusi tambah data
        await packModel.tambahPack(newData)
        // dialihkan ke tampilan data pelanggan
        return response.redirect(`/kemasan`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menampilkan data customer yg akan diubah
exports.showEditPack = async (request, response) => {
    try {
        // mendapatkan id dari customer yang akan diubah
        let id = request.params.id

        // menampung id kedalam object 
        let parameter = {
            id: id
        }

        // ambil data sesuai parameteer
        let pack = await packModel.ambilDataDenganParameter(parameter)

        // prepare data yg akan ditampilkan view
        let sendData = {
            nama_pack: pack[0].nama_pack,
            harga: pack[0].harga,
            page:`form-pack`,
            targetRoute: `/kemasan/edit/${id}`,
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
            nama_pack: request.body.nama_pack,
            harga: request.body.harga
        }

        // eksekusi perubahan data nya
        await packModel.ubahPack(perubahan, parameter)

        // direct ke tampilan data customer
        return response.redirect(`/kemasan`)
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
        await packModel.delete(parameter)
        return response.redirect(`/kemasan`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}