import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Servico from "../modelo/servico"
import servico from "../modelo/servico"

export default class ListagemServicosConsumidos{
    private clientes: Array<Cliente>
    private listaservicosPassados: Array<Servico>
    private listaservicosPassadosPet: Array<servico>
    constructor(clientes: Array<Cliente>){
        this.clientes = clientes
        this.listaservicosPassados = []
        this.listaservicosPassadosPet = []
    }
    // public selecionarClienteServico(numeroCpf: string): void{
    //     let cpf = new CPF('', new Date())
    //     var clienteAlvo = new Cliente('', '', cpf)
    //     this.clientes.forEach(cliente =>{
    //         if (numeroCpf === cliente.getCpf.getValor){
    //             clienteAlvo = cliente
    //         }
    //         console.log(`\nLista de todos os serviços:`);
    //         clienteAlvo.getServicosConsumidos.forEach(servico =>{
    //             console.log(`Nome do serviço: ${servico.nome}`);
    //         })
    //         console.log(`\n`);
    //     })
    // }
    public selecionarClienteServico(numeroCpf: string): void {
        let cpf = new CPF('', new Date());
        var clienteAlvo = new Cliente('', '', cpf)

        this.clientes.forEach(cliente => {
            if (numeroCpf === cliente.getCpf.getValor) {
                clienteAlvo = cliente;
            }
        });
        const listaservicosConsumidos = clienteAlvo.getServicosConsumidos;
        console.log('\nLista de todos os servicos:');
        this.listaservicosPassados = [];

        listaservicosConsumidos.forEach(servico => {
            let somaQuantidade = 0;
        
            for (let i = 0; i < clienteAlvo.getServicosConsumidos.length; i++) {
                if (servico.nome === clienteAlvo.getServicosConsumidos[i].nome) {
                    somaQuantidade += 1;
                }
            }
        
            if (!this.listaservicosPassados.includes(servico)) {
                console.log(`Nome do serviço: ${servico.nome} Quantidade: ${somaQuantidade}`);
                this.listaservicosPassados.push(servico);
            }
        });
        

        clienteAlvo.getPets.forEach(pet => {
            console.log(`Nome do pet: ${pet.getNome}`);
            console.log('servicos consumidos pelo pet: ');
            this.listaservicosPassadosPet = [];

            pet.servicosConsumidos.forEach(servico => {
                let somaQuantidadePet = 0;
            
                for (let i = 0; i < pet.servicosConsumidos.length; i++) {
                    if (servico.nome === pet.servicosConsumidos[i].nome) {
                        somaQuantidadePet += 1;
                    }
                }
            
                if (!this.listaservicosPassadosPet.includes(servico)) {
                    console.log(`Nome do serviço: ${servico.nome} Quantidade: ${somaQuantidadePet}`);
                    this.listaservicosPassadosPet.push(servico);
                }
            });            
        });
    }
}