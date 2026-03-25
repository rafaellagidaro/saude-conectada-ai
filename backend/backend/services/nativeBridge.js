// backend/services/nativeBridge.js
const { execFile } = require('child_process');
const path = require('path');

class NativeBridge {
    /**
     * Envia o dado para o motor C++ validar antes de salvar no SQL
     */
    static validateNatively(value, type) {
        return new Promise((resolve, reject) => {
            const binaryPath = path.join(__dirname, '../../core-native/validator');
            
            execFile(binaryPath, [value, type], (error, stdout) => {
                if (error) reject(error);
                resolve(stdout.trim() === "VALIDATED");
            });
        });
    }
}

module.exports = NativeBridge;
