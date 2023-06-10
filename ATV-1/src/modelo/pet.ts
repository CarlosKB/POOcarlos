import Produto from "./produto"
import Servico from "./servico"

export default class Pet {
    private nome: string
    private tipo: string
    private raca: string
    private genero: string
    public produtosConsumidos: Array<Produto> 
    public servicosConsumidos: Array<Servico>
    public quantidadeConsumidaProdutoEservico: number

    constructor(nome: string, raca: string, genero: string, tipo: string) {
        this.nome = nome
        this.raca = raca
        this.genero = genero
        this.tipo = tipo
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.quantidadeConsumidaProdutoEservico = 0
    }

    public get getNome(){return this.nome}
    public get getRaca(){return this.raca}
    public get getGenero(){return this.genero}
    public get getTipo(){return this.tipo}

    public set setNome(nome: string){this.nome = nome}
    public set setRaca(raca: string){this.raca = raca}
    public set setGenero(genero: string){this.genero = genero}
    public set setTipo(tipo: string){this.tipo = tipo}
    
}