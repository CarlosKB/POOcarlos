import Cliente from "../modelo/cliente"
import Pet from "../modelo/pet"

export default class SelecionadorPetCliente{
    private cliente: Cliente
    constructor(cliente: Cliente){
        this.cliente = cliente
    }

    public selecionarpets(nomePet: string){
        let petAlvo = new Pet('','','','')
        this.cliente.getPets.forEach(pet =>{
            if (nomePet === pet.getNome){
                petAlvo = pet
            }
        })
        return petAlvo
    }
}