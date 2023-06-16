import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from 'react';

export default function ServicoFormEdicao() {
  interface Servico {
    serviconome: string;
    servicopreco: number;
    // Adicione outros campos relevantes do cliente aqui
  }
    const [serviconome, setServiconome] = useState("");
    const [servico, setServico] = useState<Servico | null>(null);
  
    const handleBuscarServico = () => {
      // Faz a requisição para o backend para buscar o cliente pelo CPF
      fetch(`http://localhost:3001/getServicoPorNome?serviconome=${serviconome}`)
        .then((response) => response.json())
        .then((data) => {
          setServico(data);
        })
        .catch((error) => {
          console.error("Ocorreu um erro ao buscar o servico por nome:", error);
        });
    };
  console.log(servico);

  const [serviconovonome, setServiconovonome] = useState("");
  const [servicopreco, setServicopreco] = useState("");

  const handleServiconomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiconovonome(e.target.value);
  };
  
  const handleServicoprecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServicopreco(e.target.value);
  };

  const handleEditarServico = () => {
  
    const servicoData = {
      serviconovonome,
      servicopreco,
    };
    console.log(servicoData);

    axios
      .put(`http://localhost:3001/atualizarServico/${serviconome}`, servicoData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
  const handleExcluirServico = () => {
    axios
      .delete(`http://localhost:3001/excluirServico/${serviconome}`)
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
          Edição de Servico
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
          placeholder="Nome do servico"
          aria-label="CPF do responsavel"
          aria-describedby="basic-addon1"
          onChange={(e) => setServiconome(e.target.value)}
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
          onClick={handleBuscarServico}
        >
          Buscar servico
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
          placeholder="Novo nome do servico"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => handleServiconomeChange(e)}
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
          placeholder="Novo valor do servico"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => handleServicoprecoChange(e)}
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
          onClick={handleExcluirServico}
        >
          Excluir
        </button>
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "100px", left: "10px" }}
          onClick={handleEditarServico}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
