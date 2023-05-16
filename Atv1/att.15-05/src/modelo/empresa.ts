import Cliente from "./cliente"
import Produto from "./produto"
import Servico from "./servico"
import Pet from './pet';

interface ConsumoCliente {
    nome: string;
    cpf: string;
    quantidadeProdutoServicoConsumido: number;
}
interface ConsumoProduto {
    nome: string;
    quantidade: number;
}

export default class Empresa {
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    private pets: Array<Pet>
    public quantidadeConsumida: Array<ConsumoCliente>
    public qntdProdutosTotal: Array<Produto>
    public qntdServicosTotal: Array<Servico>
    constructor() {
        this.clientes = []
        this.produtos = []
        this.servicos = []
        this.pets = []
        this.quantidadeConsumida = []
        this.qntdProdutosTotal = []
        this.qntdServicosTotal = []
    }
    public get getClientes() {
        return this.clientes
    }
    public get getProdutos() {
        return this.produtos
    }
    public get getServicos() {
        return this.servicos
    }
    public get getPets() {
        return this.pets
    }
}