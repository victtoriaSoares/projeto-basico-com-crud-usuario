const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido ou inválido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Substitua JWT_SECRET pela sua chave secreta
        console.log(decoded);
        req.user = decoded; // Adiciona os dados do token ao objeto req
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
};

module.exports = authMiddleware;