import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClienteFormCadastro from "../front/cadastrar/cliente-cadastro-form";
import PetCadastroForm from "../front/cadastrar/pet-cadastro-form";
import ProdutoFormCadastro from "../front/cadastrar/produto-cadastro-form";
import ServicoFormCadastro from "../front/cadastrar/servico-cadastro-form";
import ClienteFormEdicao from "../front/editar/cliente-edicao-form";
import PetFormEdicao from "../front/editar/pet-edicao-form";
import ProdutoFormEdicao from "../front/editar/produto-edicao-form";
import ServicoFormEdicao from '../front/editar/servico-edicao-form';
import ClienteListarTabela from "../front/listar/cliente-listar-tabela";
import PetListarTabela from "../front/listar/pet-listar-tabela";
import ProdutoListarTabela from "../front/listar/produto-listar-tabela";
import ServicoListarTabela from "../front/listar/servico-listar-tabela";


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
        </BrowserRouter>
    )    
}