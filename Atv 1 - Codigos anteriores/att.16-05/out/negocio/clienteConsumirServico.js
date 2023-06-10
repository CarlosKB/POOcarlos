"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empresa_1 = __importDefault(require("../modelo/empresa"));
class AtribuirServicoClienteConsumir {
    constructor(clienteConsumir, servicoConsumido) {
        this.clienteConsumir = clienteConsumir;
        this.servicoConsumido = servicoConsumido;
    }
    consumirProduto(clienteConsumir, servicoConsumido) {
        let servico = servicoConsumido;
        servicoConsumido.quantidadeConsumida += 1;
        let cliente = clienteConsumir;
        cliente.getServicosConsumidos.push(servico);
        var slaEmpresa = new empresa_1.default;
        slaEmpresa.qntdServicosTotal.push(servico);
    }
}
exports.default = AtribuirServicoClienteConsumir;
