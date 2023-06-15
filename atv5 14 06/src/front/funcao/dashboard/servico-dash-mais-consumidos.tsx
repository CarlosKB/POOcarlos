import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";


interface ServicoMaisConsumido {
  serviconome: string;
  quantidade: string;
}

function ServicosMaisConsumidosDashTabela() {

  const [ServicoMaisConsumido, setServicoMC] = useState<ServicoMaisConsumido[]>([]);

  useEffect(() => {
    listarProdutosMaisConsumidos();
  }, []);

  const listarProdutosMaisConsumidos = () => {
    axios.get("http://localhost:3001/listarServicosMaisConsumidos")
      .then((response) => {
        setServicoMC(response.data);
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
              style={{ marginLeft: "550px" }}
            >
              Serviços mais consumidos
            </h2>
          </div>
          <div style={{marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px"}}>
            <table className="table table-hover table-bordered mt-5 border border-primary-subtle rounded-2">
            <thead>
            <tr>
              <th scope="col">Nome do produto</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {ServicoMaisConsumido.map((ServicoMaisConsumido) => (
              <tr>
                <td>{ServicoMaisConsumido.serviconome}</td>
                <td>{ServicoMaisConsumido.quantidade}</td>
              </tr>
            ))}
          </tbody>
            </table>
          </div>
        </div>
      
    );
}

export default ServicosMaisConsumidosDashTabela;