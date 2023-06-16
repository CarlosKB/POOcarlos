import { textChangeRangeIsUnchanged } from "typescript"
import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Empresa from "../modelo/empresa"
import Pet from "../modelo/pet"
import Cadastro from "./cadastro"
import CadastroPetCliente from "./cadastroPetACliente"
import CadastroTelefone from "./cadastroTelefone"
import RG from "../modelo/rg"

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private pets: Array<Pet>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>, pets: Array<Pet>) {
        super()
        this.pets = pets
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        let partesData = data.split('/')
        let ano = new Number(partesData[2].valueOf()).valueOf()
        let mes = new Number(partesData[1].valueOf()).valueOf()
        let dia = new Number(partesData[0].valueOf()).valueOf()
        let dataEmissao = new Date(ano, mes, dia)
        let cpf = new CPF(valor, dataEmissao);
        let cliente = new Cliente(nome, nomeSocial, cpf);
        var opcaoRg = this.entrada.receberNumero('Deseja cadastrar um RG? 1(Sim), 2(Não)')
        while (opcaoRg === 1) {
            let valor = this.entrada.receberTexto(`Por favor informe o número do RG: `);
            let data = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
            let partesData = data.split('/')
            let ano = new Number(partesData[2].valueOf()).valueOf()
            let mes = new Number(partesData[1].valueOf()).valueOf()
            let dia = new Number(partesData[0].valueOf()).valueOf()
            let dataEmissao = new Date(ano, mes, dia)
            let rg = new RG(valor, dataEmissao);
            cliente.getRgs.push(rg)
            opcaoRg = this.entrada.receberNumero('Deseja cadastrar um RG? 1(Sim), 2(Não)')
        }
        this.clientes.push(cliente)
        var opcaoPet = this.entrada.receberNumero('Deseja cadastrar um pet? 1(Sim), 2(Não)')
        while (opcaoPet === 1) {
            let cadastrarPet = new CadastroPetCliente(cliente, this.pets)

            cadastrarPet.cadastrarPetCliente(cliente)
            opcaoPet = this.entrada.receberNumero('Deseja cadastrar outro pet? 1(Sim), 2(Não)')
        }
        var opcaoTelefone = this.entrada.receberNumero('Deseja cadastrar um telefone? 1(Sim), 2(Não)')
        while (opcaoTelefone === 1) {
            let cadastrarTelefone = new CadastroTelefone(cliente)
            cadastrarTelefone.cadastrar()
            opcaoTelefone = this.entrada.receberNumero('Deseja cadastrar outro telefone? 1(Sim), 2(Não)')
        }

        console.log(`\nCadastro concluído :)\n`);
    }
}