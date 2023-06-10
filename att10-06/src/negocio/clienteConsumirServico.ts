import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";
import Servico from '../modelo/servico';
import SelecionadorPetCliente from "./selecionadorPetCliente";

export default class AtribuirServicoClienteConsumir{
    private servicoConsumido : Servico
    private clienteConsumir : Cliente
    private entrada : Entrada

    constructor(clienteConsumir: Cliente, servicoConsumido : Servico){
        this.clienteConsumir = clienteConsumir
        this.servicoConsumido = servicoConsumido
        this.entrada = new Entrada()
    }

    public consumirProduto(clienteConsumir: Cliente, servicoConsumido: Servico){
        let servico = servicoConsumido
        servicoConsumido.quantidadeConsumida += 1
        let cliente = clienteConsumir
        //pet
        let nomePet = this.entrada.receberTexto('Digite o nome do pet que ira consumir o produto: ')
        let petSelecionador = new SelecionadorPetCliente(clienteConsumir)
        let pet = petSelecionador.selecionarpets(nomePet)
        pet.quantidadeConsumidaProdutoEservico += 1
        pet.servicosConsumidos.push(servicoConsumido)
        //

        cliente.getServicosConsumidos.push(servico)

        var slaEmpresa = new Empresa
        slaEmpresa.qntdServicosTotal.push(servico)
    }
}