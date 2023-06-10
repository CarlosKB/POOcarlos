import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Listagem from './listagem';

export default class ListarProdutosMaisConsumidosPorCliente extends Listagem {
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
            var auxlistaProdutosConsumidos = cliente.getProdutosConsumidos
            auxlistaProdutosConsumidos.forEach(produto =>{
                var contProdutoLista = 0
                var consumiuSeila
                for(var i = 0; i < auxlistaProdutosConsumidos.length; i++){
                    if(auxlistaProdutosConsumidos[i].nome == produto.nome){
                        contProdutoLista += 1
                        consumiuSeila = contProdutoLista
                        // auxlistaProdutosConsumidos.splice(i, 1)
                    }
                    if(i === auxlistaProdutosConsumidos.length - 1){
                        console.log(`Este produto: ${produto.nome} foi consumido ${consumiuSeila} vezes.`);
                    }
                }
            })
            // cliente.getProdutosConsumidos.forEach(produto =>{
            //     contProd += 1
            // })

            // cliente.quantidadeProdutoConsumido = contProd
            // console.log(`Quantidade de produtos consumidos ${cliente.quantidadeProdutoConsumido}`);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}

// for(var i = 0; i < Listagem.length; i++){
//     for()
// }