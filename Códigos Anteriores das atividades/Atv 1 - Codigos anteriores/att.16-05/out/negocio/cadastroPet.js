"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const pet_1 = __importDefault(require("../modelo/pet"));
const cadastro_1 = __importDefault(require("./cadastro"));
class CadastroPet extends cadastro_1.default {
    constructor(pets) {
        super();
        this.pets = pets;
        this.entrada = new entrada_1.default();
    }
    cadastrar() {
        console.log(`\nInício do cadastro do pet`);
        let nomepet = this.entrada.receberTexto('Por favor, informe o nome do pet: ');
        let racaPet = this.entrada.receberTexto('Por favor, informe a raça do pet: ');
        let generoPet = this.entrada.receberTexto('Por favor, informe a genero do pet: ');
        let tipoPet = this.entrada.receberTexto('Por favor, informe a tipo do pet: ');
        let pet = new pet_1.default(nomepet, racaPet, generoPet, tipoPet);
        this.pets.push(pet);
        console.log(`\nCadastro concluído :)\n`);
    }
}
exports.default = CadastroPet;
