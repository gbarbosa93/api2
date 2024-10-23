import express from 'express'
import publicRoutes from './routes/public.js' // Rota Publica
import privateRoutes from './routes/private.js'// Rota Privada
import auth from './middlewares/auth.js' // Middlewares é um intermediador que fica entre a aplicação para validar algumas informações e deixar ela seguir

const app = express()
app.use(express.json())

app.use('/', publicRoutes)// Acesso as rotas publicas
app.use('/', auth, privateRoutes)// Acesso as rotas privadas

app.listen(3000, () => console.log("Servidor em Execução!!")) // Servidor rodando na porta 3000 