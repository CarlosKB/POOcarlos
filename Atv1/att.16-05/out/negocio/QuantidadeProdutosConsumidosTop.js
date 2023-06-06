"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empresa_1 = __importDefault(require("../modelo/empresa"));
const listagem_1 = __importDefault(require("./listagem"));
class ListagemProdutosEServicosMaisConsumidosTop extends listagem_1.default {
    constructor(empresa) {
        super();
        this.empresa = new empresa_1.default();
        this.empresa = empresa;
    }
    listar() {
        console.log(`\nLista dos produtos e serviços mais consumidos:`);
        var listinhaPaiaProduto = this.empresa.getProdutos;
        var listinhaPaiaServico = this.empresa.getServicos;
        var listaBala = [];
        listinhaPaiaProduto.forEach(produto => {
            listaBala.push(produto);
        });
        listinhaPaiaServico.forEach(servico => {
            listaBala.push(servico);
        });
        var listaBalaOrdenada = listaBala.sort(function (a, b) {
            return (b.quantidadeConsumida - a.quantidadeConsumida);
        });
        function listarProdutosServicosMaisConsumidos() {
            var cont = 0;
            listaBalaOrdenada.forEach((ps) => {
                cont += 1;
                console.log(`${cont}º ${ps.tipo}`);
                console.log(`O ${ps.tipo}: ${ps.nome} foi consumido ${ps.quantidadeConsumida} vezes`);
            });
        }
        listarProdutosServicosMaisConsumidos();
    }
}
exports.default = ListagemProdutosEServicosMaisConsumidosTop;
