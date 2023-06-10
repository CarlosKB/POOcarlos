"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empresa_1 = __importDefault(require("../modelo/empresa"));
const entrada_1 = __importDefault(require("../io/entrada"));
const selecionadorPetCliente_1 = __importDefault(require("./selecionadorPetCliente"));
class AtribuirProdutoClienteConsumir {
    constructor(clienteConsumir, produtoConsumido) {
        this.clienteConsumir = clienteConsumir;
        this.produtoConsumido = produtoConsumido;
        this.entrada = new entrada_1.default();
    }
    consumirProduto(clienteConsumir, produtoConsumido) {
        let produto = produtoConsumido;
        produto.quantidadeConsumida += 1;
        let cliente = clienteConsumir;
        cliente.getProdutosConsumidos.push(produto);
        //pet consumir
        let nomePet = this.entrada.receberTexto('Digite o nome do pet que ira consumir o produto: ');
        let petSelecionador = new selecionadorPetCliente_1.default(clienteConsumir);
        let pet = petSelecionador.selecionarpets(nomePet);
        pet.produtosConsumidos.push(produtoConsumido);
        //
        var slaEmpresa = new empresa_1.default();
        slaEmpresa.qntdProdutosTotal.push(produto);
    }
}
exports.default = AtribuirProdutoClienteConsumir;
