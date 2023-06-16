import { log } from "console";
import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/cadastroCliente";
import CadastroProduto from "../negocio/cadastroProduto";
import CadastroServico from "../negocio/cadastroServico";
import EditarCliente from "../negocio/editorCliente";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemProdutos from "../negocio/listagemProdutos";
import ListagemServicos from "../negocio/listagemServico";
import Selecionador from "../negocio/selecionador";
import SelecionadorProduto from "../negocio/selecionadorProduto";
import { loadavg } from "os";
import EditarProduto from "../negocio/editorProduto";
import selecionadorServico from '../negocio/selecionadorServico';
import EditarServico from "../negocio/editarServico";
import AtribuirProdutoClienteConsumir from "../negocio/clienteConsumirProduto";
import ListagemProdutosConsumidos from "../negocio/listagemProdutosConsumidos";
import AtribuirServicoClienteConsumir from "../negocio/clienteConsumirServico";
import ListagemServicosConsumidos from "../negocio/listagemServicosConsumidos";
import CadastroPet from "../negocio/cadastroPet";
import selecionadorPet from '../negocio/selecionadorPet';
import EditarPet from '../negocio/editarPet';
import ListagemPets from '../negocio/listagemPets';

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Excluir um cliente`);
    console.log(`4 - Editar um cliente`);
    console.log(`5 - Cadastrar serviço`);
    console.log(`6 - Listar todos os serviços`);
    console.log(`7 - Excluir um serviço`);
    console.log(`8 - Editar um serviço`)
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
    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrar()
            break;
        case 2:
            let listagem = new ListagemClientes(empresa.getClientes)
            listagem.listar()
            break;
        case 3:
            let cpf = entrada.receberTexto('Digite um cpf para exclusão: ')
            let selecionadorCliente = new Selecionador(empresa.getClientes)
            let cliente = selecionadorCliente.selecionarCliente(cpf)
            console.log(`Nome do cliente selecionado: ${cliente.nome}`);
            let indice = empresa.getClientes.indexOf(cliente)
            delete empresa.getClientes[indice]
            break;
        case 4:
            let cpfEditar = entrada.receberTexto('Digite um cpf para edição: ')
            let selecionadorClienteEditar = new Selecionador(empresa.getClientes)
            let clienteEditar = selecionadorClienteEditar.selecionarCliente(cpfEditar)
            console.log(`Nome do cliente selecionado: ${clienteEditar.nome}`);
            let editor = new EditarCliente()
            editor.editar(clienteEditar)
            break;
        case 5:
            let cadastroServico = new CadastroServico(empresa.getServicos)
            cadastroServico.cadastrar()
            break;
        case 6:
            let listagemServicos = new ListagemServicos(empresa.getServicos)
            listagemServicos.listar()
            break;
        case 7:
            let nomeServico = entrada.receberTexto('Digite o nome do serviço para a exclusão: ')
            let selecionadorServicoExclusao = new selecionadorServico(empresa.getServicos)
            let servicoExclusao = selecionadorServicoExclusao.selecionarServicos(nomeServico)
            console.log(`o serviço selecionado ${servicoExclusao.nome}`);
            let indiceServico = empresa.getServicos.indexOf(servicoExclusao)
            delete empresa.getServicos[indiceServico]
            break;
        case 8:
            let nomeServicoEditar = entrada.receberTexto('Digite o nome do serviço para a edição')
            let selecionadorServicoEditar = new selecionadorServico(empresa.getServicos)
            let servicoEditar = selecionadorServicoEditar.selecionarServicos(nomeServicoEditar)
            console.log(`Nome do serviço selecionado ${servicoEditar.nome}`);
            let editorServico = new EditarServico()
            editorServico.editarServico(servicoEditar)
            break;
        case 9:
            let cadastroProduto = new CadastroProduto(empresa.getProdutos)
            cadastroProduto.cadastrar()
            break;
        case 10:
            let listagemProdutos = new ListagemProdutos(empresa.getProdutos)
            listagemProdutos.listar()
            break;
        case 11:
            let nomeProduto = entrada.receberTexto('Digite o nome de um produto para exclusão: ')
            let selecionadorProduto = new SelecionadorProduto(empresa.getProdutos)
            let produtoExcluir = selecionadorProduto.selecionarProdutos(nomeProduto)
            console.log(`O produto selecionado foi: ${produtoExcluir.nome}`);
            let indiceProduto = empresa.getProdutos.indexOf(produtoExcluir)
            delete empresa.getProdutos[indiceProduto]
            break;
        case 12:
            let nomeProdutoEditar = entrada.receberTexto('Digite o nome do produto para a edição: ')
            let selecionadorProdutoEditar = new SelecionadorProduto(empresa.getProdutos)
            let produtoEditar = selecionadorProdutoEditar.selecionarProdutos(nomeProdutoEditar)
            console.log(`O produto selecionado foi: ${produtoEditar.nome}`);
            let editarProduto = new EditarProduto()
            editarProduto.editarProduto(produtoEditar)
            break;
        case 13:
            var cpfClienteC = entrada.receberTexto('Digite o cpf do cliente que irá consumir o produto ou serviço: ')
            var selecionadorClienteC = new Selecionador(empresa.getClientes)
            var clienteSelecionadoC = selecionadorClienteC.selecionarCliente(cpfClienteC)
            let prodServ = entrada.receberNumero('Selecione 1 se for produto e 2 para serviço: ')
            if (prodServ === 1){
                let nomeProdutoC = entrada.receberTexto('Digite o nome de um produto para consumir: ')
                let selecionadorProdutoC = new SelecionadorProduto(empresa.getProdutos)
                let produtoSelecionadoC = selecionadorProdutoC.selecionarProdutos(nomeProdutoC)
                let atribuir = new AtribuirProdutoClienteConsumir(clienteSelecionadoC, produtoSelecionadoC)
                atribuir.consumirProduto(clienteSelecionadoC, produtoSelecionadoC)
                let listarProdutosConsumidor = new ListagemProdutosConsumidos(empresa.getClientes)
                let listagemProdutosConsumidos = listarProdutosConsumidor.selecionarCliente(cpfClienteC)
                // console.log(`Os produtos que foram consumidos são: ${listagemProdutosConsumidos}`);
            }
            if (prodServ === 2){
                let nomeServicoC = entrada.receberTexto('Digite o nome do serviço para consumir: ')
                let selecionadorServicoC = new selecionadorServico(empresa.getServicos)
                let servicoSelecionadoC = selecionadorServicoC.selecionarServicos(nomeServicoC)
                let atribuirServico = new AtribuirServicoClienteConsumir(clienteSelecionadoC, servicoSelecionadoC)
                atribuirServico.consumirProduto(clienteSelecionadoC, servicoSelecionadoC)
                let listarServicosConsumidor = new ListagemServicosConsumidos(empresa.getClientes)
                let listagemServicosConsumidos = listarServicosConsumidor.selecionarClienteServico(cpfClienteC)
            }
            break;
        case 14:
            let cpfClienteCon = entrada.receberTexto('Digite o cpf do cliente para exibir a lista de produtos consumidos: ')
            let listarProdutosConsumidor = new ListagemProdutosConsumidos(empresa.getClientes)
            let listagemProdutosConsumidos = listarProdutosConsumidor.selecionarCliente(cpfClienteCon)
            break;  
        case 16:
            let cadastrarPet = new CadastroPet(empresa.getPets)
            cadastrarPet.cadastrar()
            break;
        case 17:
            let nomePetE = entrada.receberTexto('Digite o nome do pet para a exclusão: ')
            let selecionadorPetExclusao = new selecionadorPet(empresa.getPets)
            let petExclusao = selecionadorPetExclusao.selecionarpets(nomePetE)
            console.log(`O serviço selecionado ${petExclusao.getNome}`);
            let indicePetE = empresa.getPets.indexOf(petExclusao)
            delete empresa.getPets[indicePetE]
            break;
        case 18:
            let nomePetEditar = entrada.receberTexto('Digite o nome do pet para a edição')
            let selecionadorPetEditar = new selecionadorPet(empresa.getPets)
            let petEditar = selecionadorPetEditar.selecionarpets(nomePetEditar)
            console.log(`Nome do pet selecionado ${petEditar.getNome}`);
            let editorPet = new EditarPet()
            editorPet.editarPet(petEditar)
            break;
        case 19:
            let listarPets = new ListagemPets(empresa.getPets)
            listarPets.listar()
            break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}