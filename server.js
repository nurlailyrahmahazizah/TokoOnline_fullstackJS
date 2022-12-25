/** load library express */
const express = require(`express`)

// load library express-session
const session = require(`express-session`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `2020`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

// session configurasi
app.use(session({
    secret:`sayang kamu`,
    resave: false,
    saveUninitialized: false
}))

/** load routes (menentukan prefix define routes) */
const telur = require(`./routes/telur.route`)
const pack = require(`./routes/pack.route`)
const member = require(`./routes/member.route.js`)
const admin = require(`./routes/admin.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

/** define prefix for route  */
app.use(`/telur`, telur)
app.use(`/kemasan`, pack)
app.use(`/pelanggan`,member)
app.use(`/petugas`,admin)
app.use(`/auth`, auth)
app.use(`/transaksi`, transaksi)
app.use(`/cart`, cart)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Toko Telur is running on port ${PORT}`);
})

// url => http://localhost:8000/pelanggan