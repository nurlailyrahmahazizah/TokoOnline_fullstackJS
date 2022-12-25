// function untuk CRUD

// load dulu connection dari config
const connection = require(`../config`)

const namaTable = `admin`

// funtion untuk ambil data customer
exports.ambilDataAdmin = () => {
    return new Promise((resolve,reject) => {
        // bikin query untk ambil data
        let query = `select*from admin`
        
        // dijalankan query nya
        connection.query(query, (error,result) =>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// function untuk ambil data berdasarkan parameter khusus
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve,reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select*from admin where ${params}`
        // dijalankan query nya
        connection.query(query, (error,result) =>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// membuat funtion untuk menambah data customer baru
exports.tambahAdmin = (admin) => {
    return new Promise((resolve, reject) => {
        // ambil key dari object customer
        let key = Object
            .keys(admin) // [key1, key2, dst]
            .join() // "key1, key2, dst"  

        // ambil value dari object customer
        let value = Object
            .keys(admin) // [key1, key2, dst]
            .map(item => `"${admin[item]}"`) // ["value1", "value2", dst]
            .join() // `"value1", "value2", dst`
        
        let query = `insert into admin (${key}) values (${value})`

            // dijalankan query nya
        connection.query(query, (error,result) =>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// buat fungsi untuk update data customer
exports.ubahAdmin = (data, parameter) => {
    return new Promise((resolve,reject) => {
        // menyusun string untuk query bagian perubahan data
        let perubahanData = Object
            .keys(data)
            .map(item => `${item}="${data[item]}"`)
            .join() // mengkonversi array menjadi string
        
        // menyusun string untuk query bagian penentu data yang akan diubah
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        // menyusun query
        let query = `update admin set ${perubahanData} where ${params}`

        // dijalankan query nya
        connection.query(query, (error,result) =>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// buat fungsi untuk menghapus data
exports.delete = (parameter) => {
    return new Promise((resolve, rejected) => {
        
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(" and ")
        
        let query = `delete from admin where ${params}`

        console.log(`Run: ${query}`)

        connection.query(query, (error, result) => {
            if (error) {
                rejected(error.message)
            }
            resolve(result)
        })
    })
}