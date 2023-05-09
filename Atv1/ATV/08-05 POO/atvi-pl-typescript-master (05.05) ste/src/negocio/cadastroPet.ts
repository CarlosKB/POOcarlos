import Entrada from "../io/entrada"
//import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Pet from "../modelo/pet"
import Cadastro from "./cadastro"

export default class CadastroPet extends Cadastro {
    private pets: Array<Pet>
    private entrada: Entrada
    constructor(pets: Array<Pet>) {
        super()
        this.pets = pets
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do pet`);
        let nomepet = this.entrada.receberTexto('Por favor, informe o nome do pet: ');
        let racaPet = this.entrada.receberTexto('Por favor, informe a raça do pet: ');
        let generoPet = this.entrada.receberTexto('Por favor, informe a genero do pet: ');
        let tipoPet = this.entrada.receberTexto('Por favor, informe a tipo do pet: ');
        let pet = new Pet(nomepet, racaPet, generoPet, tipoPet)
        this.pets.push(pet)
        console.log(`\nCadastro concluído :)\n`);
    }
}