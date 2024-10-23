import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/listar', async (req, res) => {

    try {
        const users = await prisma.user.findMany({ 
            select: {
                email: true,
                name: true,
                password: false 
            } 
        }) // listando usuarios e omitindo a senha para não aparecer na listagem final

        res.status(200).json({ message: 'Usuários listados com sucesso!', users })
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor tente novamente!' })
    }
})


export default router // sempre exportar o router ou o nome que você deu para manipular o express