import Listagem from "./listagem";
import Pet from '../modelo/pet';

export default class ListagemPets extends Listagem {
    private pets: Array<Pet>
    constructor(pets: Array<Pet>) {
        super()
        this.pets = pets
    }
    public listar(): void {
        console.log(`\nLista de todos os pets:`);

        this.pets.forEach( pet =>{
            console.log(`Nome do pet: ${pet.getNome}`);
            console.log(`Genero do pet: ${pet.getGenero}`);
            console.log(`Raça do pet: ${pet.getRaca}`);
            console.log(`Tipo do pet: ${pet.getTipo}`);
            console.log('---------------------------');
        })
        console.log(`\n`);
    }
}