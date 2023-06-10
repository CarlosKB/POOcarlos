import Pet from "../modelo/pet"
import Produto from "../modelo/produto"

export default class listagemConsumosPetsPorRaca {
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
    //             if(pet.getRaca === listaAux[i].getRaca){
    //                 somaQuantidade += 1
    //             }
    //             if(i === listaAux.length -1){
    //                 console.log(`A raça ${pet.getRaca} consumiu ${somaQuantidade} vezes.`);
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
    //                 if (petJa.getRaca === pet.getRaca) {
    //                     this.jaPassou = true
    //                 }
    //             })
    //             if (this.jaPassou === false) {
    //                 let somaQuantidade = 0;
    //                 for (let i = 0; i < produto.listaPets.length; i++) {
    //                     if (pet.getRaca === produto.listaPets[i].getRaca) {
    //                         somaQuantidade += 1;
    //                     }
    //                 }
    //                 console.log(`O produto ${produto.nome} foi consumido pela raça de pet ${pet.getRaca} ${somaQuantidade} vezes.`);
    //                 this.petsListados.push(pet)
    //                 this.produtoNaoPassado = false
    //             }
    //         });
    //     });
    // }
    listar() {
        this.produtos.forEach(produto => {
            const racasConsumidas: { [raca: string]: number } = {};
            const racasExibidas: { [raca: string]: boolean } = {};

            produto.listaPets.forEach(pet => {
                const raca = pet.getRaca;
                if (raca in racasConsumidas) {
                    racasConsumidas[raca]++;
                } else {
                    racasConsumidas[raca] = 1;
                }
            });

            console.log(`Racas que mais consumiram o produto ${produto.nome}:`);
            Object.entries(racasConsumidas)
                .sort(([, a], [, b]) => b - a)
                .forEach(([raca, quantidade]) => {
                    if (!racasExibidas[raca]) {
                        console.log(`- ${raca}: ${quantidade} vezes`);
                        racasExibidas[raca] = true;
                    }
                });

            // console.log(`Racas que menos consumiram o produto ${produto.nome}:`);
            // Object.entries(racasConsumidas)
            //     .sort(([, a], [, b]) => a - b)
            //     .forEach(([raca, quantidade]) => {
            //         if (!racasExibidas[raca]) {
            //             console.log(`- ${raca}: ${quantidade} vezes`);
            //             racasExibidas[raca] = true;
            //         }
            //     });

            console.log('---'); // Separador entre os produtos
        });
    }



}