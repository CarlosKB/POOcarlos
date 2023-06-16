import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";
import Servico from '../modelo/servico';

export default class AtribuirServicoClienteConsumir{
    private servicoConsumido : Servico
    private clienteConsumir : Cliente

    constructor(clienteConsumir: Cliente, servicoConsumido : Servico){
        this.clienteConsumir = clienteConsumir
        this.servicoConsumido = servicoConsumido
    }

    public consumirProduto(clienteConsumir: Cliente, servicoConsumido: Servico){
        let servico = servicoConsumido
        servicoConsumido.quantidadeConsumida += 1
        let cliente = clienteConsumir
        cliente.getServicosConsumidos.push(servico)

        var slaEmpresa = new Empresa
        slaEmpresa.qntdServicosTotal.push(servico)
    }
}