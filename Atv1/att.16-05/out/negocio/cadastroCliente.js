"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const cliente_1 = __importDefault(require("../modelo/cliente"));
const cpf_1 = __importDefault(require("../modelo/cpf"));
const cadastro_1 = __importDefault(require("./cadastro"));
const cadastroPetACliente_1 = __importDefault(require("./cadastroPetACliente"));
const cadastroTelefone_1 = __importDefault(require("./cadastroTelefone"));
class CadastroCliente extends cadastro_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    cadastrar() {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `);
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        let partesData = data.split('/');
        let ano = new Number(partesData[2].valueOf()).valueOf();
        let mes = new Number(partesData[1].valueOf()).valueOf();
        let dia = new Number(partesData[0].valueOf()).valueOf();
        let dataEmissao = new Date(ano, mes, dia);
        let cpf = new cpf_1.default(valor, dataEmissao);
        let cliente = new cliente_1.default(nome, nomeSocial, cpf);
        this.clientes.push(cliente);
        var opcaoPet = this.entrada.receberNumero('Deseja cadastrar um pet? 1(Sim), 2(Não)');
        while (opcaoPet === 1) {
            let cadastrarPet = new cadastroPetACliente_1.default(cliente);
            cadastrarPet.cadastrarPetCliente(cliente);
            opcaoPet = this.entrada.receberNumero('Deseja cadastrar outro pet? 1(Sim), 2(Não)');
        }
        var opcaoTelefone = this.entrada.receberNumero('Deseja cadastrar um telefone? 1(Sim), 2(Não)');
        while (opcaoTelefone === 1) {
            let cadastrarTelefone = new cadastroTelefone_1.default(cliente);
            cadastrarTelefone.cadastrar();
            opcaoTelefone = this.entrada.receberNumero('Deseja cadastrar outro telefone? 1(Sim), 2(Não)');
        }
        console.log(`\nCadastro concluído :)\n`);
    }
}
exports.default = CadastroCliente;
