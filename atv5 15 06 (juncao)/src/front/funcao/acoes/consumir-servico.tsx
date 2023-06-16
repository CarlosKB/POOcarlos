import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../componentes/navbar";
import { log } from "console";
import Swal from "sweetalert2";

export default function ConsumirServico() {
  //listar pet no combobox por cpf do cliente
  interface Pet {
    petid: string;
    petnome: string;
  }
  const [cpf, setCpf] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [petSelecionado, setPetSelecionado] = useState<{
    petid: string;
    petnome: string;
  } | null>(null);

  const buscarPetsPorCPF = () => {
    if (cpf) {
      axios
        .get(`http://localhost:3001/listarPetsPorCPF?cpf=${cpf}`)
        .then((response) => {
          if (response.data.length > 0) {
            setPets(response.data);
          } else {
            setPets([]);
            setPetSelecionado(null);
          }
        })
        .catch((error) => {
          console.error(error);
          setPets([]);
          setPetSelecionado(null);
        });
    }
  };

  const selecionarPet = (pet: { petid: string; petnome: string } | null) => {
    setPetSelecionado(pet);
  };
  // listar servico na tabela
  interface Servico {
    servicoid: string;
    serviconome: string;
    servicopreco: string;
  }
  const [servico, setServico] =  useState<Servico[]>([]);

  useEffect(() => {
    listarServico();
  }, []);

  const listarServico = () => {
    axios
      .get("http://localhost:3001/listarServicos")
      .then((response) => {
        setServico(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [servicoSelecionados, setServicoSelecionados] = useState<string[]>([]);

  const handleCheckboxChange = (serviconome: string) => {
    const isSelected = servicoSelecionados.includes(serviconome);

    if (isSelected) {
      setServicoSelecionados(servicoSelecionados.filter((id) => id !== serviconome));
    } else {
      setServicoSelecionados([...servicoSelecionados, serviconome]);
    }
  };
  
  //info pra enviar pro backend
  const petnome = petSelecionado?.petnome;
  const petid = petSelecionado?.petid;
  const serviconome = servicoSelecionados[0]
  const clientecpf = cpf

  console.log(petnome, clientecpf, serviconome);

  // consumir produto
  const consumirServico = () => {
    if (petSelecionado && servicoSelecionados.length > 0) {
      const petnome = petSelecionado.petnome;
      const serviconome = servicoSelecionados[0];
  
      axios
        .post("http://localhost:3001/consumirServico", {
          clienteCpf: cpf,
          nomeServico: serviconome,
          nomePet: petnome,
        }).then((response)=>{
          if(response.data.message === 'Serviço consumido com sucesso'){
            Swal.fire("Sucesso!", response.data.message, "success");
            
          }
          if(response.data.error === 'Erro ao consumir serviço')
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: response.data.error,
          });
      })
    }
  };
  
  return (
    <div>
      <Navbar />

      <div>
        <h2
          className="position-absolute top-20 end-60  mt-4"
          style={{ marginLeft: "150px" }}
        >
          Consumir serviço
        </h2>
      </div>
      <div
        className="input-group position-relative ms-5 mt-5"
        style={{ width: "400px", top: "50px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="CPF do responsável"
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
          style={{ width: "100px", marginLeft: "130px" }}
          onClick={buscarPetsPorCPF}
        >
          Buscar pet
        </button>
      </div>
      <div className="input-group mb-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ top: "70px", left: "48px" }}
        >
          {petSelecionado ? petSelecionado.petnome : "Selecione um pet"}
        </button>
        <ul className="dropdown-menu">
          {pets.length === 0 ? (
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => selecionarPet(null)}
              >
                Nenhum
              </a>
            </li>
          ) : (
            pets.map((pet) => (
              <li key={pet.petid}>
                <a
                  id="combobox-pet"
                  className="dropdown-item"
                  href="#"
                  onClick={() => selecionarPet(pet)}
                >
                  {pet.petnome}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
      <div
        style={{
          marginTop: "100px",
          width: "400px",
          marginLeft: "47px",
          borderRadius: "50px",
        }}
      >
      <table className="table table-hover table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col" style={{ width: "30px" }}>
              Selecionar
            </th>
            <th scope="col" style={{ width: "180px" }}>
              Nome
            </th>
            <th scope="col" style={{ width: "70px" }}>
              Valor
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {servico.map((produto) => (
            <tr key={produto.servicoid}>
              <th scope="row">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  value={produto.serviconome}
                  aria-label="Checkbox for following text input"
                  onChange={() => handleCheckboxChange(produto.serviconome)}
                  checked={servicoSelecionados.includes(produto.serviconome)}
                />
              </th>
              <td>{produto.serviconome}</td>
              <td>{produto.servicopreco}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "10px", left: "300px" }}
      >
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "100px" }}
          onClick={() =>consumirServico()}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}
