
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClienteFormCadastro from "../front/classe/cadastrar/cliente-cadastro-form";
import PetCadastroForm from "../front/classe/cadastrar/pet-cadastro-form";
import ProdutoFormCadastro from "../front/classe/cadastrar/produto-cadastro-form";
import ServicoFormCadastro from "../front/classe/cadastrar/servico-cadastro-form";
import ClienteFormEdicao from "../front/classe/editar/cliente-edicao-form";
import PetFormEdicao from "../front/classe/editar/pet-edicao-form";
import ProdutoFormEdicao from "../front/classe/editar/produto-edicao-form";
import ServicoFormEdicao from '../front/classe/editar/servico-edicao-form';
import ClienteListarTabela from "../front/classe/listar/cliente-listar-tabela";
import PetListarTabela from "../front/classe/listar/pet-listar-tabela";
import ProdutoListarTabela from "../front/classe/listar/produto-listar-tabela";
import ServicoListarTabela from "../front/classe/listar/servico-listar-tabela";
import ConsumirProduto from "../front/classe/acoes/consumir-produto";
import ConsumirServico from "../front/classe/acoes/consumir-servico";
import ClienteTopServicosDashTabela from '../front/classe/dashboard/cliente-dash-top-servicos';
import ClienteTopProdutosDashTabela from "../front/classe/dashboard/cliente-dash-top-produtos";
import ProdutoMaisConsumidoPorRacaDashTabela from "../front/classe/dashboard/pet-dash-raca-mais-consumido-produto";
import ProdutoMaisConsumidoPorTipoDashTabela from "../front/classe/dashboard/pet-dash-tipo-mais-consumido-produto";
import ServicoMaisConsumidoPorRacaDashTabela from "../front/classe/dashboard/pet-dash-raca-mais-consumido-servico";
import ServicoMaisConsumidoPorTipoDashTabela from "../front/classe/dashboard/pet-dash-tipo-mais-consumido-servico";
import ServicosMaisConsumidosDashTabela from "../front/classe/dashboard/servico-dash-mais-consumidos";
import ProdutosMaisConsumidosDashTabela from "../front/classe/dashboard/produto-dash-mais-consumidos";
import TelefoneCadastroForm from "../front/classe/cadastrar/telefone-cadastro-form";

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
        </BrowserRouter>
    )    
}