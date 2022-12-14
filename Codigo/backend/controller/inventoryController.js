// Models
const Insumo = require('../models/Insumo')

module.exports = {
    async inputRegister(req, res) {
        const { name, emEstoque, quantidadeMin, validade, categoria } = req.body

        if (!name && !quantidadeMin && !emEstoque) {
            res.status(422).json({ err: "Campos obrigatórios" })
        }

        const insumo = {
            name,
            quantidadeMin,
            emEstoque,
            validade,
            status: "OK",
            categoria
        }

        for (let atributo in insumo) {
            if (insumo[atributo] == undefined)
                insumo[atributo] = null
        }

        try {
            // Criar dados
            await Insumo.create(insumo)

            res.status(201).json({ message: "Insumo cadastado com sucesso!" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async  updateInput(req, res) {
        const id = req.query.id
        const { name, quantidadeMin, emEstoque, validade, status, categoria } = req.body

        const insumo = {
            name,
            quantidadeMin,
            emEstoque,
            validade,
            status,
            categoria
        }

        try {
            const updatedInventory = await Insumo.updateOne({ _id: id }, insumo)

            if (updatedInventory.matchedCount === 0) {
                res.status(422).json({ message: "Insumo não encontrado" })
                return
            }

            res.status(200).json(insumo)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async viewAllSupplies(req, res) {
        try {
            const supplies = await Insumo.find()

            res.status(200).json(supplies)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async viewInputById(req, res) {
        const id = req.query.id
        const inputById = await Insumo.findById(id)

        if (!inputById) {
            res.status(422).json({ message: "Insumo não encontrado" })
            return
        }

        try {
            res.status(200).json(inputById)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    
    async deleteInput(req, res) {
        const id = req.query.id
        const inputById = await Insumo.findById(id)

        if (!inputById) {
            res.status(422).json({ message: "Insumo não encontrado" })
            return
        }

        try {
            await Insumo.deleteOne({ _id: id })

            res.status(200).json({ message: "Insumo apagado com sucesso" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}