import Servico from "../modelo/servico"

export default class selecionadorServico{
    private servicos: Array<Servico>
    constructor(servicos: Array<Servico>){
        this.servicos = servicos
    }

    public selecionarServicos(nomeServico: string){
        let servicoAlvo = new Servico()
        this.servicos.forEach(servico =>{
            if (nomeServico === servico.nome){
                servicoAlvo = servico
            }
        })
        return servicoAlvo
    }
}