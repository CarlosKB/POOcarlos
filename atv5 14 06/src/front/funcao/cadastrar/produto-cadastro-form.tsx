import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface FormValues {
  nome: string;
  preco: number;
}

export default function ProdutoFormCadastro() {


  const [values, setValues] = useState<FormValues>({ nome: "", preco: 0 });

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const limparCampos = () => {
    setValues({ nome: "", preco: 0 });
  };


  const handleClickButton = async () => {
    const response = await axios.post("http://localhost:3001/cadastrarProduto", {
        nomeProduto: values.nome,
        precoProduto: values.preco
      }).then((response)=>{
          if(response.data.message === 'Produto cadastrado com sucesso'){
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
          Cadastro de Produto
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
          placeholder="Nome do produto"
          aria-label="CPF do responsavel"
          aria-describedby="basic-addon1"
          id="nome"
          name="nome"
          value={values.nome}
          onChange={handleChangeValues}
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
          placeholder="Valor do produto"
          aria-label="Username"
          aria-describedby="basic-addon1"
          id="preco"
          name="preco"
          value={values.preco}
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
          placeholder="Quantidade consumida"
          aria-label="Username"
          aria-describedby="basic-addon1"
          disabled
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "90px", left: "500px" }}
      >
      <button type="button" className="btn btn-info" style={{width: "100px"}} onClick={() => handleClickButton()}>Cadastrar</button></div>
    </div>
  );
}
