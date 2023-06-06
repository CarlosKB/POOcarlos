"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = __importDefault(require("../modelo/cliente"));
const cpf_1 = __importDefault(require("../modelo/cpf"));
class Selecionador {
    constructor(clientes) {
        this.clientes = clientes;
    }
    selecionarCliente(numeroCpf) {
        let cpf = new cpf_1.default('', new Date());
        let clienteAlvo = new cliente_1.default('', '', cpf);
        this.clientes.forEach(cliente => {
            if (numeroCpf === cliente.getCpf.getValor) {
                clienteAlvo = cliente;
            }
        });
        return clienteAlvo;
    }
}
exports.default = Selecionador;
