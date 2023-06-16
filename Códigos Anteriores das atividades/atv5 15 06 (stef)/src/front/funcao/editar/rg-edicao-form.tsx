import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";
import {useEffect} from 'react';

export default function RGFormEdicao() {
  //listar pet no combobox por cpf do cliente
  interface RG {
    clientergid: string;
    rgnumero: string;
    redataemissao: string;
  }
  const [atualizarCombobox, setAtualizarCombobox] = useState(false);
  const [cpf, setCpf] = useState("");
  const [rgs, setRGs] = useState<RG[]>([]);
  const [rgSelecionado, setRGSelecionado] = useState<{
    clientergid: string;
    rgnumero: string;
    redataemissao: string;
  } | null>(null);

  const buscarRGPorCPF = () => {
    setRGSelecionado(null); // Limpa o pet selecionado ao buscar por CPF
  if (cpf) {
    axios
      .get(`http://localhost:3001/listarRGsPorCPF?cpf=${cpf}`)
      .then((response) => {
        if (response.data.length > 0) {
          setRGs(response.data);
        } else {
          setRGs([]);
          setRGSelecionado(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setRGs([]);
        setRGSelecionado(null);
      });
  }
  };

  const selecionarRG = (rg: RG | null) => {
    if (rg) {
      setRGid(rg.clientergid);
    } else {
      setRGid("");
    }
    setRGSelecionado(rg);
  };

  const [clientergid, setRGid] = useState("")
  const [rgnumero, setRGnumero] = useState("");
  const [rgdataemissao, serRGdataemissao] = useState("");
    console.log(rgSelecionado?.clientergid);
  const handleRGnumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRGnumero(e.target.value);
  };

  const handleRGdataEmissaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    serRGdataemissao(e.target.value);
  };


  const handleEditarRG = () => {
    if (rgSelecionado) {
      setRGid(rgSelecionado.clientergid);
    }
    const RGData = {
      clientergid,
      rgnumero,
      rgdataemissao,
    };
    console.log(RGData);
    
    // Exemplo de como fazer uma requisição PUT com o axios
    axios
      .put(`http://localhost:3001/atualizarRG/${clientergid}`, RGData)
      .then((response) => {
        // Lógica para manipular a resposta de sucesso
        // Definir o estado para atualizar a combobox
        setRGSelecionado((prevState) => {
          if (prevState) {
            return { ...prevState, rgnumero: rgnumero };
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
      buscarRGPorCPF();
      setAtualizarCombobox(false);
    }
  }, [atualizarCombobox]);

  const handleExcluirRG = () => {
    
    console.log(clientergid, cpf);
      axios
        .delete(`http://localhost:3001/excluirRG/${clientergid}/${cpf}`)
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
          Edição de RG
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
          onClick={buscarRGPorCPF}
        >
          Buscar RG
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
          {rgSelecionado ? rgSelecionado.rgnumero : "Selecione um RG"}
        </button>
        <ul className="dropdown-menu">
          {rgs.length === 0 ? (
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => selecionarRG(null)}
              >
                Nenhum
              </a>
            </li>
          ) : (
            rgs.map((rg) => (
              <li key={rg.clientergid}>
                <a
                  id="combobox-pet"
                  className="dropdown-item"
                  href="#"
                  onClick={() => selecionarRG(rg)}
                >
                  {rg.rgnumero}
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
          placeholder="Número de RG"
          aria-label="Nome do pet"
          aria-describedby="basic-addon1"
          value={rgnumero}
          onChange={handleRGnumeroChange}
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
          placeholder="Data de emissão"
          aria-label="Nome do pet"
          aria-describedby="basic-addon1"
          value={rgdataemissao}
          onChange={handleRGdataEmissaoChange}
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
          onClick={handleExcluirRG}
        >
          Excluir
        </button>
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "100px", left: "10px" }}
          onClick={() => {
            handleEditarRG();
            buscarRGPorCPF();
          }}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
