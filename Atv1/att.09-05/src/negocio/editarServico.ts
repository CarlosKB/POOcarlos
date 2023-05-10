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
        servico.nome = nomeServico
        console.log(`\Edição concluída :)\n`);
    }
}