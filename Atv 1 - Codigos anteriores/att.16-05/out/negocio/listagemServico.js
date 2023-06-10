"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("./listagem"));
class ListagemServicos extends listagem_1.default {
    constructor(servicos) {
        super();
        this.servicos = servicos;
    }
    listar() {
        console.log(`\nLista de todos os servicos:`);
        this.servicos.forEach(servico => {
            console.log(`Nome do servico: ${servico.nome}`);
        });
        // for(let i = 0; i< this.servicos.length; i++){
        //     let servico = this.servicos[i]
        //     console.log(`Nome do servico: ${servico.nome}`);
        // }
        // console.log('---------------------------------------');
        // this.servicos.forEach(servico => {
        //     console.log(`Nome: ` + servico.nome);
        //     console.log(`--------------------------------------`);
        // });
        console.log(`\n`);
    }
}
exports.default = ListagemServicos;
