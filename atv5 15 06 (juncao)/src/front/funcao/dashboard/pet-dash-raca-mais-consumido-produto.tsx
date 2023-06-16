import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProdutoMaisConsumidoPorRaca {
  petraca: String;
  produtonome: string;
  quantidade: string;
}

function ProdutoMaisConsumidoPorRacaDashTabela() {

  const [ProdutoMaisConsumidoPorRaca, setProdutoMaisConsumidoPorRaca] = useState<ProdutoMaisConsumidoPorRaca[]>([]);

  useEffect(() => {
    listarProdutosMaisConsumidos();
  }, []);

  const listarProdutosMaisConsumidos = () => {
    axios.get("http://localhost:3001/produtosMaisConsumidosPorRacaPet")
      .then((response) => {
        setProdutoMaisConsumidoPorRaca(response.data);
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
            Listagem dos produtos mais consumidos por reça de pet
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
              <th scope="col">Produto</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {ProdutoMaisConsumidoPorRaca.map((ProdutoMaisConsumidoPorRaca) => (
              <tr>
                <td>{ProdutoMaisConsumidoPorRaca.petraca}</td>
                <td>{ProdutoMaisConsumidoPorRaca.produtonome}</td>
                <td>{ProdutoMaisConsumidoPorRaca.quantidade}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    );
  }

export default ProdutoMaisConsumidoPorRacaDashTabela;
