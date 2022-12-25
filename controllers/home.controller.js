exports.tampilanHome = (request, response) => {
    try {
        return response.render(`../views/pages`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}