import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Produto from "../modelo/produto"
import Pet from "../modelo/pet";

export default class ListagemClientePets{
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>){
        this.clientes = clientes
    }
    public selecionarClientePet(numeroCpf: string): void{
        let cpf = new CPF('', new Date())
        var clienteAlvo = new Cliente('', '', cpf)
        this.clientes.forEach(cliente =>{
            if (numeroCpf === cliente.getCpf.getValor){
                clienteAlvo = cliente
            }
            console.log(`\nLista de todos os pets:`);
            var i = 0
            clienteAlvo.getPets.forEach(pet =>{
                i += 1
                console.log(`Pet: ${i}`);
                console.log(`Nome do pet: ${pet.getNome}`);
                console.log(`Raça do pet: ${pet.getRaca}`);
                console.log(`Tipo do pet: ${pet.getTipo}`);
                console.log(`Gênero do pet: ${pet.getGenero}`);
            })
            console.log(`\n`);
        })
    }
}