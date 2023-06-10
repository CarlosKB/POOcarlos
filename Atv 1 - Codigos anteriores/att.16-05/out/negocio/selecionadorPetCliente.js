"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pet_1 = __importDefault(require("../modelo/pet"));
class SelecionadorPetCliente {
    constructor(cliente) {
        this.cliente = cliente;
    }
    selecionarpets(nomePet) {
        let petAlvo = new pet_1.default('', '', '', '');
        this.cliente.getPets.forEach(pet => {
            if (nomePet === pet.getNome) {
                petAlvo = pet;
            }
        });
        return petAlvo;
    }
}
exports.default = SelecionadorPetCliente;
