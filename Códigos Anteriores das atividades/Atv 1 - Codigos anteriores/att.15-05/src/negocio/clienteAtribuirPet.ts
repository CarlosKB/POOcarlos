import Cliente from "../modelo/cliente";
import Servico from '../modelo/servico';
import Pet from "../modelo/pet";

export default class AtribuirPetCliente{
    private petAtribuido : Pet
    private clienteConsumir : Cliente

    constructor(clienteConsumir: Cliente, petAtribuido : Pet){
        this.clienteConsumir = clienteConsumir
        this.petAtribuido = petAtribuido
    }

    public atribuirPet(clienteConsumir: Cliente, petAtribuido: Pet){
        let pet = petAtribuido
        let cliente = clienteConsumir
        cliente.getPets.push(pet)
    }
}