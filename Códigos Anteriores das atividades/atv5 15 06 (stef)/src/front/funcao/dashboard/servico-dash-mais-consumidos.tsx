import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Component } from "react";

export default class ServicosMaisConsumidosDashTabela extends Component {
  render(){
    return (
      <div>
        <Navbar />
          <div>
            <h2
              className="position-absolute top-20 start-40  mt-4"
              style={{ marginLeft: "550px" }}
            >
              Serviços mais consumidos
            </h2>
          </div>
          <div style={{marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px"}}>
            <table className="table table-hover table-bordered mt-5 border border-primary-subtle rounded-2">
              <thead>
                <tr>
                  <th scope="col">Posição</th>
                  <th scope="col">Serviço</th>
                  <th scope="col">Quantidade</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <tr>
                  <th scope="row">1</th>
                  <td>Servico 1</td>
                  <td>3</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Servico 2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Servico 3</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      
    );
  }
}