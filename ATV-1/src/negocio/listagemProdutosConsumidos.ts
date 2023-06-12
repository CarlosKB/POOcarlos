import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Produto from "../modelo/produto"

export default class ListagemProdutosConsumidos {
    private clientes: Array<Cliente>
    private listaProdutosPassados: Array<Produto>
    private listaProdutosPassadosPet: Array<Produto>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.listaProdutosPassados = []
        this.listaProdutosPassadosPet = []
    }
    //     public selecionarCliente(numeroCpf: string): void{//nao precisa mostrar a parte dos pets TALVEZ NEM PRECISE DESSES
    //         let cpf = new CPF('', new Date())
    //         var clienteAlvo = new Cliente('', '', cpf)
    //         this.clientes.forEach(cliente =>{
    //             if (numeroCpf === cliente.getCpf.getValor){
    //                 clienteAlvo = cliente
    //             }
    //             const listaProdutosConsumidos = clienteAlvo.getProdutosConsumidos
    //             console.log(`\nLista de todos os produtos:`);
    //             this.listaProdutosPassados = []
    //             clienteAlvo.getProdutosConsumidos.forEach(produto =>{
    //                 var somaQuantidade = 0
    //                 for(var i = 1; i < listaProdutosConsumidos.length;i++){
    //                     if(produto.nome === listaProdutosConsumidos[i].nome){
    //                         somaQuantidade += 1
    //                     }
    //                 }
    //                 if(produto.nome !in this.listaProdutosPassados){
    //                     console.log(`Nome do produto: ${produto.nome} Quantidade: ${somaQuantidade}`);
    //                     this.listaProdutosPassados.push(produto)
    //                 }

    //             })
    //             clienteAlvo.getPets.forEach(pet=>{
    //                 console.log(`Nome do pet: ${pet.getNome}`);
    //                 console.log('Produtos consumidos pelo pet: ');
    //                 this.listaProdutosPassadosPet = []
    //                 pet.produtosConsumidos.forEach(produto =>{
    //                     var somaQuantidadePet = 0
    //                     for(var i = 1; i < listaProdutosConsumidos.length;i++){
    //                         if(produto.nome === listaProdutosConsumidos[i].nome){
    //                             somaQuantidadePet += 1
    //                         }
    //                     }
    //                     if(produto.nome !in this.listaProdutosPassadosPet){
    //                         console.log(`Nome do produto: ${produto.nome} Quantidade: ${somaQuantidadePet}`);
    //                         this.listaProdutosPassadosPet.push(produto)
    //                     }

    //                 })
    //             console.log(`\n`);
    //         })
    //     }
    // }
    public selecionarCliente(numeroCpf: string): void {
        let cpf = new CPF('', new Date());
        var clienteAlvo = new Cliente('', '', cpf)

        this.clientes.forEach(cliente => {
            if (numeroCpf === cliente.getCpf.getValor) {
                clienteAlvo = cliente;
            }
        });
        const listaProdutosConsumidos = clienteAlvo.getProdutosConsumidos;
        console.log('\nLista de todos os produtos:');
        this.listaProdutosPassados = [];

        listaProdutosConsumidos.forEach(produto => {
            let somaQuantidade = 0;
        
            for (let i = 0; i < clienteAlvo.getProdutosConsumidos.length; i++) {
                if (produto.nome === clienteAlvo.getProdutosConsumidos[i].nome) {
                    somaQuantidade += 1;
                }
            }
        
            if (!this.listaProdutosPassados.includes(produto)) {
                console.log(`Nome do produto: ${produto.nome} Quantidade: ${somaQuantidade}`);
                this.listaProdutosPassados.push(produto);
            }
        });

        clienteAlvo.getPets.forEach(pet => {
            console.log(`Nome do pet: ${pet.getNome}`);
            console.log('Produtos consumidos pelo pet: ');
            this.listaProdutosPassadosPet = [];
                
            pet.produtosConsumidos.forEach(produto => {
                let somaQuantidadePet = 0;
            
                for (let i = 0; i < pet.produtosConsumidos.length; i++) {
                    if (produto.nome === pet.produtosConsumidos[i].nome) {
                        somaQuantidadePet += 1;
                    }
                }
            
                if (!this.listaProdutosPassadosPet.includes(produto)) {
                    console.log(`Nome do produto: ${produto.nome} Quantidade: ${somaQuantidadePet}`);
                    this.listaProdutosPassadosPet.push(produto);
                }
            });
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