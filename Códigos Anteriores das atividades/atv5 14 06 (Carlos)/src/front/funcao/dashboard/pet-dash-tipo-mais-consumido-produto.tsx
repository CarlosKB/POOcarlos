import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProdutoMaisConsumidoPorTipo {
  pettipo: String;
  produtonome: string;
  quantidade: string;
}

function ProdutoMaisConsumidoPorTipoDashTabela() {

  const [ProdutoMaisConsumidoPorTipo, setProdutoMaisConsumidoPorRaca] = useState<ProdutoMaisConsumidoPorTipo[]>([]);

  useEffect(() => {
    listarProdutosMaisConsumidos();
  }, []);

  const listarProdutosMaisConsumidos = () => {
    axios.get("http://localhost:3001/produtosMaisConsumidosPorTipoPet")
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
              <th scope="col">Tipo de pet</th>
              <th scope="col">Produto</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {ProdutoMaisConsumidoPorTipo.map((ProdutoMaisConsumidoPorTipo) => (
              <tr>
                <td>{ProdutoMaisConsumidoPorTipo.pettipo}</td>
                <td>{ProdutoMaisConsumidoPorTipo.produtonome}</td>
                <td>{ProdutoMaisConsumidoPorTipo.quantidade}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    );
  }

export default ProdutoMaisConsumidoPorTipoDashTabela;
