import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Component, useEffect, useState } from "react";

export default class RGListarTabela extends Component {
  render(){
  return (
    <div>
      <Navbar />
      <div>
        <h2
          className="position-absolute top-20 start-40  mt-4"
          style={{ marginLeft: "600px" }}
        >
          Listagem de RGs
        </h2>
      </div>
      <div
        style={{
          marginTop: "100px",
          width: "1000px",
          marginLeft: "250px",
          borderRadius: "50px"
        }}
      >
        <table className="table table-hover table-bordered mt-5">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Número de RG</th>
              <th scope="col">Data de Emissão</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
}