"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const produto_1 = __importDefault(require("../modelo/produto"));
class SelecionadorProduto {
    constructor(produtos) {
        this.produtos = produtos;
    }
    selecionarProdutos(nomeProduto) {
        let produtoAlvo = new produto_1.default();
        this.produtos.forEach(produto => {
            if (nomeProduto === produto.nome) {
                produtoAlvo = produto;
            }
        });
        return produtoAlvo;
    }
}
exports.default = SelecionadorProduto;
