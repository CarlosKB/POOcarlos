import Entrada from "../io/entrada"
import Produto from "../modelo/produto"
import Servico from "../modelo/servico"
import Cadastro from "./cadastro"

export default class EditarServico {
    private entrada: Entrada
    constructor(){
        this.entrada = new Entrada()
    }
    public editarServico(servico: Servico): void {
        console.log(`\nInício da edição do serviço`);
        let nomeServico = this.entrada.receberTexto(`Por favor informe o nome do serviço: `)
        let precoServico = this.entrada.receberNumero('Por favor digite o valor do serviço: ')
        servico.nome = nomeServico
        servico.preco = precoServico
        console.log(`\Edição concluída :)\n`);
    }
}