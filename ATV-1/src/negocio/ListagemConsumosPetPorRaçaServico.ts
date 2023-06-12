import Pet from "../modelo/pet"
import servico from "../modelo/servico"

export default class listagemConsumosPetsPorRacaServico {
    private servicos: Array<servico>
    private pets: Array<Pet>
    private petsListados: Array<Pet>
    private servicoNaoPassado = false
    private jaPassou = false
    constructor(pets: Array<Pet>, servicos: Array<servico>) {
        this.pets = pets
        this.servicos = servicos
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
    //     let listaProd = this.servicos;
    //     let listaAuxProd = this.servicos;

    //     listaProd.forEach(servico => {
    //         this.servicoNaoPassado = true
    //         servico.listaPets.forEach(pet => {
    //             if(this.servicoNaoPassado === true){
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
    //                 for (let i = 0; i < servico.listaPets.length; i++) {
    //                     if (pet.getRaca === servico.listaPets[i].getRaca) {
    //                         somaQuantidade += 1;
    //                     }
    //                 }
    //                 console.log(`O servico ${servico.nome} foi consumido pela raça de pet ${pet.getRaca} ${somaQuantidade} vezes.`);
    //                 this.petsListados.push(pet)
    //                 this.servicoNaoPassado = false
    //             }
    //         });
    //     });
    // }
    listar() {
        this.servicos.forEach(servico => {
            const racasConsumidas: { [raca: string]: number } = {};
            const racasExibidas: { [raca: string]: boolean } = {};

            servico.listaPets.forEach(pet => {
                const raca = pet.getRaca;
                if (raca in racasConsumidas) {
                    racasConsumidas[raca]++;
                } else {
                    racasConsumidas[raca] = 1;
                }
            });

            console.log(`Racas que mais consumiram o servico ${servico.nome}:`);
            Object.entries(racasConsumidas)
                .sort(([, a], [, b]) => b - a)
                .forEach(([raca, quantidade]) => {
                    if (!racasExibidas[raca]) {
                        console.log(`- ${raca}: ${quantidade} vezes`);
                        racasExibidas[raca] = true;
                    }
                });

            // console.log(`Racas que menos consumiram o servico ${servico.nome}:`);
            // Object.entries(racasConsumidas)
            //     .sort(([, a], [, b]) => a - b)
            //     .forEach(([raca, quantidade]) => {
            //         if (!racasExibidas[raca]) {
            //             console.log(`- ${raca}: ${quantidade} vezes`);
            //             racasExibidas[raca] = true;
            //         }
            //     });

            console.log('---'); // Separador entre os servicos
        });
    }



}