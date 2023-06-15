
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClienteFormCadastro from "../front/funcao/cadastrar/cliente-cadastro-form";
import PetCadastroForm from "../front/funcao/cadastrar/pet-cadastro-form";
import ProdutoFormCadastro from "../front/funcao/cadastrar/produto-cadastro-form";
import ServicoFormCadastro from "../front/funcao/cadastrar/servico-cadastro-form";
import ClienteFormEdicao from "../front/funcao/editar/cliente-edicao-form";
import PetFormEdicao from "../front/funcao/editar/pet-edicao-form";
import ProdutoFormEdicao from "../front/funcao/editar/produto-edicao-form";
import ServicoFormEdicao from '../front/funcao/editar/servico-edicao-form';
import ClienteListarTabela from "../front/funcao/listar/cliente-listar-tabela";
import PetListarTabela from "../front/funcao/listar/pet-listar-tabela";
import ProdutoListarTabela from "../front/funcao/listar/produto-listar-tabela";
import ServicoListarTabela from "../front/funcao/listar/servico-listar-tabela";
import ConsumirProduto from "../front/funcao/acoes/consumir-produto";
import ConsumirServico from "../front/funcao/acoes/consumir-servico";

import ClienteTopServicosDashTabela from '../front/funcao/dashboard/cliente-dash-top-servicos';
import ClienteTopProdutosDashTabela from "../front/funcao/dashboard/cliente-dash-top-produtos";
import ProdutoMaisConsumidoPorRacaDashTabela from "../front/funcao/dashboard/pet-dash-raca-mais-consumido-produto";
import ProdutoMaisConsumidoPorTipoDashTabela from "../front/funcao/dashboard/pet-dash-tipo-mais-consumido-produto";
import ServicoMaisConsumidoPorRacaDashTabela from "../front/funcao/dashboard/pet-dash-raca-mais-consumido-servico";
import ServicoMaisConsumidoPorTipoDashTabela from "../front/funcao/dashboard/pet-dash-tipo-mais-consumido-servico";
import ServicosMaisConsumidosDashTabela from "../front/funcao/dashboard/servico-dash-mais-consumidos";
import ProdutosMaisConsumidosDashTabela from "../front/funcao/dashboard/produto-dash-mais-consumidos";
import TelefoneCadastroForm from "../front/funcao/cadastrar/telefone-cadastro-form";
import TelefoneListarTabela from "../front/funcao/listar/telefone-listar-tabela";
import ClienteTopProdutosDashTabelaValor from "../front/funcao/dashboard/cliente-dash-top-produtosValor";
import ClienteTopServicosDashTabelaValor from "../front/funcao/dashboard/cliente-dash-top-servicosValor";

export const Rotas = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<ClienteFormCadastro />} />
        </Routes>

        <Routes>
            <Route path="/PetCadastroForm" element={<PetCadastroForm />} />
        </Routes>

        <Routes>
            <Route path="/ProdutoFormCadastro" element={<ProdutoFormCadastro />} />
        </Routes>

        <Routes>
            <Route path="/ServicoFormCadastro" element={<ServicoFormCadastro />} />
        </Routes>
        <Routes>
            <Route path="/ClienteFormEdicao" element={<ClienteFormEdicao />} />
        </Routes>  
        <Routes>
            <Route path="/PetFormEdicao" element={<PetFormEdicao />} />
        </Routes> 
        <Routes>
            <Route path="/ProdutoFormEdicao" element={<ProdutoFormEdicao />} />
        </Routes> 
        <Routes>
            <Route path="/ServicoFormEdicao" element={<ServicoFormEdicao />} />
        </Routes> 
        <Routes>
            <Route path="/ClienteListarTabela" element={<ClienteListarTabela />} />
        </Routes>
        <Routes>
            <Route path="/PetListarTabela" element={<PetListarTabela />} />
        </Routes>
        <Routes>
            <Route path="/ProdutoListarTabela" element={<ProdutoListarTabela />} />
        </Routes>
        <Routes>
            <Route path="/ServicoListarTabela" element={<ServicoListarTabela />} />
        </Routes>
        <Routes>
            <Route path="/ConsumirProduto" element={<ConsumirProduto />} />
        </Routes>
        <Routes>
            <Route path="/ConsumirServico" element={<ConsumirServico />} />
        </Routes>
        <Routes>
            <Route path="/ClienteTopServicosDashTabela" element={<ClienteTopServicosDashTabela />} />
        </Routes>
        <Routes>
            <Route path="/ClienteTopProdutosDashTabela" element={<ClienteTopProdutosDashTabela />} />
        </Routes>
        <Routes>
            <Route path="/ProdutoMaisConsumidoPorRacaDashTabela" element={<ProdutoMaisConsumidoPorRacaDashTabela />} />
        </Routes>
        <Routes>
            <Route path="/ProdutoMaisConsumidoPorTipoDashTabela" element={<ProdutoMaisConsumidoPorTipoDashTabela />} />
        </Routes>
        <Routes>
            <Route path="/ServicoMaisConsumidoPorRacaDashTabela" element={<ServicoMaisConsumidoPorRacaDashTabela />} />
        </Routes>
        <Routes>
            <Route path="/ServicoMaisConsumidoPorTipoDashTabela" element={<ServicoMaisConsumidoPorTipoDashTabela />} />
        </Routes>
        <Routes>
            <Route path="/ServicosMaisConsumidosDashTabela" element={<ServicosMaisConsumidosDashTabela />} />
        </Routes>
        <Routes>
            <Route path="/ProdutosMaisConsumidosDashTabela" element={<ProdutosMaisConsumidosDashTabela />} />
        </Routes>
        <Routes>
            <Route path="/TelefoneCadastroForm" element={<TelefoneCadastroForm />} />
        </Routes>
        <Routes>
            <Route path="/TelefoneListarTabela" element={<TelefoneListarTabela />} />
        </Routes>
        <Routes>
            <Route path="/ClienteTopProdutosDashTabelaValor" element={<ClienteTopProdutosDashTabelaValor />} />
        </Routes>
        <Routes>
            <Route path="/ClienteTopServicosDashTabelaValor" element={<ClienteTopServicosDashTabelaValor/>} />
        </Routes>
        </BrowserRouter>
    )    
}