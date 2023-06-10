import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
//import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Pet from "../modelo/pet"
import Cadastro from "./cadastro"

export default class CadastroPetCliente {
    //private pets: Array<Pet>
    private entrada: Entrada
    public cliente : Cliente
    constructor(cliente: Cliente) {//pets: Array<Pet>,
        this.cliente = cliente
        //this.pets = pets
        this.entrada = new Entrada()
    }
    public cadastrarPetCliente(cliente: Cliente): void {
        console.log(`\nInício do cadastro do pet`);
        let nomepet = this.entrada.receberTexto('Por favor, informe o nome do pet: ');
        let racaPet = this.entrada.receberTexto('Por favor, informe a raça do pet: ');
        let generoPet = this.entrada.receberTexto('Por favor, informe a genero do pet: ');
        let tipoPet = this.entrada.receberTexto('Por favor, informe a tipo do pet: ');
        let pet = new Pet(nomepet, racaPet, generoPet, tipoPet)
        cliente.getPets.push(pet)
        // this.pets.push(pet)
        console.log(`\nCadastro concluído :)\n`);
    }
}