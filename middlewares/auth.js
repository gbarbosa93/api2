import jwt from 'jsonwebtoken'
// Token que defini no meu .env
const JWT_SCRET = process.env.JWT_SCRET

// Valida Authorização para logar (Token)
const auth = (req, res, next) => {
    const token = req.headers.authorization // pegando o token que vem do meu request/headers/authorization

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado' }) // Caso não passe nada retorna que meu acesso foi negado
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SCRET) // Verifico se o token enviado é valido [também tem um tratamento para excluir o Bearer]
        req.userId = decoded.id // Se quiser posso passar informações no REQ

    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' }) // Caso token for inválido disparo essa msg para o usuário
    }
    next() // caso esteja tudo ok, sua aplicação pode seguir.

}


export default auth