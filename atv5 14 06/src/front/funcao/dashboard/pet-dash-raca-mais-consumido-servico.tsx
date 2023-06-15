import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";


interface ServicoMaisConsumidoPorRaca {
  petraca: String;
  serviconome: string;
  quantidade: string;
}

function ServicoMaisConsumidoPorRacaDashTabela() {

  const [ServicoMaisConsumidoPorRaca, setServicoMaisConsumidoPorRaca] = useState<ServicoMaisConsumidoPorRaca[]>([]);

  useEffect(() => {
    listarProdutosMaisConsumidos();
  }, []);

  const listarProdutosMaisConsumidos = () => {
    axios.get("http://localhost:3001/servicosMaisConsumidosPorRacaPet")
      .then((response) => {
        setServicoMaisConsumidoPorRaca(response.data);
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
              <th scope="col">Raça do pet</th>
              <th scope="col">Serviço</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {ServicoMaisConsumidoPorRaca.map((ServicoMaisConsumidoPorRaca) => (
              <tr>
                <td>{ServicoMaisConsumidoPorRaca.petraca}</td>
                <td>{ServicoMaisConsumidoPorRaca.serviconome}</td>
                <td>{ServicoMaisConsumidoPorRaca.quantidade}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    );
  }

  export default ServicoMaisConsumidoPorRacaDashTabela;