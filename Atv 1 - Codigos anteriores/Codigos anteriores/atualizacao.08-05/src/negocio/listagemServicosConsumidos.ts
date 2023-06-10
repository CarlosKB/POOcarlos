import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Produto from "../modelo/produto"

export default class ListagemServicosConsumidos{
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>){
        this.clientes = clientes
    }
    public selecionarClienteServico(numeroCpf: string): void{
        let cpf = new CPF('', new Date())
        var clienteAlvo = new Cliente('', '', cpf)
        this.clientes.forEach(cliente =>{
            if (numeroCpf === cliente.getCpf.getValor){
                clienteAlvo = cliente
            }
            console.log(`\nLista de todos os serviços:`);
            clienteAlvo.getServicosConsumidos.forEach(servico =>{
                console.log(`Nome do serviço: ${servico.nome}`);
            })
            console.log(`\n`);
        })
    }
}