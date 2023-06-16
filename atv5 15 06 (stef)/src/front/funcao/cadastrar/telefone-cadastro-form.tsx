import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface FormValues {
  cpf: string;
  ddd: string;
  telefone: string;
}

export default function TelefoneCadastroForm() {
  const [values, setValues] = useState<FormValues>({
    cpf: "",
    ddd: "",
    telefone: "",
  });

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const limparCampos = () => {
    setValues({ cpf: "", ddd: "", telefone: "" });
  };

  const handleClickButton = async () => {
    const response = await axios
      .post("http://localhost:3001/cadastrarTelefone", {
        ddd: values.ddd,
        numero: values.telefone,
        clienteCPF: values.cpf,
      })
      .then((response) => {
        if (response.data.message === "Telefone cadastrado com sucesso") {
          Swal.fire("Sucesso!", response.data.message, "success");
          limparCampos();
        }
        if (response.data.error === "Erro ao cadastrar telefone")
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
          Cadastrar Telefone
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

      <div
        className="input-group mb-3"
        style={{ left: "50px", top: "100px", width: "260px" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="DDD"
          aria-label="Username"
          style={{ width: "59px" }}
          id="ddd"
          name="ddd"
          value={values.ddd}
          onChange={handleChangeValues}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Telefone"
          aria-label="Server"
          style={{ width: "200px" }}
          id="telefone"
          name="telefone"
          value={values.telefone}
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
