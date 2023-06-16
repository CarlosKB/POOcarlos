

import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TelefoneCadastroForm from './telefone-cadastro-form';

interface FormValues {
  nome: string;
  nomesocial: string;
  cpf: string;
  cpfdataemissao: string;
  datacadastro: string;
  petnome: string;
  petraca: string;
  pettipo: string;
  petgenero: string;
  telefoneddd: string;
  telefonenumero: string;

}

export default function ClienteFormCadastro() {


  const [values, setValues] = useState<FormValues>({ nome: "", nomesocial: "", cpf: "", cpfdataemissao: "", datacadastro: "", petnome: "", petraca: "", pettipo: "", petgenero: "", telefoneddd: "", telefonenumero: "" });

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const limparCampos = () => {
    setValues({ nome: "", nomesocial: "", cpf: "", cpfdataemissao: "", datacadastro: "", petnome: "", petraca: "", pettipo: "", petgenero: "", telefoneddd: "", telefonenumero: "" });
  };

  const validarCPF = (cpf: string) => {
    const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/;
    return cpfRegex.test(cpf);
  };

  const handleClickButton = async () => {
    if (validarCPF(values.cpf)) {
      const response = await axios.post("http://localhost:3001/cadastroCliente", {
        ClienteNomeSocial: values.nomesocial,
        ClienteNome: values.nome,
        ClienteCPF: values.cpf,
        ClienteCPFDataEmissao: values.cpfdataemissao,
        ClienteDataCadastro: values.datacadastro,
        PetNome: values.petnome,
        PetRaca: values.petraca,
        PetTipo: values.pettipo,
        PetGenero: values.petgenero,
        TelefoneDDD: values.telefoneddd,
        TelefoneNumero: values.telefonenumero,

      }).then((response) => {
        if (response.data.msg === 'Cliente, pet e telefone cadastrados com sucesso.') {
          Swal.fire("Sucesso!", response.data.msg, "success");
          limparCampos()
        }
        if (response.data.error === 'Erro ao cadastrar o produto')
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: response.data.error,
          });
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: 'CPF inválido.',
      });
    }
  }
  return (
    <div>
      <Navbar />

      <div>
        <h2
          className="position-absolute top-20 end-60  mt-4"
          style={{ marginLeft: "150px" }}
        >
          Cadastro de Cliente
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
          placeholder="Nome"
          aria-label="Username"
          aria-describedby="basic-addon1"
          id="nome"
          name="nome"
          value={values.nome}
          onChange={handleChangeValues}
        />
      </div>

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
          id="nomesocial"
          name="nomesocial"
          value={values.nomesocial}
          onChange={handleChangeValues}
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
          placeholder="CPF"
          aria-label="Username"
          aria-describedby="basic-addon1"
          id="cpf"
          name="cpf"
          value={values.cpf}
          onChange={handleChangeValues}
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
          placeholder="data de emissão do CPF"
          aria-label="Username"
          aria-describedby="basic-addon1"
          id="cpfdataemissao"
          name="cpfdataemissao"
          value={values.cpfdataemissao}
          onChange={handleChangeValues}
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "230px" }}
      >
        <p>
          <a
            className="btn btn-primary"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            + Adicionar um telefone
          </a>
        </p>
        <div className="collapse" id="collapseExample">
          <br />
          <br />
          <div className="input-group mb-3" style={{ left: "-197px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="DDD"
              aria-label="Username"
              style={{ width: "59px" }}
              id="telefoneddd"
              name="telefoneddd"
              value={values.telefoneddd}
              onChange={handleChangeValues}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Telefone"
              aria-label="Server"
              style={{ width: "200px" }}
              id="telefonenumero"
              name="telefonenumero"
              value={values.telefonenumero}
              onChange={handleChangeValues}
            />
          </div>
        </div>
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "240px" }}
      >
        <p>
          <a
            className="btn btn-primary"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            + Adicionar um pet
          </a>
        </p>
        <div className="collapse" id="collapseExample">
          <div className="input-group" style={{ width: "600px" }}>
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
            className="input-group"
            style={{ width: "600px", top: "10px" }}
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
            className="input-group"
            style={{ width: "600px", top: "20px" }}
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
            className="input-group"
            style={{ width: "600px", top: "30px" }}
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
            style={{
              width: "600px",
              top: "50px",
              left: "450px",
              bottom: "20px",
            }}
          >
          </div>
        </div>
        <div
          className="input-group position-relative ms-5"
          style={{ width: "600px", bottom: "20px", left: "650px" }}
        >
          <button
            type="button"
            className="btn btn-info"
            style={{ width: "100px" }} onClick={() => handleClickButton()}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
