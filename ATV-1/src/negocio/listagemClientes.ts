import { log } from "console";
import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log('------------');
            
            cliente.getTelefones.forEach(telefone=>{
                console.log(`Telefone: (${telefone.getDdd}) ${telefone.getNumero}`);
                console.log('-');
                
            })
            console.log('------------');
            
            cliente.getPets.forEach(pet=>{
                console.log(`Pet: ${pet.getNome}`);
                console.log('-');
                
            })
            console.log('------------');
            
            cliente.getRgs.forEach(rg=>{
                console.log(`Número RG: ${rg.getValor}`);
                console.log(`Data emissão: ${rg.getDataEmissao}`);
                
                console.log('-');
                
            })
            console.log(`-------------------//-------------------`);
        });
        console.log(`\n`);
    }
}