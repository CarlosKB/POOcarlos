import Pet from "../modelo/pet"
import Produto from "../modelo/produto"

export default class listagemConsumosPetsPortipo {
    private produtos: Array<Produto>
    private pets: Array<Pet>
    private petsListados: Array<Pet>
    private produtoNaoPassado = false
    private jaPassou = false
    constructor(pets: Array<Pet>, produtos: Array<Produto>) {
        this.pets = pets
        this.produtos = produtos
        this.petsListados = []
    }

    // public listar(){
    //     var listaAux = this.pets
    //     var lista = this.pets
    //     lista.forEach(pet=>{
    //         var somaQuantidade = 0
    //         for(var i = 0; i < listaAux.length; i++){
    //             if(pet.gettipo === listaAux[i].gettipo){
    //                 somaQuantidade += 1
    //             }
    //             if(i === listaAux.length -1){
    //                 console.log(`A raça ${pet.gettipo} consumiu ${somaQuantidade} vezes.`);
    //             }
    //         }
    //     })
    // }
    // listar() {
    //     let listaProd = this.produtos;
    //     let listaAuxProd = this.produtos;

    //     listaProd.forEach(produto => {
    //         this.produtoNaoPassado = true
    //         produto.listaPets.forEach(pet => {
    //             if(this.produtoNaoPassado === true){
    //                 this.petsListados = []
    //             }

    //             this.jaPassou = false
    //             this.petsListados.forEach(petJa => {
    //                 if (petJa.gettipo === pet.gettipo) {
    //                     this.jaPassou = true
    //                 }
    //             })
    //             if (this.jaPassou === false) {
    //                 let somaQuantidade = 0;
    //                 for (let i = 0; i < produto.listaPets.length; i++) {
    //                     if (pet.gettipo === produto.listaPets[i].gettipo) {
    //                         somaQuantidade += 1;
    //                     }
    //                 }
    //                 console.log(`O produto ${produto.nome} foi consumido pela raça de pet ${pet.gettipo} ${somaQuantidade} vezes.`);
    //                 this.petsListados.push(pet)
    //                 this.produtoNaoPassado = false
    //             }
    //         });
    //     });
    // }
    listar() {
        this.produtos.forEach(produto => {
            const tiposConsumidas: { [tipo: string]: number } = {};
            const tiposExibidas: { [tipo: string]: boolean } = {};

            produto.listaPets.forEach(pet => {
                const tipo = pet.getTipo;
                if (tipo in tiposConsumidas) {
                    tiposConsumidas[tipo]++;
                } else {
                    tiposConsumidas[tipo] = 1;
                }
            });

            console.log(`Tipos de pet que mais consumiram o produto ${produto.nome}:`);
            Object.entries(tiposConsumidas)
                .sort(([, a], [, b]) => b - a)
                .forEach(([tipo, quantidade]) => {
                    if (!tiposExibidas[tipo]) {
                        console.log(`- ${tipo}: ${quantidade} vezes`);
                        tiposExibidas[tipo] = true;
                    }
                });

            // console.log(`tipos que menos consumiram o produto ${produto.nome}:`);
            // Object.entries(tiposConsumidas)
            //     .sort(([, a], [, b]) => a - b)
            //     .forEach(([tipo, quantidade]) => {
            //         if (!tiposExibidas[tipo]) {
            //             console.log(`- ${tipo}: ${quantidade} vezes`);
            //             tiposExibidas[tipo] = true;
            //         }
            //     });

            console.log('---'); // Separador entre os produtos
        });
    }



}