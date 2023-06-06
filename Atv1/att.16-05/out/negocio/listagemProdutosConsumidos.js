"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = __importDefault(require("../modelo/cliente"));
const cpf_1 = __importDefault(require("../modelo/cpf"));
class ListagemProdutosConsumidos {
    constructor(clientes) {
        this.clientes = clientes;
    }
    selecionarCliente(numeroCpf) {
        let cpf = new cpf_1.default('', new Date());
        var clienteAlvo = new cliente_1.default('', '', cpf);
        this.clientes.forEach(cliente => {
            if (numeroCpf === cliente.getCpf.getValor) {
                clienteAlvo = cliente;
            }
            console.log(`\nLista de todos os produtos:`);
            clienteAlvo.getProdutosConsumidos.forEach(produto => {
                console.log(`Nome do produto: ${produto.nome} Quantidade: ${produto.quantidadeConsumida}`);
            });
            clienteAlvo.getPets.forEach(pet => {
                console.log(`Nome do pet: ${pet.getNome}`);
                console.log('Produtos consumidos pelo pet: ');
                pet.produtosConsumidos.forEach(produto => {
                    console.log(`Nome do produto: ${produto.nome}`);
                });
            });
            console.log(`\n`);
        });
    }
}
exports.default = ListagemProdutosConsumidos;
