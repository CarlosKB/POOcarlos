import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProdutoMaisConsumido {
  produtonome: string;
  quantidade: string;
}

function ProdutosMaisConsumidosDashTabela() {
  const [ProdutoMaisConsumido, setProdutoMC] = useState<ProdutoMaisConsumido[]>([]);

  useEffect(() => {
    listarProdutosMaisConsumidos();
  }, []);

  const listarProdutosMaisConsumidos = () => {
    axios
      .get("http://localhost:3001/produtosMaisConsumidos")
      .then((response) => {
        setProdutoMC(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="position-absolute top-20 start-40  mt-4" style={{ marginLeft: "550px" }}>
          Produtos mais consumidos
        </h2>
      </div>
      <div style={{ marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px" }}>
        <table className="table table-hover table-bordered mt-5 border border-primary-subtle rounded-2">
          <thead>
            <tr>
              <th scope="col">Nome do produto</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {ProdutoMaisConsumido.map((ProdutoMaisConsumido) => (
              <tr>
                <td>{ProdutoMaisConsumido.produtonome}</td>
                <td>{ProdutoMaisConsumido.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProdutosMaisConsumidosDashTabela;
