"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const empresa_1 = __importDefault(require("../modelo/empresa"));
const cadastroCliente_1 = __importDefault(require("../negocio/cadastroCliente"));
const cadastroProduto_1 = __importDefault(require("../negocio/cadastroProduto"));
const cadastroServico_1 = __importDefault(require("../negocio/cadastroServico"));
const editorCliente_1 = __importDefault(require("../negocio/editorCliente"));
const listagemClientes_1 = __importDefault(require("../negocio/listagemClientes"));
const listagemProdutos_1 = __importDefault(require("../negocio/listagemProdutos"));
const listagemServico_1 = __importDefault(require("../negocio/listagemServico"));
const selecionador_1 = __importDefault(require("../negocio/selecionador"));
const selecionadorProduto_1 = __importDefault(require("../negocio/selecionadorProduto"));
const editorProduto_1 = __importDefault(require("../negocio/editorProduto"));
const selecionadorServico_1 = __importDefault(require("../negocio/selecionadorServico"));
const editarServico_1 = __importDefault(require("../negocio/editarServico"));
const clienteConsumirProduto_1 = __importDefault(require("../negocio/clienteConsumirProduto"));
const listagemProdutosConsumidos_1 = __importDefault(require("../negocio/listagemProdutosConsumidos"));
const clienteConsumirServico_1 = __importDefault(require("../negocio/clienteConsumirServico"));
const listagemServicosConsumidos_1 = __importDefault(require("../negocio/listagemServicosConsumidos"));
const cadastroPetACliente_1 = __importDefault(require("../negocio/cadastroPetACliente"));
const listagemPetsCliente_1 = __importDefault(require("../negocio/listagemPetsCliente"));
const selecionadorPetCliente_1 = __importDefault(require("../negocio/selecionadorPetCliente"));
const editarPetCliente_1 = __importDefault(require("../negocio/editarPetCliente"));
const ListarProdutosMaisConsumidos_1 = __importDefault(require("../negocio/ListarProdutosMaisConsumidos"));
const listarProdutosMaisConsumidosPorCliente_1 = __importDefault(require("../negocio/listarProdutosMaisConsumidosPorCliente"));
const ListarServicosEprodutosMaisConsumidos_1 = __importDefault(require("../negocio/ListarServicosEprodutosMaisConsumidos"));
const QuantidadeProdutosConsumidosTop_1 = __importDefault(require("../negocio/QuantidadeProdutosConsumidosTop"));
const ListarServicosEprodutosMaisConsumidosPreco_1 = __importDefault(require("../negocio/ListarServicosEprodutosMaisConsumidosPreco"));
console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`);
let empresa = new empresa_1.default();
let execucao = true;
while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Excluir um cliente`);
    console.log(`4 - Editar um cliente`);
    console.log(`5 - Cadastrar serviço`);
    console.log(`6 - Listar todos os serviços`);
    console.log(`7 - Excluir um serviço`);
    console.log(`8 - Editar um serviço`);
    console.log(`9 - Cadastrar produto`);
    console.log(`10 - Listar todos os produtos`);
    console.log(`11- Excluir um produto`);
    console.log(`12 - Editar um produto`);
    console.log(`13 - Cliente consumir produto ou serviço`);
    console.log(`14 - Listar produtos consumidos por cliente`);
    console.log(`15 - Listar serviços consumidos por cliente`);
    console.log(`16 - Cadastrar pet`);
    console.log(`17 - Excluir pet`);
    console.log(`18 - Editar pet`);
    console.log(`19 - Listar pets`);
    console.log(`20 - Atribuir pet a cliente`);
    console.log(`0 - Sair`);
    let entrada = new entrada_1.default();
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);
    switch (opcao) {
        case 1:
            let cadastro = new cadastroCliente_1.default(empresa.getClientes);
            cadastro.cadastrar();
            break;
        case 2:
            let listagem = new listagemClientes_1.default(empresa.getClientes);
            listagem.listar();
            break;
        case 3:
            let cpf = entrada.receberTexto('Digite um cpf para exclusão: ');
            let selecionadorCliente = new selecionador_1.default(empresa.getClientes);
            let cliente = selecionadorCliente.selecionarCliente(cpf);
            console.log(`Nome do cliente selecionado: ${cliente.nome}`);
            let indice = empresa.getClientes.indexOf(cliente);
            delete empresa.getClientes[indice];
            break;
        case 4:
            let cpfEditar = entrada.receberTexto('Digite um cpf para edição: ');
            let selecionadorClienteEditar = new selecionador_1.default(empresa.getClientes);
            let clienteEditar = selecionadorClienteEditar.selecionarCliente(cpfEditar);
            console.log(`Nome do cliente selecionado: ${clienteEditar.nome}`);
            let editor = new editorCliente_1.default();
            editor.editar(clienteEditar);
            break;
        case 5:
            let cadastroServico = new cadastroServico_1.default(empresa.getServicos);
            cadastroServico.cadastrar();
            break;
        case 6:
            let listagemServicos = new listagemServico_1.default(empresa.getServicos);
            listagemServicos.listar();
            break;
        case 7:
            let nomeServico = entrada.receberTexto('Digite o nome do serviço para a exclusão: ');
            let selecionadorServicoExclusao = new selecionadorServico_1.default(empresa.getServicos);
            let servicoExclusao = selecionadorServicoExclusao.selecionarServicos(nomeServico);
            console.log(`o serviço selecionado ${servicoExclusao.nome}`);
            let indiceServico = empresa.getServicos.indexOf(servicoExclusao);
            delete empresa.getServicos[indiceServico];
            break;
        case 8:
            let nomeServicoEditar = entrada.receberTexto('Digite o nome do serviço para a edição');
            let selecionadorServicoEditar = new selecionadorServico_1.default(empresa.getServicos);
            let servicoEditar = selecionadorServicoEditar.selecionarServicos(nomeServicoEditar);
            console.log(`Nome do serviço selecionado ${servicoEditar.nome}`);
            let editorServico = new editarServico_1.default();
            editorServico.editarServico(servicoEditar);
            break;
        case 9:
            let cadastroProduto = new cadastroProduto_1.default(empresa.getProdutos);
            cadastroProduto.cadastrar();
            break;
        case 10:
            let listagemProdutos = new listagemProdutos_1.default(empresa.getProdutos);
            listagemProdutos.listar();
            break;
        case 11:
            let nomeProduto = entrada.receberTexto('Digite o nome de um produto para exclusão: ');
            let selecionadorProduto = new selecionadorProduto_1.default(empresa.getProdutos);
            let produtoExcluir = selecionadorProduto.selecionarProdutos(nomeProduto);
            console.log(`O produto selecionado foi: ${produtoExcluir.nome}`);
            let indiceProduto = empresa.getProdutos.indexOf(produtoExcluir);
            delete empresa.getProdutos[indiceProduto];
            break;
        case 12:
            let nomeProdutoEditar = entrada.receberTexto('Digite o nome do produto para a edição: ');
            let selecionadorProdutoEditar = new selecionadorProduto_1.default(empresa.getProdutos);
            let produtoEditar = selecionadorProdutoEditar.selecionarProdutos(nomeProdutoEditar);
            console.log(`O produto selecionado foi: ${produtoEditar.nome}`);
            let editarProduto = new editorProduto_1.default();
            editarProduto.editarProduto(produtoEditar);
            break;
        case 13:
            var cpfClienteC = entrada.receberTexto('Digite o cpf do cliente que irá consumir o produto ou serviço: ');
            var selecionadorClienteC = new selecionador_1.default(empresa.getClientes);
            var clienteSelecionadoC = selecionadorClienteC.selecionarCliente(cpfClienteC);
            let prodServ = entrada.receberNumero('Selecione 1 se for produto e 2 para serviço: ');
            if (prodServ === 1) {
                let nomeProdutoC = entrada.receberTexto('Digite o nome de um produto para consumir: ');
                let selecionadorProdutoC = new selecionadorProduto_1.default(empresa.getProdutos);
                let produtoSelecionadoC = selecionadorProdutoC.selecionarProdutos(nomeProdutoC);
                let atribuir = new clienteConsumirProduto_1.default(clienteSelecionadoC, produtoSelecionadoC);
                atribuir.consumirProduto(clienteSelecionadoC, produtoSelecionadoC);
                let listarProdutosConsumidor = new listagemProdutosConsumidos_1.default(empresa.getClientes);
                let listagemProdutosConsumidos = listarProdutosConsumidor.selecionarCliente(cpfClienteC);
                // console.log(`Os produtos que foram consumidos são: ${listagemProdutosConsumidos}`);
            }
            if (prodServ === 2) {
                let nomeServicoC = entrada.receberTexto('Digite o nome do serviço para consumir: ');
                let selecionadorServicoC = new selecionadorServico_1.default(empresa.getServicos);
                let servicoSelecionadoC = selecionadorServicoC.selecionarServicos(nomeServicoC);
                let atribuirServico = new clienteConsumirServico_1.default(clienteSelecionadoC, servicoSelecionadoC);
                atribuirServico.consumirProduto(clienteSelecionadoC, servicoSelecionadoC);
                let listarServicosConsumidor = new listagemServicosConsumidos_1.default(empresa.getClientes);
                let listagemServicosConsumidos = listarServicosConsumidor.selecionarClienteServico(cpfClienteC);
            }
            break;
        case 14:
            let cpfClienteCon = entrada.receberTexto('Digite o cpf do cliente para exibir a lista de produtos consumidos: ');
            let listarProdutosConsumidor = new listagemProdutosConsumidos_1.default(empresa.getClientes);
            let listagemProdutosConsumidos = listarProdutosConsumidor.selecionarCliente(cpfClienteCon);
            break;
        case 15:
            let cpfClienteConServ = entrada.receberTexto('Digite o cpf do cliente para exibir a lista de serviços consumidos: ');
            let listarServicosConsumidor = new listagemServicosConsumidos_1.default(empresa.getClientes);
            let listagemServicosConsumidos = listarServicosConsumidor.selecionarClienteServico(cpfClienteConServ);
            break;
        // case 16:
        //     let cadastrarPet = new CadastroPet(empresa.getPets)
        //     cadastrarPet.cadastrar()
        //     break;
        case 16:
            let cpfPet = entrada.receberTexto('Digite um cpf para edição: ');
            let selecionadorClientePet = new selecionador_1.default(empresa.getClientes);
            let clientePet = selecionadorClientePet.selecionarCliente(cpfPet);
            let cadastrarPet = new cadastroPetACliente_1.default(clientePet);
            cadastrarPet.cadastrarPetCliente(clientePet);
            break;
        // case 17:
        //     let nomePetE = entrada.receberTexto('Digite o nome do pet para a exclusão: ')
        //     let selecionadorPetExclusao = new selecionadorPet(empresa.getPets)
        //     let petExclusao = selecionadorPetExclusao.selecionarpets(nomePetE)
        //     console.log(`O serviço selecionado ${petExclusao.getNome}`);
        //     let indicePetE = empresa.getPets.indexOf(petExclusao)
        //     delete empresa.getPets[indicePetE]
        //     break;
        case 17:
            let cpfPetExcluir = entrada.receberTexto('Digite um cpf para edição: ');
            let selecionadorClientePetExcluir = new selecionador_1.default(empresa.getClientes);
            let clientePetExcluir = selecionadorClientePetExcluir.selecionarCliente(cpfPetExcluir);
            let nomePetClienteExcluir = entrada.receberTexto('Digite o nome do pet para excluir: ');
            let selecionarPetClienteExcluir = new selecionadorPetCliente_1.default(clientePetExcluir);
            let petSelecionadoExcluir = selecionarPetClienteExcluir.selecionarpets(nomePetClienteExcluir);
            let indicePetCliente = clientePetExcluir.getPets.indexOf(petSelecionadoExcluir);
            delete clientePetExcluir.getPets[indicePetCliente];
            break;
        // case 18:
        //     let nomePetEditar = entrada.receberTexto('Digite o nome do pet para a edição')
        //     let selecionadorPetEditar = new selecionadorPet(empresa.getPets)
        //     let petEditar = selecionadorPetEditar.selecionarpets(nomePetEditar)
        //     console.log(`Nome do pet selecionado ${petEditar.getNome}`);
        //     let editorPet = new EditarPet()
        //     editorPet.editarPet(petEditar)
        //     break;
        case 18:
            let cpfClientePetEditar = entrada.receberTexto('Digite o cpf do pet para edição: ');
            let selecionadorClientePetEditar = new selecionador_1.default(empresa.getClientes);
            let clientePetEditar = selecionadorClientePetEditar.selecionarCliente(cpfClientePetEditar);
            let nomePetClienteEditar = entrada.receberTexto('Digite o nome do pet para editar: ');
            let selecionarPetClienteEditar = new selecionadorPetCliente_1.default(clientePetEditar);
            let petSelecionado = selecionarPetClienteEditar.selecionarpets(nomePetClienteEditar);
            let editorPetCliente = new editarPetCliente_1.default();
            editorPetCliente.editarPet(petSelecionado);
            break;
        // case 19:
        //     let listarPets = new ListagemPets(empresa.getPets)
        //     listarPets.listar()
        //     break;
        case 19:
            let cpfPetLista = entrada.receberTexto('Digite o CPF do cliente para listar os pets do mesmo: ');
            let selecionadorClientePetLista = new selecionador_1.default(empresa.getClientes);
            let clientePetlista = selecionadorClientePetLista.selecionarCliente(cpfPetLista);
            let listarPets = new listagemPetsCliente_1.default(clientePetlista);
            listarPets.listar();
            break;
        // case 20:
        //     var cpfClienteCPet = entrada.receberTexto('Digite o cpf do cliente que irá atribuir um pet: ')
        //     var selecionadorClienteCPet = new Selecionador(empresa.getClientes)
        //     var clienteSelecionadoCPet = selecionadorClienteCPet.selecionarCliente(cpfClienteCPet)
        //     let nomePetC = entrada.receberTexto('Digite o nome do pet para atribuir: ')
        //     let selecionadorPetC = new SelecionadorPet(empresa.getPets)
        //     let petSelecionadoC = selecionadorPetC.selecionarpets(nomePetC)
        //     let atribuirPet = new AtribuirPetCliente(clienteSelecionadoCPet, petSelecionadoC)
        //     atribuirPet.atribuirPet(clienteSelecionadoCPet, petSelecionadoC)
        //     let listarPetsAtribuidos = new ListagemClientePets(empresa.getClientes)
        //     let listagemPetsClientes = listarPetsAtribuidos.selecionarClientePet(cpfClienteCPet)
        //     break;
        case 20:
            const listarProdutosConsumidosCliente = new ListarProdutosMaisConsumidos_1.default(empresa.getClientes);
            listarProdutosConsumidosCliente.listar();
            break;
        case 21:
            const listarProdutosMaisConsumidosPorCliente = new listarProdutosMaisConsumidosPorCliente_1.default(empresa.getClientes);
            listarProdutosMaisConsumidosPorCliente.listar();
            break;
        case 22:
            // const listarProdutosConsumidosCliente1 = new ListagemProdutosMaisConsumidos(empresa.getClientes)
            // listarProdutosConsumidosCliente1.listar()
            // const listarServicosConsumidosCliente1 = new ListagemServicosMaisConsumidos(empresa.getClientes)
            // listarServicosConsumidosCliente1.listar()
            const listarServicosEprodutosMaisConsumidos = new ListarServicosEprodutosMaisConsumidos_1.default(empresa);
            listarServicosEprodutosMaisConsumidos.listar();
            break;
        case 23:
            const listagemProdutosMaisConsumidos = new QuantidadeProdutosConsumidosTop_1.default(empresa);
            listagemProdutosMaisConsumidos.listar();
            break;
        case 24:
            const listarServicosEprodutosValores = new ListarServicosEprodutosMaisConsumidosPreco_1.default(empresa);
            listarServicosEprodutosValores.listar();
            break;
        case 0:
            execucao = false;
            console.log(`Até mais`);
            break;
        default:
            console.log(`Operação não entendida :(`);
    }
}
