"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
class EditarServico {
    constructor() {
        this.entrada = new entrada_1.default();
    }
    editarServico(servico) {
        console.log(`\nInício da edição do serviço`);
        let nomeServico = this.entrada.receberTexto(`Por favor informe o nome do serviço: `);
        servico.nome = nomeServico;
        console.log(`\Edição concluída :)\n`);
    }
}
exports.default = EditarServico;
