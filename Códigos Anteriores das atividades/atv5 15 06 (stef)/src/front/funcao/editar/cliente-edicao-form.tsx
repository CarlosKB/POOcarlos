import { useState } from "react";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

export default function ClienteFormEdicao() {
  interface Cliente {
    nomeSocial: string;
    nome: string;
    cpf: string;
    dataEmissaoCPF: string;
    // Adicione outros campos relevantes do cliente aqui
  }
  const [cpf, setCpf] = useState("");
  const [cliente, setCliente] = useState<Cliente | null>(null);

  const handleBuscarCliente = () => {
    // Faz a requisição para o backend para buscar o cliente pelo CPF
    fetch(`http://localhost:3001/getClientePorCpf?cpf=${cpf}`)
      .then((response) => response.json())
      .then((data) => {
        setCliente(data);
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao buscar o cliente por CPF:", error);
      });
  };
  console.log(cliente);

  const [clientenomesocial, setNomeSocial] = useState("");
  const [clientenome, setNome] = useState("");
  const [clientedataemissaocpf, setDataEmissaoCPF] = useState("");
  const [clientenovocpf, setNovoCpf] = useState("");
  const handleNomeSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeSocial(e.target.value);
  };

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoCpf(e.target.value);
  };

  const handleDataEmissaoCPFChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataEmissaoCPF(e.target.value);
  };

  const handleEditarCliente = () => {
    // Lógica para enviar a requisição de atualização para o backend
    // Você pode usar uma biblioteca como o axios para fazer a requisição HTTP

    const clienteData = {
      clientenomesocial,
      clientenome,
      clientenovocpf,
      clientedataemissaocpf,
    };
    console.log(clienteData);

    // Exemplo de como fazer uma requisição PUT com o axios
    axios
      .put(`http://localhost:3001/atualizarCliente/${cpf}`, clienteData)
      .then((response) => {
        // Lógica para manipular a resposta de sucesso
        // Definir o estado para atualizar a combobox

        console.log(response.data);
      })
      .catch((error) => {
        // Lógica para manipular erros
        console.log(error);
      });
  };

  const handleExcluirCliente = () => {
    axios
      .delete(`http://localhost:3001/excluirCliente/${cpf}`)
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
          Edição de Cliente
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
          placeholder="CPF"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
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
          onClick={handleBuscarCliente}
        >
          Buscar cliente
        </button>
      </div>

      {/* Exibir os detalhes do cliente encontrado */}
      {cliente && (
        <div>
          <div
            className="input-group position-relative ms-5"
            style={{ width: "600px", top: "80px" }}
          >
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Nome Social"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={cliente.nomeSocial}
              // Defina a função de atualização para o campo "nomeSocial"
              onChange={(e) => handleNomeSocialChange(e)}
            />
          </div>
          <div
            className="input-group position-relative ms-5"
            style={{ width: "600px", top: "110px" }}
          >
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={cliente.nome}
              // Defina a função de atualização para o campo "nome"
              onChange={(e) => handleNomeChange(e)}
            />
          </div>
          <div
            className="input-group position-relative ms-5"
            style={{ width: "600px", top: "140px" }}
          >
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="CPF"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={cliente.cpf}
              // Defina a função de atualização para o campo "dataEmissaoCPF"
              onChange={(e) => handleCpfChange(e)}
            />
          </div>
          <div
            className="input-group position-relative ms-5"
            style={{ width: "600px", top: "170px" }}
          >
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="data de emissão do CPF"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={cliente.dataEmissaoCPF}
              // Defina a função de atualização para o campo "dataEmissaoCPF"
              onChange={(e) => handleDataEmissaoCPFChange(e)}
            />
          </div>

          <div
            className="input-group position-relative ms-5"
            style={{ width: "600px", top: "195px", left: "650px" }}
          >
            <button
              type="button"
              className="btn btn-danger"
              style={{ width: "100px" }}
              onClick={handleExcluirCliente}
            >
              Excluir
            </button>
            <button
              type="button"
              className="btn btn-info"
              style={{ width: "100px", left: "10px" }}
              onClick={handleEditarCliente}
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
