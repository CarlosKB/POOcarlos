"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("./listagem"));
class ListagemPetsCliente extends listagem_1.default {
    constructor(cliente) {
        super();
        this.cliente = cliente;
    }
    listar() {
        console.log(`\nLista de todos os pets:`);
        this.cliente.getPets.forEach(pet => {
            console.log(`Nome do pet: ${pet.getNome}`);
            console.log(`Genero do pet: ${pet.getGenero}`);
            console.log(`Raça do pet: ${pet.getRaca}`);
            console.log(`Tipo do pet: ${pet.getTipo}`);
            console.log('---------------------------');
        });
        console.log(`\n`);
    }
}
exports.default = ListagemPetsCliente;
