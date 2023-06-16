import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Component } from "react";
import axios from "axios";
import { useEffect, useState } from "react";


interface ClienteMaisConsumiramServico {
  clienteID: String;
  clientenomesocial: string;
  total_servicos_consumidos: string;
}
function ClienteTopServicosDashTabela() {
  
  const [ClienteMaisConsumiramServico, setClienteMaisConsumiuServicos] = useState<ClienteMaisConsumiramServico[]>([]);

  useEffect(() => {
    listarProdutosMaisConsumidos();
  }, []);

  const listarProdutosMaisConsumidos = () => {
    axios.get("http://localhost:3001/clientesMaisConsumiramServicosQTD")
      .then((response) => {
        setClienteMaisConsumiuServicos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
        <div>
          <h2
            className="position-absolute top-20 start-40  mt-4"
            style={{ marginLeft: "500px" }}
          >
            10 clientes que mais consumiram servicos
          </h2>
        </div>
        <div style={{marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px"}}>
          <table className="table table-hover table-bordered mt-5 border border-primary-subtle rounded-2">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Quantidade de servico</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {ClienteMaisConsumiramServico.map((ClienteMaisConsumiramServico) => (
              <tr>
                <td>{ClienteMaisConsumiramServico.clientenomesocial}</td>
                <td>{ClienteMaisConsumiramServico.total_servicos_consumidos}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    
  );
}

export default ClienteTopServicosDashTabela;