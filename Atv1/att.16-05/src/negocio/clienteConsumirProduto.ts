import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Empresa from "../modelo/empresa";
import Entrada from '../io/entrada';
import SelecionadorPetCliente from "./selecionadorPetCliente";

export default class AtribuirProdutoClienteConsumir{
    private produtoConsumido : Produto
    private clienteConsumir : Cliente
    private entrada : Entrada

    constructor(clienteConsumir: Cliente, produtoConsumido : Produto){
        this.clienteConsumir = clienteConsumir
        this.produtoConsumido = produtoConsumido
        this.entrada = new Entrada()
    }

    public consumirProduto(clienteConsumir: Cliente, produtoConsumido: Produto){
        let produto = produtoConsumido
        produto.quantidadeConsumida += 1
        let cliente = clienteConsumir
        cliente.getProdutosConsumidos.push(produto)
        //pet consumir
        let nomePet = this.entrada.receberTexto('Digite o nome do pet que ira consumir o produto: ')
        let petSelecionador = new SelecionadorPetCliente(clienteConsumir)
        let pet = petSelecionador.selecionarpets(nomePet)
        pet.produtosConsumidos.push(produtoConsumido)
        //
        var slaEmpresa = new Empresa()
        slaEmpresa.qntdProdutosTotal.push(produto)
    }
}