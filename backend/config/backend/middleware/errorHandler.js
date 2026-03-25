// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(`[SYSTEM ERROR]: ${err.stack}`);

    // Não enviamos o erro técnico para o cliente por segurança
    res.status(500).json({
        success: false,
        error: "Internal Server Error",
        message: "O motor de segurança detectou uma instabilidade. Operação abortada para proteção de dados."
    });
};

module.exports = errorHandler;
