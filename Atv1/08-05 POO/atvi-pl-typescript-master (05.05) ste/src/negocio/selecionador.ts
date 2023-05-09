import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Produto from "../modelo/produto"

export default class Selecionador{
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>){
        this.clientes = clientes
    }
    public selecionarCliente(numeroCpf: string){
        let cpf = new CPF('', new Date())
        let clienteAlvo = new Cliente('', '', cpf)
        this.clientes.forEach(cliente =>{
            if (numeroCpf === cliente.getCpf.getValor){
                clienteAlvo = cliente
            }
        })
        return clienteAlvo
    }
}