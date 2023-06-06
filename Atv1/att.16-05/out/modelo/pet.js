"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pet {
    constructor(nome, raca, genero, tipo) {
        this.nome = nome;
        this.raca = raca;
        this.genero = genero;
        this.tipo = tipo;
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
    }
    get getNome() { return this.nome; }
    get getRaca() { return this.raca; }
    get getGenero() { return this.genero; }
    get getTipo() { return this.tipo; }
    set setNome(nome) { this.nome = nome; }
    set setRaca(raca) { this.raca = raca; }
    set setGenero(genero) { this.genero = genero; }
    set setTipo(tipo) { this.tipo = tipo; }
}
exports.default = Pet;
