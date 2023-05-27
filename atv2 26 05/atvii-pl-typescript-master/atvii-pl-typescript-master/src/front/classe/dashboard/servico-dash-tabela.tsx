import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Component } from "react";

export default class ServicoDashTabela extends Component {
  render(){
  return (
    <div>
      <Navbar />

    
        <div>
          <h2
            className="position-absolute top-20 start-40  mt-4"
            style={{ marginLeft: "600px" }}
          >
            Listagem de Serviços
          </h2>
        </div>
        <div style={{marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px"}}>
          <table className="table table-hover table-bordered mt-5">
            <thead>
              <tr>
                <th scope="col">Posição</th>
                <th scope="col">Nome</th>
                <th scope="col">Valor</th>
                <th scope="col">Quantidade Consumida</th>
                <th scope="col">Perfil</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th scope="row">1</th>
                <td>Serviço 1</td>
                <td>R$30,00</td>
                <td>12</td>
                <td>Visualizar 🔎</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Serviço 2</td>
                <td>R$20,00</td>
                <td>34</td>
                <td>Visualizar 🔎</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Serviço 3</td>
                <td>R$127,00</td>
                <td>15</td>
                <td>Visualizar 🔎</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
}