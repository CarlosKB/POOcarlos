import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";
import {useEffect} from 'react';

export default function PetFormEdicao() {
  //listar pet no combobox por cpf do cliente
  interface Pet {
    petid: string;
    petnome: string;
    petraca: string;
    pettipo: string;
    petgenero: string;
  }
  const [atualizarCombobox, setAtualizarCombobox] = useState(false);
  const [cpf, setCpf] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [petSelecionado, setPetSelecionado] = useState<{
    petid: string;
    petnome: string;
    petraca: string;
    pettipo: string;
    petgenero: string;
  } | null>(null);

  const buscarPetsPorCPF = () => {
    setPetSelecionado(null); // Limpa o pet selecionado ao buscar por CPF
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

  const selecionarPet = (pet: {
    petid: string;
    petnome: string;
    petraca: string;
    pettipo: string;
    petgenero: string;
  } | null) => {
    setPetSelecionado(pet);
    if (pet) {
      setIdPet(pet.petid);
    } else {
      setIdPet("");
    }
  };
  console.log(petSelecionado);
  const [idPet, setIdPet] = useState("")
  const [nomePet, setNomePet] = useState("");
  const [racaPet, setRacaPet] = useState("");
  const [generoPet, setGeneroPet] = useState("");
  const [tipoPet, setTipoPet] = useState("");
  
  const handleNomePetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomePet(e.target.value);
  };

  const handleRacaPetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRacaPet(e.target.value);
  };

  const handleGeneroPetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneroPet(e.target.value);
  };

  const handleTipoPetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipoPet(e.target.value);
  };
  
    
  
  const handleEditarPet = () => {
    // Lógica para enviar a requisição de atualização para o backend
    // Você pode usar uma biblioteca como o axios para fazer a requisição HTTP

    const petData = {
      idPet: petSelecionado ? petSelecionado.petid : '',
      nomePet,
      racaPet,
      generoPet,
      tipoPet,
    };
    console.log(petData);
    
    // Exemplo de como fazer uma requisição PUT com o axios
    axios
      .put(`http://localhost:3001/atualizarPet/${idPet}`, petData)
      .then((response) => {
        // Lógica para manipular a resposta de sucesso
        // Definir o estado para atualizar a combobox
        setPetSelecionado((prevState) => {
          if (prevState) {
            return { ...prevState, petnome: nomePet };
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
      buscarPetsPorCPF();
      setAtualizarCombobox(false);
    }
  }, [atualizarCombobox]);

  const handleExcluirPet = () => {
    
    console.log(idPet, cpf);
      axios
        .delete(`http://localhost:3001/excluirPet/${idPet}/${cpf}`)
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
          Edição de Pet
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
          style={{ width: "200px", marginLeft: "350px" }}
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
        className="input-group position-relative ms-5 mt-5"
        style={{ width: "600px", top: "30px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Nome do pet"
          aria-label="Nome do pet"
          aria-describedby="basic-addon1"
          value={nomePet}
          onChange={handleNomePetChange}
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "60px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Raça do pet"
          aria-label="Raça do pet"
          aria-describedby="basic-addon1"
          value={racaPet}
          onChange={handleRacaPetChange}
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "90px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Gênero do pet"
          aria-label="Gênero do pet"
          aria-describedby="basic-addon1"
          value={generoPet}
          onChange={handleGeneroPetChange}
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "120px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Tipo do pet"
          aria-label="Tipo do pet"
          aria-describedby="basic-addon1"
          value={tipoPet}
          onChange={handleTipoPetChange}
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
          onClick={handleExcluirPet}
        >
          Excluir
        </button>
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "100px", left: "10px" }}
          onClick={() => {
            handleEditarPet();
            buscarPetsPorCPF();
          }}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
