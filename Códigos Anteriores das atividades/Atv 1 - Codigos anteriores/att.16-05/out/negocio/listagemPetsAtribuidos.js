"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = __importDefault(require("../modelo/cliente"));
const cpf_1 = __importDefault(require("../modelo/cpf"));
class ListagemClientePets {
    constructor(clientes) {
        this.clientes = clientes;
    }
    selecionarClientePet(numeroCpf) {
        let cpf = new cpf_1.default('', new Date());
        var clienteAlvo = new cliente_1.default('', '', cpf);
        this.clientes.forEach(cliente => {
            if (numeroCpf === cliente.getCpf.getValor) {
                clienteAlvo = cliente;
            }
            console.log(`\nLista de todos os pets:`);
            var i = 0;
            clienteAlvo.getPets.forEach(pet => {
                i += 1;
                console.log(`Pet: ${i}`);
                console.log(`Nome do pet: ${pet.getNome}`);
                console.log(`Raça do pet: ${pet.getRaca}`);
                console.log(`Tipo do pet: ${pet.getTipo}`);
                console.log(`Gênero do pet: ${pet.getGenero}`);
            });
            console.log(`\n`);
        });
    }
}
exports.default = ListagemClientePets;
