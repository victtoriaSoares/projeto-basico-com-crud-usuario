const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Extrai o token do formato "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Valida o token
        req.user = decoded; // Adiciona os dados do usuário decodificados ao objeto da requisição
        next(); // Continua para a próxima função
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = authMiddleware;