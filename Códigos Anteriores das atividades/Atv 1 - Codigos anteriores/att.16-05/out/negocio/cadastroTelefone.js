"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const telefone_1 = __importDefault(require("../modelo/telefone"));
class CadastroTelefone {
    constructor(cliente) {
        this.cliente = cliente;
        this.entrada = new entrada_1.default();
    }
    cadastrar() {
        console.log(`\nInício do cadastro do telefone`);
        let ddd = this.entrada.receberTexto('Por favor, informe o seu DDD: ');
        let numero = this.entrada.receberTexto('Por favor, informe o seu número: ');
        let telefone = new telefone_1.default(ddd, numero);
        this.cliente.getTelefones.push(telefone);
        console.log(`\nCadastro concluído :)\n`);
    }
}
exports.default = CadastroTelefone;
