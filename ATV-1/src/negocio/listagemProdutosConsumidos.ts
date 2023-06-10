import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Produto from "../modelo/produto"

export default class ListagemProdutosConsumidos{
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>){
        this.clientes = clientes
    }
    public selecionarCliente(numeroCpf: string): void{//nao precisa mostrar a parte dos pets TALVEZ NEM PRECISE DESSES
        let cpf = new CPF('', new Date())
        var clienteAlvo = new Cliente('', '', cpf)
        this.clientes.forEach(cliente =>{
            if (numeroCpf === cliente.getCpf.getValor){
                clienteAlvo = cliente
            }
            console.log(`\nLista de todos os produtos:`);
            clienteAlvo.getProdutosConsumidos.forEach(produto =>{
                console.log(`Nome do produto: ${produto.nome} Quantidade: ${produto.quantidadeConsumida}`);
            })
            clienteAlvo.getPets.forEach(pet=>{
                console.log(`Nome do pet: ${pet.getNome}`);
                console.log('Produtos consumidos pelo pet: ');
                pet.produtosConsumidos.forEach(produto=>{
                    console.log(`Nome do produto: ${produto.nome}`);
                })
                
            })
            console.log(`\n`);
        })
    }

    // public selecionarCliente(numeroCpf: string): void {
    //     let cpf = new CPF('', new Date());
    //     let clienteAlvo = new Cliente('', '', cpf);
    //     this.clientes.forEach(cliente => {
    //         if (numeroCpf === cliente.getCpf.getValor) {
    //             clienteAlvo = cliente;
    //         }
    //         console.log(`\nLista de todos os produtos:`);
    //         const produtosMostrados = new Set(); // Conjunto para evitar repetições
    
    //         clienteAlvo.getProdutosConsumidos.forEach(produto => {
    //             const produtoChave = `${produto.nome}-${produto.quantidadeConsumida}`; // Utiliza nome e quantidade como chave
    //             if (!produtosMostrados.has(produtoChave)) {
    //                 produtosMostrados.add(produtoChave); // Adiciona a chave ao conjunto
    //                 console.log(`Nome do produto: ${produto.nome} Quantidade: ${produto.quantidadeConsumida}`);
    //             }
    //         });
    
    //         clienteAlvo.getPets.forEach(pet => {
    //             console.log(`Nome do pet: ${pet.getNome}`);
    //             console.log('Produtos consumidos pelo pet: ');
    //             const produtosMostradosPet = new Set(); // Conjunto para evitar repetições
    
    //             pet.produtosConsumidos.forEach(produto => {
    //                 const produtoChave = `${produto.nome}-${produto.quantidadeConsumida}`; // Utiliza nome e quantidade como chave
    //                 if (!produtosMostradosPet.has(produtoChave)) {
    //                     produtosMostradosPet.add(produtoChave); // Adiciona a chave ao conjunto
    //                     console.log(`Nome do produto: ${produto.nome} Quantidade: ${produto.quantidadeConsumida}`);
    //                 }
    //             });
    //         });
    //         console.log(`\n`);
    //     });
    // }
    




}