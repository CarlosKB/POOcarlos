import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Component } from "react";

export default class ServicoMaisConsumidoPorRacaDashTabela extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div>
          <h2
            className="position-absolute top-20 start-40  mt-4"
            style={{ marginLeft: "350px" }}
          >
            Listagem dos servicos mais consumidos por raça de pet
          </h2>
        </div>
        <div
          style={{
            marginTop: "100px",
            width: "1000px",
            marginLeft: "250px",
            borderRadius: "50px",
          }}
        >
          <table className="table table-hover table-bordered mt-5 border border-primary-subtle rounded-2">
            <thead>
              <tr>
                <th scope="col">Posição</th>
                <th scope="col">Raca</th>
                <th scope="col">Serviço</th>
                <th scope="col">Quantidade</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th scope="row">1</th>
                <td>Cliente 1</td>
                <td>a</td>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Cliente 3</td>
                <td>b</td>
                <td>2</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Cliente 3</td>
                <td>c</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
