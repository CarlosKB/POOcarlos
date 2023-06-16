import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface FormValues {
  cpf: string;
  rgnumero: string;
  rgdataemissao: string;
}

export default function RgCadastroForm() {
  const [values, setValues] = useState<FormValues>({
    cpf: "",
    rgnumero: "",
    rgdataemissao: "",
  });
  console.log(values);
  
  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const limparCampos = () => {
    setValues({ cpf: "", rgnumero: "", rgdataemissao: "" });
  };

  const handleClickButton = async () => {
    const response = await axios
      .post("http://localhost:3001/cadastrarRG", {
        rgdataemissao: values.rgdataemissao,
        rgnumero: values.rgnumero,
        clienteCPF: values.cpf,
      })
      .then((response) => {
        if (response.data.message === "RG cadastrado com sucesso") {
          Swal.fire("Sucesso!", response.data.message, "success");
          limparCampos();
        }
        if (response.data.error === "Erro ao cadastrar RG")
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: response.data.error,
          });
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
          Cadastrar RG
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
          id="cpf"
          name="cpf"
          value={values.cpf}
          onChange={handleChangeValues}
        />
      </div>

      <div className="input-group mb-3" style={{ left: "50px", top: "100px", width: "400px" }}>
  <input
    type="text"
    className="form-control"
    placeholder="Número de RG"
    aria-label="Número de RG"
    style={{ width: "200px" }}
    id="rgnumero"
    name="rgnumero"
    value={values.rgnumero}
    onChange={handleChangeValues}
  />
  <input
    type="text"
    className="form-control"
    placeholder="Data de Emissão"
    aria-label="Data de Emissão"
    style={{ width: "200px" }}
    id="rgdataemissao"
    name="rgdataemissao"
    value={values.rgdataemissao}
    onChange={handleChangeValues}
  />
</div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "140px", left: "500px" }}
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
  );
}
