"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AtribuirPetCliente {
    constructor(clienteConsumir, petAtribuido) {
        this.clienteConsumir = clienteConsumir;
        this.petAtribuido = petAtribuido;
    }
    atribuirPet(clienteConsumir, petAtribuido) {
        let pet = petAtribuido;
        let cliente = clienteConsumir;
        cliente.getPets.push(pet);
    }
}
exports.default = AtribuirPetCliente;
