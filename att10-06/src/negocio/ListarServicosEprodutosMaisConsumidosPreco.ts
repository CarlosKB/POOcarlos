import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";
import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemServicosEprodutosMaisConsumidosValor extends Listagem {
  private empresa = new Empresa();
  constructor(empresa: Empresa) {
    super();
    this.empresa = empresa;
  }
  public listar(): void {
    console.log(`\nLista de consumo de cada cliente:`);

    this.empresa.getClientes.forEach((cliente) => {
      let contadorPrecoProduto = 0
      cliente.getProdutosConsumidos.forEach((produto) => {
        contadorPrecoProduto += produto.preco
      });
      
      let contadorPrecoServico = 0
      cliente.getServicosConsumidos.forEach((servico) => {
        contadorPrecoServico += servico.preco;
      });

      cliente.valorConsumido = contadorPrecoServico + contadorPrecoProduto
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
      return (
        b.valorConsumido -
        a.valorConsumido
      );
    });
    var ordemExibicao = "";
    for (var i = 0; i < listaOrdenadaValor.length; i++) {
      ordemExibicao +=
        `posição ${i + 1}: \n  nome: ${listaOrdenadaValor[i].nome} | cpf: ${
          listaOrdenadaValor[i].cpf
        } | preço de produros e serviços consumidos: R$${
          listaOrdenadaValor[i].valorConsumido
        }` + "\n";
    }
    console.log(ordemExibicao);
    while (this.empresa.clientesValoresConsumido.length > 0) {
      this.empresa.clientesValoresConsumido.pop();
    }
  }}