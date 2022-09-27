const { json } = require("express");
const express = require("express");
const router = express.Router();
router.use(express.json());
const Produto = require('../models/Produto');
const Sabor = require('../models/Sabores')
//const Sabor = require('../models/Sabor');
var sabores
module.exports = {
    async productRegister(req, res){
        
        const descricaoProduto = req.body.descricao
        const nomeProduto = req.body.nome
        const pedidoMinProduto = req.body.pedidoMinProduto
        const foto1 = req.body.foto1
        const foto2 = req.body.foto2
        const foto3= req.body.foto3
        
        if(!nomeProduto && !descricaoProduto  && !pedidoMinProduto && !foto1 && !foto2 && !foto3){
            res.status(422).json({ error: "Campos obrigatórios" })
            return
        }
        
        const produto = {
            nomeProduto,
            descricaoProduto,
            pedidoMinProduto,
            foto1,
            foto2,
            foto3
        }
        
        sabores = req.body.sabores
        
           
        console.log(req.body.lenght)
        
        
        
        
        try{
            
            await Produto.create(produto)
            console.log("teste")
            for(let i=0; i < req.body.lenght; i++){
                var saborProduto = sabores[i].sabor
                var precoProduto = sabores[i].preco
                 console.log(saborProduto)
                 console.log(precoProduto)
                const sabor = {
                    nomeProduto,
                    saborProduto,
                    precoProduto
                }
                console.log(sabor)
                await Sabor.create(sabor)
            }
            res.status(201).json({ message: "Produto cadastado com sucesso!" })
        }catch(error){
            res.status(500).json({error: error})
        }
    },
    async productGetAll(req, res){
        try{
            const produtos = await Produto.find()
            res.status(200).json(produtos)
        }catch(error){
            res.status(500).json({error: error})
        }
    },
    async productGetById(req,res){
        try{
            const id = req.params.id
            const produtoEspecifico = await Produto.findById(id)
            res.status(200).json(produtoEspecifico)
        }catch(error){
            res.status(500).json({error: error})
        }
    },
    async updateProduct (req, res) {
        const id = req.params.id
        const descricaoProduto = req.body.updatedescricao
        const nomeProduto = req.body.updatenome
        const saborProduto = req.body.updatesabor
        const precoProduto = req.body.updatepreco
        const pedidoMinProduto = req.body.updatepedidoMinProduto
        const foto1 = req.body.updatefoto1
        const foto2 = req.body.updatefoto2
        const foto3= req.body.updatefoto3

        const produto = {
            nomeProduto,
            descricaoProduto,
            saborProduto,
            precoProduto,
            pedidoMinProduto,
            foto1,
            foto2,
            foto3
        }
        try {
            const updatedProduto = await Produto.updateOne({ _id: id }, produto)

            if(updatedProduto.matchedCount === 0){
                res.status(422).json({ message: "produto não encontrado" })
                return
            }

            res.status(200).json(produto)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async deleteProduct(req, res) {
        const id = req.params.id
        const productById = await Produto.findById(id)

        if(!productById) {
            res.status(422).json({ message: "Produto não encontrado" })
            return 
        }

        try {
            await Produto.deleteOne({ _id: id })

            res.status(200).json({ message: "Produto apagado com sucesso" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}