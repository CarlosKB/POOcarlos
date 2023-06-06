"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
class EditarCliente {
    constructor() {
        this.entrada = new entrada_1.default();
    }
    editar(cliente) {
        console.log(`\nInício da edição do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `);
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        cliente.nome = nome;
        cliente.nomeSocial = nomeSocial;
        // let partesData = data.split('/')
        // let ano = new Number(partesData[2].valueOf()).valueOf()
        // let mes = new Number(partesData[1].valueOf()).valueOf()
        // let dia = new Number(partesData[0].valueOf()).valueOf()
        // let dataEmissao = new Date(ano, mes, dia)
        // let cpf = new CPF(valor, dataEmissao);
        // cliente. = cpf
        console.log(`\Edição concluída :)\n`);
    }
}
exports.default = EditarCliente;
