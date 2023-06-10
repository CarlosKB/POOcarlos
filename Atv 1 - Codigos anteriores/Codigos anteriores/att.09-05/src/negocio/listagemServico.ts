import Listagem from "./listagem";
import Servico from "../modelo/servico";

export default class ListagemServicos extends Listagem {
    private servicos: Array<Servico>
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
    }
    public listar(): void {
        console.log(`\nLista de todos os servicos:`);

        this.servicos.forEach( servico =>{
            console.log(`Nome do servico: ${servico.nome}`);
        })

        // for(let i = 0; i< this.servicos.length; i++){
        //     let servico = this.servicos[i]
        //     console.log(`Nome do servico: ${servico.nome}`);
            
        // }
        // console.log('---------------------------------------');

        // this.servicos.forEach(servico => {
        //     console.log(`Nome: ` + servico.nome);
        //     console.log(`--------------------------------------`);
        // });
        console.log(`\n`);
    }
}