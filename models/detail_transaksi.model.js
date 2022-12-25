 const connection = require(`../config`)
 const tableName = `detail_transaksi`

 exports.findAll = () => {
     return new Promise((resolve, rejected) => {
         let query = `select * from ${tableName} 
         join telur on telur.id = detail_transaksi.id_telur
         join pack on pack.id = detail_transaksi.id_pack`
 
         console.log(`Run: ${query}`)
 
         connection.query(query, (error, result) => {
             if (error) {
                 rejected(error)
             }
             resolve(result)
         })
     })
 }
 
 exports.findByCriteria = (parameter) => {
     return new Promise((resolve, rejected) => {
         
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")

         let query = `select * from ${tableName} 
         join telur on telur.id = detail_transaksi.id_telur
         join pack on pack.id = detail_transaksi.id_pack where ${params}`
 
         console.log(`Run: ${query}`)
 
         connection.query(query, (error, result) => {
             if (error) {
                 rejected(error)
             }
             resolve(result)
         })
     })
 }

 exports.add = (dataObject) => {
     return new Promise((resolve, rejected) => {

         let columns = Object.keys(dataObject).join()

         let values = Object.values(dataObject)
             .map(value => `"${value}"`).join()

         let query = `insert into ${tableName} (${columns}) values (${values})`
 
         console.log(`Run: ${query}`)
 
         connection.query(query, (error, result) => {
             if (error) {
                 rejected(error.message)
             }
             resolve(result)
         })
     })
 }
 
 exports.update = (dataObject, parameter) => {
     return new Promise((resolve, rejected) => {
         
         let updateData = Object
             .keys(dataObject)
             .map(key => `${key}="${dataObject[key]}"`)
             .join()
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")

         let query = `update ${tableName} set ${updateData} where ${params}`
 
         console.log(`Run: ${query}`)
 
         connection.query(query, (error, result) => {
             if (error) {
                 rejected(error.message)
             }
             resolve(result)
         })
     })
 }

 exports.delete = (parameter) => {
     return new Promise((resolve, rejected) => {
         
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")

         let query = `delete from ${tableName} where ${params}`
 
         console.log(`Run: ${query}`)
 
         connection.query(query, (error, result) => {
             if (error) {
                 rejected(error.message)
             }
             resolve(result)
         })
     })
 }
 