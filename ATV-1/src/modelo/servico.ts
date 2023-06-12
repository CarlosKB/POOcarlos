import Pet from "./pet"

export default class Servico {
    public tipo = 'Serviço'
    public nome!: string
    public preco! : number
    public quantidadeConsumida = 0
    public listaPets: Array<Pet>
    constructor(){
        this.listaPets = []//Depois fazer onde é consumido os produtos
        //Pegar o produto que for consumir e atribuir um pet a ele
        //Para depois alterarmos a funcao ListagemConsumosPetPorRaca, para pegar essa array e verificar quantas vezes aquele produto foi consumido por tal raça
    }
}