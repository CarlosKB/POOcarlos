import Entrada from "../io/entrada"
import Cliente from '../modelo/cliente';
//import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Pet from "../modelo/pet"
import Telefone from "../modelo/telefone"
import Cadastro from "./cadastro"

export default class CadastroTelefone {
    private cliente: Cliente
    private entrada: Entrada
    constructor(cliente: Cliente) {
        this.cliente = cliente
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do telefone`);
        let ddd = this.entrada.receberTexto('Por favor, informe o seu DDD: ');
        let numero = this.entrada.receberTexto('Por favor, informe o seu número: ');
        let telefone = new Telefone(ddd, numero)
        this.cliente.getTelefones.push(telefone)
        console.log(`\nCadastro concluído :)\n`);
    }
}