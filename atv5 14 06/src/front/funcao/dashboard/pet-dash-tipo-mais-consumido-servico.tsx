import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";


interface ServicoMaisConsumidoPorTipo {
  pettipo: String;
  serviconome: string;
  quantidade: string;
}

function ServicoMaisConsumidoPorTipoDashTabela() {

  const [ServicoMaisConsumidoPorTipo, setServicoMaisConsumidoPorTipo] = useState<ServicoMaisConsumidoPorTipo[]>([]);

  useEffect(() => {
    listarProdutosMaisConsumidos();
  }, []);

  const listarProdutosMaisConsumidos = () => {
    axios.get("http://localhost:3001/servicosMaisConsumidosPorTipoPet")
      .then((response) => {
        setServicoMaisConsumidoPorTipo(response.data);
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
            Listagem dos servicos mais consumidos por tipo de pet
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
              <th scope="col">Tipo do pet</th>
              <th scope="col">Serviço</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {ServicoMaisConsumidoPorTipo.map((ServicoMaisConsumidoPorTipo) => (
              <tr>
                <td>{ServicoMaisConsumidoPorTipo.pettipo}</td>
                <td>{ServicoMaisConsumidoPorTipo.serviconome}</td>
                <td>{ServicoMaisConsumidoPorTipo.quantidade}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    );
  }

export default ServicoMaisConsumidoPorTipoDashTabela;