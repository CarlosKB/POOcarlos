import Entrada from "../io/entrada"
import Produto from "../modelo/produto"
import Cadastro from "./cadastro"

export default class EditarProduto {
    private entrada: Entrada
    constructor(){
        this.entrada = new Entrada()
    }
    public editarProduto(produto: Produto): void {
        console.log(`\nInício da edição do produto`);
        let nomeProduto = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
        let precoProduto = this.entrada.receberNumero(`Por favor digite o valor do produto: `)
        produto.nome = nomeProduto
        produto.preco = precoProduto
        console.log(`\Edição concluída :)\n`);
    }
}