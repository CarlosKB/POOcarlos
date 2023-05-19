// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ClienteFormCadastro from "../front/função/cadastrar/cliente-cadastro-form";
// import PetCadastroForm from "../front/função/cadastrar/pet-cadastro-form";
// import ProdutoFormCadastro from "../front/função/cadastrar/produto-cadastro-form";
// import ServicoFormCadastro from "../front/função/cadastrar/servico-cadastro-form";
// import ClienteFormEdicao from "../front/função/editar/cliente-edicao-form";
// import PetFormEdicao from "../front/função/editar/pet-edicao-form";
// import ProdutoFormEdicao from "../front/função/editar/produto-edicao-form";
// import ServicoFormEdicao from '../front/função/editar/servico-edicao-form';
// import ClienteListarTabela from "../front/função/listar/cliente-listar-tabela";
// import PetListarTabela from "../front/função/listar/pet-listar-tabela";
// import ProdutoListarTabela from "../front/função/listar/produto-listar-tabela";
// import ServicoListarTabela from "../front/função/listar/servico-listar-tabela";
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