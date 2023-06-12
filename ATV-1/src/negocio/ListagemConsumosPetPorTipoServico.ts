import Pet from "../modelo/pet"
import servico from "../modelo/servico"

export default class listagemConsumosPetsPortipoServico {
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
    //                 if (petJa.gettipo === pet.gettipo) {
    //                     this.jaPassou = true
    //                 }
    //             })
    //             if (this.jaPassou === false) {
    //                 let somaQuantidade = 0;
    //                 for (let i = 0; i < servico.listaPets.length; i++) {
    //                     if (pet.gettipo === servico.listaPets[i].gettipo) {
    //                         somaQuantidade += 1;
    //                     }
    //                 }
    //                 console.log(`O servico ${servico.nome} foi consumido pela raça de pet ${pet.gettipo} ${somaQuantidade} vezes.`);
    //                 this.petsListados.push(pet)
    //                 this.servicoNaoPassado = false
    //             }
    //         });
    //     });
    // }
    listar() {
        this.servicos.forEach(servico => {
            const tiposConsumidas: { [tipo: string]: number } = {};
            const tiposExibidas: { [tipo: string]: boolean } = {};

            servico.listaPets.forEach(pet => {
                const tipo = pet.getTipo;
                if (tipo in tiposConsumidas) {
                    tiposConsumidas[tipo]++;
                } else {
                    tiposConsumidas[tipo] = 1;
                }
            });

            console.log(`Tipos de pet que mais consumiram o servico ${servico.nome}:`);
            Object.entries(tiposConsumidas)
                .sort(([, a], [, b]) => b - a)
                .forEach(([tipo, quantidade]) => {
                    if (!tiposExibidas[tipo]) {
                        console.log(`- ${tipo}: ${quantidade} vezes`);
                        tiposExibidas[tipo] = true;
                    }
                });

            // console.log(`tipos que menos consumiram o servico ${servico.nome}:`);
            // Object.entries(tiposConsumidas)
            //     .sort(([, a], [, b]) => a - b)
            //     .forEach(([tipo, quantidade]) => {
            //         if (!tiposExibidas[tipo]) {
            //             console.log(`- ${tipo}: ${quantidade} vezes`);
            //             tiposExibidas[tipo] = true;
            //         }
            //     });

            console.log('---'); // Separador entre os servicos
        });
    }



}