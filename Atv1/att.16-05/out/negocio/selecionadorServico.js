"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const servico_1 = __importDefault(require("../modelo/servico"));
class selecionadorServico {
    constructor(servicos) {
        this.servicos = servicos;
    }
    selecionarServicos(nomeServico) {
        let servicoAlvo = new servico_1.default();
        this.servicos.forEach(servico => {
            if (nomeServico === servico.nome) {
                servicoAlvo = servico;
            }
        });
        return servicoAlvo;
    }
}
exports.default = selecionadorServico;
