import Entrada from "../io/entrada"
//import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import servico from "../modelo/servico"
import Servico from "../modelo/servico"
import Cadastro from "./cadastro"

export default class CadastroServico extends Cadastro {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do servico`);
        let nomeservico = this.entrada.receberTexto('Por favor, informe o nome do servico: ');
        let precoServico = this.entrada.receberNumero('Por favor, informe o preço do serviço: ')
        let servico = new Servico()
        servico.nome = nomeservico
        servico.preco = precoServico
        this.servicos.push(servico)

        console.log(`\nCadastro concluído :)\n`);
    }
}