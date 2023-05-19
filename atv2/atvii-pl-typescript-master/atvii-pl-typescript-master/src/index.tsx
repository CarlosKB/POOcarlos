import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Roteador from './componentes/roteador';
import ClienteFormCadastro from './front/cadastrar/cliente-cadastro-form';
import ProdutoFormCadastro from './front/cadastrar/produto-cadastro-form';
import PetCadastroForm from './front/cadastrar/produto-cadastro-form';
import ServicoFormCadastro from './front/cadastrar/servico-cadastro-form';
import { Routes } from 'react-router-dom';
import App from './App';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
