"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
class EditarProduto {
    constructor() {
        this.entrada = new entrada_1.default();
    }
    editarProduto(produto) {
        console.log(`\nInício da edição do produto`);
        let nomeProduto = this.entrada.receberTexto(`Por favor informe o nome do produto: `);
        produto.nome = nomeProduto;
        console.log(`\Edição concluída :)\n`);
    }
}
exports.default = EditarProduto;
