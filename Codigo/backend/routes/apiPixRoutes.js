const express = require("express")
const router = express.Router()
const GNRequest = require("../services/apiGerencianet")

const reqGNAlready = GNRequest({
    clientID: process.env.GN_CLIENT_ID,
    clientSecret: process.env.GN_CLIENT_SECRET
})

router.post('/pix', async (req, res) => {
    const { valorPix, message } = req.body
    const chavePix = process.env.GN_CHAVE_PIX

    const reqGN = await reqGNAlready

    const dataCob = {
        calendario: {
            expiracao: 3600
        },
        valor: {
            original: valorPix
        },
        chave: chavePix,
        solicitacaoPagador: message
    }

    const cobResponse = await reqGN.post('/v2/cob', dataCob)
    const qrCodeResponse = await reqGN.get(`/v2/loc/${ cobResponse.data.loc.id }/qrcode`)
    res.send(qrCodeResponse.data)
})

//#endregion

module.exports = router