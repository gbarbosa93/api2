import express from 'express'
import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt' // biblioteca usada pra encriptar dados
import jwt from 'jsonwebtoken' // biblioteca utilizada para geração e token

const prisma = new PrismaClient()
const router = express.Router()
const JWT_SCRET = process.env.JWT_SCRET // Pego meu Token criado no .env / tambem posso usar essa estrutura para pegar informações no meu .env

//Cadastro
router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body
        const salt = await bcrypt.genSalt(10) // Nivel de encriptação
        const hashPassword = await bcrypt.hash(user.password, salt) // Geração de Hash
        // Criação de novo usuário
        const userDB = await prisma.user.create({ // criação de novo usuário
            data: {
                name: user.name, 
                email: user.email,
                password: hashPassword
            }

        })
        res.status(201).json(userDB)
    } catch (err) {
        
        /*
        if (userDB.email === user.email) {
            res.status(400).json({ message: 'Usuário já cadastrado!!' })
        } else {
        }
        */
       //console.log(err)
        res.status(500).json({ message: 'Erro no servidor, tente novamente!!' })
        
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body
        // busca usuário no banco de dados
        const user = await prisma.user.findUnique({
            where: {
                email: userInfo.email
            },
        })
        // verifica se usuario existe
        if (!user) {
            return res.status(404).json({ message: 'Usuário não localizado!' })
        }
        // verifica se senha informada está correta
        const isMatch = await bcrypt.compare(userInfo.password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha invalida' })
        }

        // gerar token jwt
        const token = jwt.sign({id: user.id}, JWT_SCRET, {expiresIn: '1m'})

        res.status(200).json(token)

    } catch (err) {
        //console.log(err)
        res.status(500).json({ message: 'Erro no servidor, tente novamente!!' })
    }

})


export default router