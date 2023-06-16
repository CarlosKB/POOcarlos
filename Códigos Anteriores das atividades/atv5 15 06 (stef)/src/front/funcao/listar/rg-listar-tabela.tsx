import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";

export default function RGListarTabela() {
  // listar Pet na tabela
  interface RG {
    clientergid: string;
    clienteid: string;
    rgnumero: string;
    rgdataemissao: string;
  }

  const [RG, setRG] = useState<RG[]>([]);
  const [nomeCliente, setNomeCliente] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    listarRG();
  }, []);

  const listarRG = () => {
    axios
      .get("http://localhost:3001/getRG")
      .then((response) => {
        setRG(response.data);
        const promises = response.data.map((rg: RG) => {
          return obterNomeCliente(rg.clienteid).then((nomeCliente) => {
            return { clienteid: rg.clienteid, nomecliente: nomeCliente };
          });
        });

        Promise.all(promises)
          .then((results) => {
            const nomesCliente = results.reduce((acc, result) => {
              acc[result.clienteid] = result.nomecliente;
              return acc;
            }, {});
            setNomeCliente(nomesCliente);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const obterNomeCliente = (clienteid: string) => {
    return axios
      .get("http://localhost:3001/getPetsResponsavel", { params: { clienteid } })
      .then((response) => {
        return response.data.nomecliente;
      })
      .catch((error) => {
        console.error(error);
        return "";
      });
  };


  return (
    <div>
      <Navbar />
      <div>
        <h2
          className="position-absolute top-20 start-40  mt-4"
          style={{ marginLeft: "600px" }}
        >
          Listagem de RGs
        </h2>
      </div>
      <div
        style={{
          marginTop: "100px",
          width: "1000px",
          marginLeft: "250px",
          borderRadius: "50px"
        }}
      >
        <table className="table table-hover table-bordered mt-5">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Número de RG</th>
              <th scope="col">Data de Emissão</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {RG.map((rg) => (
              <tr key={rg.clientergid}>
                <td>{nomeCliente[rg.clienteid]}</td>
                <td>{rg.rgnumero}</td>
                <td>{rg.rgdataemissao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
