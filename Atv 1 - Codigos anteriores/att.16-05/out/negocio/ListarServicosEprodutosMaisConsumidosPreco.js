"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empresa_1 = __importDefault(require("../modelo/empresa"));
const listagem_1 = __importDefault(require("./listagem"));
class ListagemServicosEprodutosMaisConsumidosValor extends listagem_1.default {
    constructor(empresa) {
        super();
        this.empresa = new empresa_1.default();
        this.empresa = empresa;
    }
    listar() {
        console.log(`\nLista de consumo de cada cliente:`);
        this.empresa.getClientes.forEach((cliente) => {
            let contadorPrecoProduto = 0;
            cliente.getProdutosConsumidos.forEach((produto) => {
                contadorPrecoProduto += produto.preco;
            });
            let contadorPrecoServico = 0;
            cliente.getServicosConsumidos.forEach((servico) => {
                contadorPrecoServico += servico.preco;
            });
            cliente.valorConsumido = contadorPrecoServico + contadorPrecoProduto;
            this.empresa.clientesValoresConsumido.push({
                nome: cliente.nome,
                cpf: cliente.getCpf.getValor,
                valorConsumido: cliente.valorConsumido,
            });
            //   console.log(
            //     `Quantidade de produtos e serviços consumidos ${cliente.}`
            //   );
            //   console.log(`--------------------------------------`);
        });
        // console.log(`\n`);
        var listaValorConsumo = this.empresa.clientesValoresConsumido;
        var listaOrdenadaValor = listaValorConsumo.sort(function (a, b) {
            return (b.valorConsumido -
                a.valorConsumido);
        });
        var ordemExibicao = "";
        for (var i = 0; i < listaOrdenadaValor.length; i++) {
            ordemExibicao +=
                `posição ${i + 1}: \n  nome: ${listaOrdenadaValor[i].nome} | cpf: ${listaOrdenadaValor[i].cpf} | preço de produros e serviços consumidos: R$${listaOrdenadaValor[i].valorConsumido}` + "\n";
        }
        console.log(ordemExibicao);
        while (this.empresa.clientesValoresConsumido.length > 0) {
            this.empresa.clientesValoresConsumido.pop();
        }
    }
}
exports.default = ListagemServicosEprodutosMaisConsumidosValor;
