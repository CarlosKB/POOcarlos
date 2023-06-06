"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const pet_1 = __importDefault(require("../modelo/pet"));
class CadastroPetCliente {
    constructor(cliente) {
        this.cliente = cliente;
        //this.pets = pets
        this.entrada = new entrada_1.default();
    }
    cadastrarPetCliente(cliente) {
        console.log(`\nInício do cadastro do pet`);
        let nomepet = this.entrada.receberTexto('Por favor, informe o nome do pet: ');
        let racaPet = this.entrada.receberTexto('Por favor, informe a raça do pet: ');
        let generoPet = this.entrada.receberTexto('Por favor, informe a genero do pet: ');
        let tipoPet = this.entrada.receberTexto('Por favor, informe a tipo do pet: ');
        let pet = new pet_1.default(nomepet, racaPet, generoPet, tipoPet);
        cliente.getPets.push(pet);
        // this.pets.push(pet)
        console.log(`\nCadastro concluído :)\n`);
    }
}
exports.default = CadastroPetCliente;
