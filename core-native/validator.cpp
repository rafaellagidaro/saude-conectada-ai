#include <iostream>
#include <string>

/**
 * MOTOR DE VALIDAÇÃO DE SAÚDE (CORE NATIVE)
 * Este módulo em C++ simula a validação de sensores biométricos.
 * No mundo real, processaria sinais de hardware com latência zero.
 */

bool validarSinalVital(int valor, std::string tipo) {
    if (tipo == "glicemia") {
        return (valor >= 20 && valor <= 600); // Faixa humana extrema
    }
    if (tipo == "sistolica") {
        return (valor >= 40 && valor <= 250); // Faixa de segurança médica
    }
    return false;
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        std::cout << "ERRO: Parametros insuficientes (Uso: ./validator <valor> <tipo>)" << std::endl;
        return 1;
    }

    int valor = std::stoi(argv[1]);
    std::string tipo = argv[2];

    if (validarSinalVital(valor, tipo)) {
        std::cout << "STATUS: VALIDADO_PELO_CORE_CPP" << std::endl;
    } else {
        std::cout << "STATUS: REJEITADO_SINAL_INVALIDO" << std::endl;
    }

    return 0;
}
