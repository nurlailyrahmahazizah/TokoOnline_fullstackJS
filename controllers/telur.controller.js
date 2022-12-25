// panggil model customer
const { request, response } = require("express")
const telurModel = require(`../models/telur.model`)

// request -> melihat data customer 
// response -> menampilkan data customer melalui view
exports.showDataTelur = async (request, response) => {
    try {
        // ambil data customer menggunakan model
        let dataTelur = await telurModel.ambilDataTelur()
        // passing ke view
        let sendData = {
            page: `telur`,
            data: dataTelur,
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
exports.showTambahTelur = async(request, response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            jenis_telur : ``,
            stok : ``,
            harga : ``,
            page : `form-telur`,
            targetRoute : `/telur/add`,
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
            jenis_telur : request.body.jenis_telur,
            stok : request.body.stok,
            harga : request.body.harga
        }
        // eksekusi tambah data
        await telurModel.tambahTelur(newData)
        // dialihkan ke tampilan data pelanggan
        return response.redirect(`/telur`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menampilkan data customer yg akan diubah
exports.showEditTelur = async (request, response) => {
    try {
        // mendapatkan id dari customer yang akan diubah
        let id = request.params.id

        // menampung id kedalam object 
        let parameter = {
            id: id
        }

        // ambil data sesuai parameteer
        let telur = await telurModel.ambilDataDenganParameter(parameter)

        // prepare data yg akan ditampilkan view
        let sendData = {
            jenis_telur: telur[0].jenis_telur,
            stok: telur[0].stok,
            harga: telur[0].harga,
            page:`form-telur`,
            targetRoute: `/telur/edit/${id}`,
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
            jenis_telur: request.body.jenis_telur,
            stok: request.body.stok,
            harga: request.body.harga
        }

        // eksekusi perubahan data nya
        await telurModel.ubahTelur(perubahan, parameter)

        // direct ke tampilan data customer
        return response.redirect(`/telur`)
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

        await telurModel.delete(parameter)

        return response.redirect(`/telur`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}