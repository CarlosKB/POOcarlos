import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Cadastro from "./cadastro"

export default class EditarCliente {
    private entrada: Entrada
    constructor(){
        this.entrada = new Entrada()
    }
    public editar(cliente:Cliente): void {
        console.log(`\nInício da edição do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);

        cliente.nome = nome
        cliente.nomeSocial = nomeSocial
        // let partesData = data.split('/')
        // let ano = new Number(partesData[2].valueOf()).valueOf()
        // let mes = new Number(partesData[1].valueOf()).valueOf()
        // let dia = new Number(partesData[0].valueOf()).valueOf()
        // let dataEmissao = new Date(ano, mes, dia)
        // let cpf = new CPF(valor, dataEmissao);
        // cliente. = cpf
        console.log(`\Edição concluída :)\n`);
    }
}