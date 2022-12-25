const adminModel = require(`../models/admin.model`)
const memberModel = require(`../models/member.model`)
const telurModel = require(`../models/telur.model`)
const packModel = require(`../models/pack.model`)
const transaksiModel = require(`../models/transaksi.model`)
const detailModel = require(`../models/detail_transaksi.model`)


exports.showFormTransaksi =  async (request, response) => {
    try {
        let telur = await telurModel.ambilDataTelur()
        let member = await memberModel.ambilDataMember()
        let pack = await packModel.ambilDataPack()
        let sendData = {
            dataTelur: telur,
            dataMember: member,
            dataPack: pack,
            page: `form-transaksi`,
            tgl_transaksi: ``,
            id_member:``,
            dataTelurString: JSON.stringify(telur),
            dataPackString: JSON.stringify(pack),
            dataUser: request.session.dataUser,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.addToCart = async(request, response) => {
    try {
        let selectedTelur = await telurModel.ambilDataDenganParameter({
            id: request.body.id_telur
        })
        let selectedPack = await packModel.ambilDataDenganParameter({
            id: request.body.id_pack
        })
        let storeData = {
            id_telur: request.body.id_telur,
            jenis_telur: selectedTelur[0].jenis_telur,
            jumlah_telur: request.body.jumlah_telur,
            id_pack: request.body.id_pack,
            nama_pack: selectedPack[0].nama_pack,
            jumlah_pack: request.body.jumlah_pack,
            harga_telur: request.body.harga_telur,
            harga_pack: request.body.harga_pack
        }
        request.session.cart.push(storeData)
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.hapusCart = async(request, response) => {
    try {
        let cart = request.session.cart
        let id_telur = request.params.id
        let index = cart.findIndex(item => item.id_telur == id_telur)
        cart.splice(index,1)
        request.session.cart = cart
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)   
    }
}

exports.simpanTransaksi = async(request, response) => {
    try {
        let newTransaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_member: request.body.id_member,
            id_admin: request.session.dataUser.id
        }
        let resultTransaksi = await transaksiModel.add(newTransaksi)
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) {
        
            delete cart[i].jenis_telur
            delete cart[i].nama_pack
            cart[i].id_transaksi = resultTransaksi.insertId
            await detailModel.add(cart[i])

        }
        request.session.cart = []
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.showTransaksi = async(request, response) => {
    try {
        let transaksi = await transaksiModel.findAll()

        for (let i = 0; i < transaksi.length; i++) {
            // ambil id_transaksi
            let id = transaksi[i].id
            // ambil data detailnya sesuai id
            let detail = await detailModel.findByCriteria({id_transaksi: id})
            // sisipkan detail ke transaksi nya
            transaksi[i].detail = detail
        }
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.hapusTransaksi = async(request, response) => {
    try {
        let id = request.params.id

        await detailModel.delete({id_transaksi: id})

        await transaksiModel.delete({id: id})

        return response.redirect(`/transaksi`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
