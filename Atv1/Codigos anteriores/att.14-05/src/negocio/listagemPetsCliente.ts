import Listagem from "./listagem";
import Pet from '../modelo/pet';
import Cliente from "../modelo/cliente";

export default class ListagemPetsCliente extends Listagem {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }
    public listar(): void {
        console.log(`\nLista de todos os pets:`);

        this.cliente.getPets.forEach( pet =>{
            console.log(`Nome do pet: ${pet.getNome}`);
            console.log(`Genero do pet: ${pet.getGenero}`);
            console.log(`Raça do pet: ${pet.getRaca}`);
            console.log(`Tipo do pet: ${pet.getTipo}`);
            console.log('---------------------------');
        })
        console.log(`\n`);
    }
}