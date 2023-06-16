import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";

interface ProdutoMaisConsumidoCPF {
  clientenome: string;
  produtonome: string;
  quantidade: string;
  clientecpf: string;
}

function ProdutosMaisConsumidosPorCPF() {
  const [produtoMaisConsumidoCPF, setProdutoMaisConsumidoCPF] = useState<ProdutoMaisConsumidoCPF[]>([]);
  const [values, setValues] = useState<ProdutoMaisConsumidoCPF>({clientecpf:"", clientenome:"",produtonome:"",quantidade:"" });

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const listarProdutosMaisConsumidos = () => {
    axios
      .post("http://localhost:3001/produtosMaisConsumidosPorCPF", { clienteCPF: values.clientecpf })
      .then((response) => {
        setProdutoMaisConsumidoCPF(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="position-absolute top-20 start-40 mt-4" style={{ marginLeft: "550px" }}>
          Produtos mais consumidos por cliente
        </h2>
      </div>
      <div className="input-group position-relative ms-5 mt-5" style={{ width: "600px", top: "50px" }}>
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="CPF do responsável"
          aria-label="CPF do responsavel"
          aria-describedby="basic-addon1"
          id="clientecpf"
          name="clientecpf"
          value={values.clientecpf}
          onChange={handleChangeValues}
        />
      </div>
      <div className="input-group position-relative ms-5" style={{ width: "600px", top: "10px", left: "300px" }}>
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "200px", marginLeft: "350px" }}
          onClick={listarProdutosMaisConsumidos}
        >
          Buscar pet
        </button>
      </div>
      <div
        style={{ marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px" }}
      >
        <table className="table table-hover table-bordered mt-5 border border-primary-subtle rounded-2">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Nome do produto</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {produtoMaisConsumidoCPF.map((item) => (
              <tr key={item.produtonome}>
                <td>{item.clientenome}</td>
                <td>{item.produtonome}</td>
                <td>{item.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProdutosMaisConsumidosPorCPF;
