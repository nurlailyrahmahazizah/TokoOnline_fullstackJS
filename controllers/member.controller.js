// panggil model customer
const { request, response } = require("express")
const memberModel = require(`../models/member.model`)

// request -> melihat data customer 
// response -> menampilkan data customer melalui view
exports.showDataMember = async (request, response) => {
    try {
        // ambil data customer menggunakan model
        let dataMember = await memberModel.ambilDataMember()
        // passing ke view
        let sendData = {
            page: `member`,
            data: dataMember,
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
exports.showTambahMember = async(request, response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            nama_member : ``,
            alamat : ``,
            telepon : ``,
            page : `form-member`,
            targetRoute : `/pelanggan/add`,
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
            nama_member : request.body.nama_member,
            alamat : request.body.alamat,
            telepon : request.body.telepon
        }
        // eksekusi tambah data
        await memberModel.tambahMember(newData)
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
exports.showEditMember = async (request, response) => {
    try {
        // mendapatkan id dari customer yang akan diubah
        let id = request.params.id

        // menampung id kedalam object 
        let parameter = {
            id: id
        }

        // ambil data sesuai parameteer
        let member = await memberModel.ambilDataDenganParameter(parameter)

        // prepare data yg akan ditampilkan view
        let sendData = {
            nama_member: member[0].nama_member,
            alamat: member[0].alamat,
            telepon: member[0].telepon,
            page:`form-member`,
            targetRoute: `/pelanggan/edit/${id}`,
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
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        // eksekusi perubahan data nya
        await memberModel.ubahMember(perubahan, parameter)

        // direct ke tampilan data customer
        return response.redirect(`/pelanggan`)
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
        await memberModel.delete(parameter)
        return response.redirect(`/pelanggan`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}