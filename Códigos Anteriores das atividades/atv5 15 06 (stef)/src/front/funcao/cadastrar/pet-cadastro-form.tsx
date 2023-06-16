import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface FormValues {
  clientecpf: string;
  petnome: string;
  petraca: string;
  pettipo: string;
  petgenero: string;
}

export default function PetCadastroForm() {


  const [values, setValues] = useState<FormValues>({ clientecpf: "", petnome: "",petraca: "",pettipo: "",petgenero: ""});

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const limparCampos = () => {
    setValues({ clientecpf: "", petnome: "",petraca: "",pettipo: "",petgenero: ""});
  };


  const handleClickButton = async () => {
    const response = await axios.post("http://localhost:3001/cadastrarPetPorCPF", {
      clienteCPF: values.clientecpf,
      nomePet: values.petnome,
      tipoPet: values.pettipo,
      petRaca: values.petraca,
      petGenero: values.petgenero
      }).then((response)=>{
          if(response.data.message === 'Pet cadastrado com sucesso'){
            Swal.fire("Sucesso!", response.data.message, "success");
            limparCampos()
          }
          if(response.data.error === 'Erro ao cadastrar o produto')
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: response.data.error,
          });
      })
  }
  return (
    <div>
      <Navbar />
        
      <div>
        <h2
          className="position-absolute top-20 end-60  mt-4"
          style={{ marginLeft: "150px" }}
        >
          Cadastro de Pet
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
          id="clientecpf"
          name="clientecpf"
          value={values.clientecpf}
          onChange={handleChangeValues}
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
          placeholder="Nome do pet"
          aria-label="Username"
          aria-describedby="basic-addon1"
          id="petnome"
          name="petnome"
          value={values.petnome}
          onChange={handleChangeValues}
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
          aria-label="Username"
          aria-describedby="basic-addon1"
          id="petraca"
          name="petraca"
          value={values.petraca}
          onChange={handleChangeValues}
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
          aria-label="Username"
          aria-describedby="basic-addon1"
          id="petgenero"
          name="petgenero"
          value={values.petgenero}
          onChange={handleChangeValues}
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
          aria-label="Username"
          aria-describedby="basic-addon1"
          id="pettipo"
          name="pettipo"
          value={values.pettipo}
          onChange={handleChangeValues}
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "140px", left: "500px" }}
      >
      <button type="button" className="btn btn-info" style={{width: "100px"}} onClick={() => handleClickButton()}>Cadastrar</button></div>
    </div>
  );
}
