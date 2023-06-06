"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = __importDefault(require("../modelo/cliente"));
const cpf_1 = __importDefault(require("../modelo/cpf"));
class ListagemServicosConsumidos {
    constructor(clientes) {
        this.clientes = clientes;
    }
    selecionarClienteServico(numeroCpf) {
        let cpf = new cpf_1.default('', new Date());
        var clienteAlvo = new cliente_1.default('', '', cpf);
        this.clientes.forEach(cliente => {
            if (numeroCpf === cliente.getCpf.getValor) {
                clienteAlvo = cliente;
            }
            console.log(`\nLista de todos os serviços:`);
            clienteAlvo.getServicosConsumidos.forEach(servico => {
                console.log(`Nome do serviço: ${servico.nome}`);
            });
            console.log(`\n`);
        });
    }
}
exports.default = ListagemServicosConsumidos;
