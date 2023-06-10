"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    constructor(nome, nomeSocial, cpf) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.rgs = [];
        this.dataCadastro = new Date();
        this.telefones = [];
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
        this.pets = [];
        this.quantidadeProdutoConsumido = 0;
        this.quantidadeServicoConsumido = 0;
        this.quantidadeProdutoServicoConsumido = 0;
        this.valorConsumido = 0;
    }
    get getCpf() {
        return this.cpf;
    }
    get getRgs() {
        return this.rgs;
    }
    get getDataCadastro() {
        return this.dataCadastro;
    }
    get getTelefones() {
        return this.telefones;
    }
    get getProdutosConsumidos() {
        return this.produtosConsumidos;
    }
    get getServicosConsumidos() {
        return this.servicosConsumidos;
    }
    get getPets() {
        return this.pets;
    }
}
exports.default = Cliente;
