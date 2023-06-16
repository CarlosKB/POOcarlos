import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from 'react';

export default function ProdutoFormEdicao() {
  interface Produto {
    produtnome: string;
    produtopreco: number;
    // Adicione outros campos relevantes do cliente aqui
  }
    const [produtonome, setProdutonome] = useState("");
    const [produto, setProduto] = useState<Produto | null>(null);
  
    const handleBuscarProduto = () => {
      // Faz a requisição para o backend para buscar o cliente pelo CPF
      fetch(`http://localhost:3001/getProdutoPorNome?produtonome=${produtonome}`)
        .then((response) => response.json())
        .then((data) => {
          setProduto(data);
        })
        .catch((error) => {
          console.error("Ocorreu um erro ao buscar o produto por nome:", error);
        });
    };
  console.log(produto);

  const [produtonovonome, setProdutonovonome] = useState("");
  const [produtopreco, setProdutopreco] = useState("");

  const handleProdutonomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProdutonovonome(e.target.value);
  };
  
  const handleProdutoprecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProdutopreco(e.target.value);
  };

  const handleEditarProduto = () => {
  
    const produtoData = {
      produtonovonome,
      produtopreco,
    };
    console.log(produtoData);

    axios
      .put(`http://localhost:3001/atualizarProduto/${produtonome}`, produtoData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  const handleExcluirProduto = () => {
    axios
      .delete(`http://localhost:3001/excluirProduto/${produtonome}`)
      .then((response) => {
        console.log(response.data);
        // Realiza alguma ação adicional, se necessário
      })
      .catch((error) => {
        console.log(error);
        // Lida com o erro, se necessário
      });
  };

  return (
    <div>
      <Navbar />

      <div>
        <h2
          className="position-absolute top-20 end-60  mt-4"
          style={{ marginLeft: "150px" }}
        >
          Edição de Produto
        </h2>
      </div>
      <div
        className="input-group position-relative ms-5 mt-5"
        style={{ width: "600px", top: "50px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Nome do produto"
          aria-label="CPF do responsavel"
          aria-describedby="basic-addon1"
          onChange={(e) => setProdutonome(e.target.value)}
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "10px", left: "300px" }}
      >
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "200px", marginLeft: "350px" }}
          onClick={handleBuscarProduto}
        >
          Buscar produto
        </button>
      </div>
      <div
        className="input-group position-relative ms-5 mt-5"
        style={{ width: "600px", top: "30px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Novo nome do produto"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => handleProdutonomeChange(e)}
        />
      </div>
      <div
        className="input-group position-relative ms-5 mt-5"
        style={{ width: "600px", top: "30px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          R$
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Novo valor do produto"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => handleProdutoprecoChange(e)}
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "90px", left: "390px" }}
      >
        <button
          type="button"
          className="btn btn-danger"
          style={{ width: "100px" }}
          onClick={handleExcluirProduto}
        >
          Excluir
        </button>
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "100px", left: "10px" }}
          onClick={handleEditarProduto}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
