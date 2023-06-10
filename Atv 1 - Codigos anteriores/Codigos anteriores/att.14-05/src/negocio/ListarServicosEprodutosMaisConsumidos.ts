import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";
import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemServicosEprodutosMaisConsumidos extends Listagem {
  private empresa = new Empresa();
  constructor(empresa: Empresa) {
    super();
    this.empresa = empresa;
  }
  public listar(): void {
    console.log(`\nLista de consumo de cada cliente:`);

    this.empresa.getClientes.forEach((cliente) => {
      console.log(`Nome: ` + cliente.nome);
      console.log(`Nome social: ` + cliente.nomeSocial);
      console.log(`CPF: ` + cliente.getCpf.getValor);
      var contProd = 0;
      cliente.getProdutosConsumidos.forEach((produto) => {
        contProd += 1;
      });
      cliente.quantidadeProdutoConsumido = contProd;
      var contServ = 0;
      cliente.getServicosConsumidos.forEach((servico) => {
        contServ += 1;
      });
      cliente.quantidadeServicoConsumido = contServ;

      cliente.quantidadeProdutoServicoConsumido = contProd + contServ;
      this.empresa.quantidadeConsumida.push({
        nome: cliente.nome,
        cpf: cliente.getCpf.getValor,
        quantidadeProdutoServicoConsumido:
          cliente.quantidadeProdutoServicoConsumido,
      });
      console.log(
        `Quantidade de produtos e serviços consumidos ${cliente.quantidadeProdutoServicoConsumido}`
      );

      console.log(`--------------------------------------`);
    });
    console.log(`\n`);

    var listaQuantidadeConsumo = this.empresa.quantidadeConsumida;
    var listaOrdenadaConsumo = listaQuantidadeConsumo.sort(function (a, b) {
      return (
        b.quantidadeProdutoServicoConsumido -
        a.quantidadeProdutoServicoConsumido
      );
    });
    var ordemExibicao = "";
    for (var i = 0; i < listaOrdenadaConsumo.length; i++) {
      ordemExibicao +=
        `posição ${i + 1}: \n  nome: ${listaOrdenadaConsumo[i].nome} | cpf: ${
          listaOrdenadaConsumo[i].cpf
        } | quantidade de produros/serviços consumidos: ${
          listaOrdenadaConsumo[i].quantidadeProdutoServicoConsumido
        }` + "\n";
    }
    console.log(ordemExibicao);
    while (this.empresa.quantidadeConsumida.length > 0) {
      this.empresa.quantidadeConsumida.pop();
    }
  }
}
