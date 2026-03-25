// core-native/validator.cpp
#include <iostream>
#include <string>
#include <vector>

class BioValidator {
public:
    // Valida se os batimentos ou pressão estão dentro de limites humanos extremos
    static bool isDataPlausible(int value, std::string type) {
        if (type == "pressao_sis") {
            return (value >= 40 && value <= 250);
        }
        if (type == "glicemia") {
            return (value >= 20 && value <= 600);
        }
        return false;
    }
};

int main(int argc, char* argv[]) {
    // Espera: ./validator <valor> <tipo>
    if (argc < 3) {
        std::cout << "REJECTED: Missing Arguments" << std::endl;
        return 1;
    }

    int val = std::stoi(argv[1]);
    std::string type = argv[2];

    if (BioValidator::isDataPlausible(val, type)) {
        std::cout << "VALIDATED" << std::endl;
    } else {
        std::cout << "REJECTED: Biological Anomaly" << std::endl;
    }

    return 0;
}
