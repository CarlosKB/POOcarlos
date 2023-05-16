import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Produto from "../modelo/produto"

export default class ListagemProdutosConsumidos{
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>){
        this.clientes = clientes
    }
    public selecionarCliente(numeroCpf: string): void{
        let cpf = new CPF('', new Date())
        var clienteAlvo = new Cliente('', '', cpf)
        this.clientes.forEach(cliente =>{
            if (numeroCpf === cliente.getCpf.getValor){
                clienteAlvo = cliente
            }
            console.log(`\nLista de todos os produtos:`);
            clienteAlvo.getProdutosConsumidos.forEach(produto =>{
                console.log(`Nome do produto: ${produto.nome} Quantidade: ${produto.quantidadeConsumida}`);
            })
            console.log(`\n`);
        })
    }
}