import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";
import {useEffect} from 'react';

export default function TelefoneFormEdicao() {
  //listar pet no combobox por cpf do cliente
  interface Telefone {
    clientetelefoneid: string;
    telefoneddd: string;
    telefonenumero: string;
  }
  const [atualizarCombobox, setAtualizarCombobox] = useState(false);
  const [cpf, setCpf] = useState("");
  const [telefones, setTelefones] = useState<Telefone[]>([]);
  const [telefoneSelecionado, setTelefoneSelecionado] = useState<{
    clientetelefoneid: string;
    telefoneddd: string;
    telefonenumero: string;
  } | null>(null);

  const buscarTelefonePorCPF = () => {
    setTelefoneSelecionado(null); // Limpa o pet selecionado ao buscar por CPF
  if (cpf) {
    axios
      .get(`http://localhost:3001/listarTelefonesPorCPF?cpf=${cpf}`)
      .then((response) => {
        if (response.data.length > 0) {
          setTelefones(response.data);
        } else {
          setTelefones([]);
          setTelefoneSelecionado(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setTelefones([]);
        setTelefoneSelecionado(null);
      });
  }
  };

  const selecionarTelefone = (telefone: Telefone | null) => {
    if (telefone) {
      setTelefoneid(telefone.clientetelefoneid);
    } else {
      setTelefoneid("");
    }
    setTelefoneSelecionado(telefone);
  };

  const [clientetelefoneid, setTelefoneid] = useState("")
  const [telefoneddd, setTelefoneddd] = useState("");
  const [telefonenumero, setTelefonenumero] = useState("");
    console.log(telefoneSelecionado?.clientetelefoneid);
  const handleDDDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefoneddd(e.target.value);
  };

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefonenumero(e.target.value);
  };


  const handleEditarTelefone = () => {
    if (telefoneSelecionado) {
      setTelefoneid(telefoneSelecionado.clientetelefoneid);
    }
    const telefoneData = {
      clientetelefoneid,
      telefoneddd,
      telefonenumero,
    };
    console.log(telefoneData);
    
    // Exemplo de como fazer uma requisição PUT com o axios
    axios
      .put(`http://localhost:3001/atualizarTelefone/${clientetelefoneid}`, telefoneData)
      .then((response) => {
        // Lógica para manipular a resposta de sucesso
        // Definir o estado para atualizar a combobox
        setTelefoneSelecionado((prevState) => {
          if (prevState) {
            return { ...prevState, telefonenumero: telefonenumero };
          }
          return prevState;
        });
        setAtualizarCombobox(true);
        console.log(response.data);
      })
      .catch((error) => {
        // Lógica para manipular erros
        console.log(error);
      });
      
  };
  useEffect(() => {
    if (atualizarCombobox) {
      buscarTelefonePorCPF();
      setAtualizarCombobox(false);
    }
  }, [atualizarCombobox]);

  
  const handleExcluirTelefone = () => {
    
  console.log(clientetelefoneid, cpf);
    axios
      .delete(`http://localhost:3001/excluirTelefone/${clientetelefoneid}/${cpf}`)
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
          Edição de telefone
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
          placeholder="CPF do cliente"
          aria-label="CPF do responsavel"
          aria-describedby="basic-addon1"
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
          onClick={buscarTelefonePorCPF}
        >
          Buscar telefone
        </button>
      </div>
      <div className="input-group mb-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ top: "45px", left: "48px" }}
        >
          {telefoneSelecionado ? telefoneSelecionado.telefonenumero : "Selecione um telefone"}
        </button>
        <ul className="dropdown-menu">
          {telefones.length === 0 ? (
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => selecionarTelefone(null)}
              >
                Nenhum
              </a>
            </li>
          ) : (
            telefones.map((telefone) => (
              <li key={telefone.clientetelefoneid}>
                <a
                  id="combobox-pet"
                  className="dropdown-item"
                  href="#"
                  onClick={() => selecionarTelefone(telefone)}
                >
                  {telefone.telefonenumero}
                </a>
              </li>
            ))
          )}
        </ul>
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
          placeholder="DDD do telefone"
          aria-label="Nome do pet"
          aria-describedby="basic-addon1"
          value={telefoneddd}
          onChange={handleDDDChange}
        />
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
          placeholder="Numero do telefone"
          aria-label="Nome do pet"
          aria-describedby="basic-addon1"
          value={telefonenumero}
          onChange={handleNumeroChange}
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "140px", left: "390px" }}
      >
        <button
          type="button"
          className="btn btn-danger"
          style={{ width: "100px" }}
          onClick={handleExcluirTelefone}
        >
          Excluir
        </button>
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "100px", left: "10px" }}
          onClick={() => {
            handleEditarTelefone();
            buscarTelefonePorCPF();
          }}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
