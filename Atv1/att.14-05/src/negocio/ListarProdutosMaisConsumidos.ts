import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Listagem from './listagem';

export default class ListagemProdutosMaisConsumidos extends Listagem {
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
            var contProd = 0
            cliente.getProdutosConsumidos.forEach(produto =>{
                contProd += 1
            })
            cliente.quantidadeProdutoConsumido = contProd
            console.log(`Quantidade de produtos consumidos ${cliente.quantidadeProdutoConsumido}`);
            
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}

// for(var i = 0; i < Listagem.length; i++){
//     for()
// }