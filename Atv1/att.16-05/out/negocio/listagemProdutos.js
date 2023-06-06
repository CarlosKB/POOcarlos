"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("./listagem"));
class ListagemProdutos extends listagem_1.default {
    constructor(produtos) {
        super();
        this.produtos = produtos;
    }
    listar() {
        console.log(`\nLista de todos os produtos:`);
        this.produtos.forEach(produto => {
            console.log(`Nome do produto: ${produto.nome}`);
        });
        // for(let i = 0; i< this.produtos.length; i++){
        //     let produto = this.produtos[i]
        //     console.log(`Nome do produto: ${produto.nome}`);
        // }
        // console.log('---------------------------------------');
        // this.produtos.forEach(produto => {
        //     console.log(`Nome: ` + produto.nome);
        //     console.log(`--------------------------------------`);
        // });
        console.log(`\n`);
    }
}
exports.default = ListagemProdutos;
