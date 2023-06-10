import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Listagem from './listagem';

export default class ListagemServicosMaisConsumidos extends Listagem {
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
            var contServ = 0
            cliente.getServicosConsumidos.forEach(servico =>{
                contServ += 1
            })
            cliente.quantidadeServicoConsumido = contServ
            console.log(`Quantidade de serviços consumidos ${cliente.quantidadeServicoConsumido}`);
            
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}

// for(var i = 0; i < Listagem.length; i++){
//     for()
// }