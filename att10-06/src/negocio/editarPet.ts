import Entrada from "../io/entrada"
import Produto from "../modelo/produto"
import Servico from "../modelo/servico"
import Cadastro from "./cadastro"
import Pet from '../modelo/pet';

export default class EditarPet {
    private entrada: Entrada
    constructor(){
        this.entrada = new Entrada()
    }
    public editarPet(pet: Pet): void {
        console.log(`\nInício da edição do pet`);
        let nomePet = this.entrada.receberTexto(`Por favor informe o nome do pet: `)
        let racaPet = this.entrada.receberTexto(`Por favor informe a raça do pet: `)
        let generoPet = this.entrada.receberTexto(`Por favor informe o genero do pet: `)
        let tipoPet = this.entrada.receberTexto(`Por favor informe o tipo do pet: `)

        pet.setNome = nomePet
        pet.setRaca = racaPet
        pet.setGenero = generoPet
        pet.setTipo = tipoPet
        console.log(`\Edição concluída :)\n`);
    }
}