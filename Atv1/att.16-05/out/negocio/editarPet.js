"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
class EditarPet {
    constructor() {
        this.entrada = new entrada_1.default();
    }
    editarPet(pet) {
        console.log(`\nInício da edição do pet`);
        let nomePet = this.entrada.receberTexto(`Por favor informe o nome do pet: `);
        let racaPet = this.entrada.receberTexto(`Por favor informe a raça do pet: `);
        let generoPet = this.entrada.receberTexto(`Por favor informe o genero do pet: `);
        let tipoPet = this.entrada.receberTexto(`Por favor informe o tipo do pet: `);
        pet.setNome = nomePet;
        pet.setRaca = racaPet;
        pet.setGenero = generoPet;
        pet.setTipo = tipoPet;
        console.log(`\Edição concluída :)\n`);
    }
}
exports.default = EditarPet;
