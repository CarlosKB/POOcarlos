import React, { Component } from "react";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default class ConsumirProduto extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <div>
          <h2
            className="position-absolute top-20 end-60  mt-4"
            style={{ marginLeft: "150px" }}
          >
            Consumir produto
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
          />
        </div>
        <div className="input-group mb-3">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ top: "70px", left: "48px" }}
          >
            Selecione um pet
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                pet a
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                pet b
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                pet c
              </a>
            </li>
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
              <tr>
                <th scope="row">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                </th>
                <td>Produto 1</td>
                <td>R$30,00</td>
              </tr>
              <tr>
                <th scope="row">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                </th>
                <td>Produto 2</td>
                <td>R$20,00</td>
              </tr>
              <tr>
                <th scope="row">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                </th>
                <td>Produto 3</td>
                <td>R$127,00</td>
              </tr>
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
          >
            Cadastrar
          </button>
        </div>
      </div>
    );
  }
}
