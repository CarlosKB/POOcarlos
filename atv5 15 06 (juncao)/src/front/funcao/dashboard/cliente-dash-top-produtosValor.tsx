import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";


interface ClienteMaisConsumiramProdutosValor {
  clienteID: String;
  clientenomesocial: string;
  total_valor_produtos_consumidos: string;
}

function ClienteTopProdutosDashTabelaValor() {

  const [ClienteMaisConsumiramProdutosValor, setClienteMaisConsumiuProdutos] = useState<ClienteMaisConsumiramProdutosValor[]>([]);

  useEffect(() => {
    listarProdutosMaisConsumidos();
  }, []);

  const listarProdutosMaisConsumidos = () => {
    axios.get("http://localhost:3001/clientesMaisConsumiramProdutosValor")
      .then((response) => {
        setClienteMaisConsumiuProdutos(response.data);
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
            10 clientes que mais consumiram produtos em valor
          </h2>
        </div>
        <div style={{marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px"}}>
          <table className="table table-hover table-bordered mt-5 border border-primary-subtle rounded-2">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Valor dos produtos</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {ClienteMaisConsumiramProdutosValor.map((ClienteMaisConsumiramProdutosValor) => (
              <tr>
                <td>{ClienteMaisConsumiramProdutosValor.clientenomesocial}</td>
                <td>{ClienteMaisConsumiramProdutosValor.total_valor_produtos_consumidos}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    
  );
}

export default ClienteTopProdutosDashTabelaValor;