import React, { Component } from "react";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default class TelefoneCadastroForm extends Component {
  render(){
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
        />
      </div>
     
      <div className="input-group mb-3" style={{left: "50px", top: "100px", width: "260px"}}>
              <input
                type="text"
                className="form-control"
                placeholder="DDD"
                aria-label="Username"
                style={{width: "59px"}}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Telefone"
                aria-label="Server"
                style={{width: "200px"}}
              />
            </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "140px", left: "500px" }}
      >
      <button type="button" className="btn btn-info" style={{width: "100px"}}>Cadastrar</button></div>
    </div>
  );
  }
}
