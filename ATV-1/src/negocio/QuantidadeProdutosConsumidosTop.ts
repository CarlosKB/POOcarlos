import { log } from "console";
import Empresa from "../modelo/empresa";
import Produto from "../modelo/produto";
import Listagem from "./listagem";
import Servico from "../modelo/servico";

export default class ListagemProdutosEServicosMaisConsumidosTop extends Listagem {
  private empresa = new Empresa();
  constructor(empresa: Empresa) {
    super();
    this.empresa = empresa;
  }
  public listar(): void {
    console.log(`\nLista dos produtos e serviços mais consumidos:`);

    var listinhaPaiaProduto = this.empresa.getProdutos
    var listinhaPaiaServico = this.empresa.getServicos

    var listaBala: (Produto | Servico)[] = []
    listinhaPaiaProduto.forEach(produto=>{
      listaBala.push(produto)
    })
    listinhaPaiaServico.forEach(servico=>{
      listaBala.push(servico)
    })

var listaBalaOrdenada = listaBala.sort(function(a,b){
  return(
    b.quantidadeConsumida - a.quantidadeConsumida
  )
})
      function listarProdutosServicosMaisConsumidos(): void {
        var cont = 0
        listaBalaOrdenada.forEach((ps) => {
          cont += 1
          console.log(`${cont}º ${ps.tipo}`);
          console.log(`O ${ps.tipo}: ${ps.nome} foi consumido ${ps.quantidadeConsumida} vezes`)
      })
    }
  listarProdutosServicosMaisConsumidos()
  }}