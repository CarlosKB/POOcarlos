import Pet from "../modelo/pet"

export default class selecionadorPet{
    private pets: Array<Pet>
    constructor(pets: Array<Pet>){
        this.pets = pets
    }

    public selecionarpets(nomePet: string){
        let petAlvo = new Pet('','','','')
        this.pets.forEach(pet =>{
            if (nomePet === pet.getNome){
                petAlvo = pet
            }
        })
        return petAlvo
    }
}