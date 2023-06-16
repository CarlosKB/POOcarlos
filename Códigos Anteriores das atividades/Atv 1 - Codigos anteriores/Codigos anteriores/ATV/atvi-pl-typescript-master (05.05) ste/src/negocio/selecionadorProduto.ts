import Produto from "../modelo/produto"

export default class SelecionadorProduto{
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>){
        this.produtos = produtos
    }

    public selecionarProdutos(nomeProduto: string){
        let produtoAlvo = new Produto()
        this.produtos.forEach(produto =>{
            if (nomeProduto === produto.nome){
                produtoAlvo = produto
            }
        })
        return produtoAlvo
    }
}