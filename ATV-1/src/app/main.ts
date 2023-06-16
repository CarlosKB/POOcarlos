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
import SelecionadorPet from "../negocio/selecionadorPet";
import AtribuirPetCliente from "../negocio/clienteAtribuirPet";
import ListagemClientePets from "../negocio/listagemPetsAtribuidos";
import CadastroPetCliente from "../negocio/cadastroPetACliente";
import ListagemPetsCliente from "../negocio/listagemPetsCliente";
import SelecionadorPetCliente from "../negocio/selecionadorPetCliente";
import EditarPetCliente from "../negocio/editarPetCliente";
import ListagemProdutosMaisConsumidos from "../negocio/ListarProdutosMaisConsumidos";
import ListarProdutosMaisConsumidosPorCliente from "../negocio/listarProdutosMaisConsumidosPorCliente";
import ListagemServicosEprodutosMaisConsumidos from "../negocio/ListarServicosEprodutosMaisConsumidos";
import ListagemServicosMaisConsumidos from "../negocio/ListarServicosMaisConsumidos ";
import QuantidadeProdutosConsumidos from "../negocio/QuantidadeProdutosConsumidosTop";
import ListagemProdutosMaisConsumidosSla from "../negocio/QuantidadeProdutosConsumidosTop";
import ListagemProdutosEServicosMaisConsumidosTop from "../negocio/QuantidadeProdutosConsumidosTop";
import ListagemServicosEprodutosMaisConsumidosValor from "../negocio/ListarServicosEprodutosMaisConsumidosPreco";
import listagemConsumosPetsPorRaca from "../negocio/ListagemConsumosPetPorRaça";
import listagemConsumosPetsPortipo from "../negocio/ListagemConsumosPetPorTipo";
import listagemConsumosPetsPortipoServico from "../negocio/ListagemConsumosPetPorTipoServico";
import listagemConsumosPetsPorRacaServico from "../negocio/ListagemConsumosPetPorRaçaServico";

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
    console.log(`20 - Listar quantidade de vezes que o cliente consumir um produto`);
    console.log(`21 - Listar quantidade de vezes que o cliente consumiu um serviço`);
    console.log(`22 - Listar os clientes que mais consumiram produtos e serviços em quantidade`);
    console.log(`23 - Listar os clientes que mais consumiram produtos e serviços por valor`);
    console.log(`24 - listar os produtos e serviços mais consumidos `);
    console.log(`25 - Listar os produtos mais consumidos por raça de pets`);
    console.log(`26 - Listar os produtos mais consumidos por tipo de pets`);
    console.log(`27 - Listar os servicos mais consumidos por raça de pets`);
    console.log(`28 - Listar os servicos mais consumidos por tipo de pets`);
    
    
    

    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes, empresa.getPets)
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
            if (prodServ === 1) {
                let nomeProdutoC = entrada.receberTexto('Digite o nome de um produto para consumir: ')
                let selecionadorProdutoC = new SelecionadorProduto(empresa.getProdutos)
                let produtoSelecionadoC = selecionadorProdutoC.selecionarProdutos(nomeProdutoC)
                let atribuir = new AtribuirProdutoClienteConsumir(clienteSelecionadoC, produtoSelecionadoC)
                atribuir.consumirProduto(clienteSelecionadoC, produtoSelecionadoC)
                let listarProdutosConsumidor = new ListagemProdutosConsumidos(empresa.getClientes)
                let listagemProdutosConsumidos = listarProdutosConsumidor.selecionarCliente(cpfClienteC)
                // console.log(`Os produtos que foram consumidos são: ${listagemProdutosConsumidos}`);
            }
            if (prodServ === 2) {
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
        case 15:
            let cpfClienteConServ = entrada.receberTexto('Digite o cpf do cliente para exibir a lista de serviços consumidos: ')
            let listarServicosConsumidor = new ListagemServicosConsumidos(empresa.getClientes)
            let listagemServicosConsumidos = listarServicosConsumidor.selecionarClienteServico(cpfClienteConServ)
            break;
        case 16:
            let cpfPet = entrada.receberTexto('Digite um cpf para atribuir ao pet que será cadastrado: ')
            let selecionadorClientePet = new Selecionador(empresa.getClientes)
            let clientePet = selecionadorClientePet.selecionarCliente(cpfPet)
            let cadastrarPet = new CadastroPetCliente(clientePet, empresa.getPets)
            cadastrarPet.cadastrarPetCliente(clientePet)
            break;
        case 17:
            let cpfPetExcluir = entrada.receberTexto('Digite o cpf do dono do pet: ')
            let selecionadorClientePetExcluir = new Selecionador(empresa.getClientes)
            let clientePetExcluir = selecionadorClientePetExcluir.selecionarCliente(cpfPetExcluir)
            let nomePetClienteExcluir = entrada.receberTexto('Digite o nome do pet para excluir: ')
            let selecionarPetClienteExcluir = new SelecionadorPetCliente(clientePetExcluir)
            let petSelecionadoExcluir = selecionarPetClienteExcluir.selecionarpets(nomePetClienteExcluir)
            let indicePetCliente = clientePetExcluir.getPets.indexOf(petSelecionadoExcluir)
            delete clientePetExcluir.getPets[indicePetCliente]
            break;
        case 18:
            let cpfClientePetEditar = entrada.receberTexto('Digite o cpf do cliente para edição do pet: ')
            let selecionadorClientePetEditar = new Selecionador(empresa.getClientes)
            let clientePetEditar = selecionadorClientePetEditar.selecionarCliente(cpfClientePetEditar)
            let nomePetClienteEditar = entrada.receberTexto('Digite o nome do pet para editar: ')
            let selecionarPetClienteEditar = new SelecionadorPetCliente(clientePetEditar)
            let petSelecionado = selecionarPetClienteEditar.selecionarpets(nomePetClienteEditar)
            let editorPetCliente = new EditarPetCliente()
            editorPetCliente.editarPet(petSelecionado)
            break;
        case 19:
            let cpfPetLista = entrada.receberTexto('Digite o CPF do cliente para listar os pets do mesmo: ')
            let selecionadorClientePetLista = new Selecionador(empresa.getClientes)
            let clientePetlista = selecionadorClientePetLista.selecionarCliente(cpfPetLista)
            let listarPets = new ListagemPetsCliente(clientePetlista)
            listarPets.listar()
            break;
        case 20:
            const listarProdutosConsumidosCliente = new ListagemProdutosMaisConsumidos(empresa.getClientes)
            listarProdutosConsumidosCliente.listar()
            break;
        case 21://Quantidade de vezes que o produto foi consumido pelo cliente 
            const listarServicosMaisConsumidosPorCliente = new ListagemServicosMaisConsumidos(empresa.getClientes)
            listarServicosMaisConsumidosPorCliente.listar()
            break;
        case 22://Top dos cliente que mais consumiram produtos e serviços
            const listarServicosEprodutosMaisConsumidos = new ListagemServicosEprodutosMaisConsumidos(empresa)
            listarServicosEprodutosMaisConsumidos.listar()
            break;
        case 23://Lista dos clientes que mais consumiram produtos e serciços por valor
            const listarServicosEprodutosValores = new ListagemServicosEprodutosMaisConsumidosValor(empresa)
            listarServicosEprodutosValores.listar()
            break;
        case 24://lista dos produtos e serviços mais consumidos em top 
            const listagemProdutosMaisConsumidos = new ListagemProdutosEServicosMaisConsumidosTop(empresa)
            listagemProdutosMaisConsumidos.listar()
            break;
        case 25://Listagem dos produtos mais consumidos raça de pets.
            const listagemConsumoPetRaca = new listagemConsumosPetsPorRaca(empresa.getPets, empresa.getProdutos)
            listagemConsumoPetRaca.listar()
            break;
        case 26://Listagem dos produtos mais consumidos tipo de pets.
            const listagemConsumoPetTipo = new listagemConsumosPetsPortipo(empresa.getPets, empresa.getProdutos)
            listagemConsumoPetTipo.listar()
            break;
        case 27://Listagem dos servicos mais consumidos raca de pets.
            const listagemConsumoPetRacaServico = new listagemConsumosPetsPorRacaServico(empresa.getPets, empresa.getServicos)
            listagemConsumoPetRacaServico.listar()
            break;
        case 28://Listagem dos servicos mais consumidos tipo de pets.
            const listagemConsumoPetTipoServico = new listagemConsumosPetsPortipoServico(empresa.getPets, empresa.getServicos)
            listagemConsumoPetTipoServico.listar()
            break;
        case 0:
            execucao = false
            console.log(`Até mais ;)`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}