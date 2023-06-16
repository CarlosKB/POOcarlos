import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";

export default class AtribuirProdutoClienteConsumir{
    private produtoConsumido : Produto
    private clienteConsumir : Cliente

    constructor(clienteConsumir: Cliente, produtoConsumido : Produto){
        this.clienteConsumir = clienteConsumir
        this.produtoConsumido = produtoConsumido
    }

    public consumirProduto(clienteConsumir: Cliente, produtoConsumido: Produto){
        let produto = produtoConsumido
        let cliente = clienteConsumir
        cliente.getProdutosConsumidos.push(produto)
    }
}