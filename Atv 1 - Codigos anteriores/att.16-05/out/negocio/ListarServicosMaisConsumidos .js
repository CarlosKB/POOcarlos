"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("./listagem"));
class ListagemServicosMaisConsumidos extends listagem_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
    }
    listar() {
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            var contServ = 0;
            cliente.getServicosConsumidos.forEach(servico => {
                contServ += 1;
            });
            cliente.quantidadeServicoConsumido = contServ;
            console.log(`Quantidade de serviços consumidos ${cliente.quantidadeServicoConsumido}`);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
exports.default = ListagemServicosMaisConsumidos;
// for(var i = 0; i < Listagem.length; i++){
//     for()
// }
