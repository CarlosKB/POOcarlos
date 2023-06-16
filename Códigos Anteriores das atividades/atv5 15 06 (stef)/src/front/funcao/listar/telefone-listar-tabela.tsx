import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";

export default function TelefoneListarTabela() {
  // listar Pet na tabela
  interface Telefone {
    telefoneid: string;
    clienteid: string;
    telefoneddd: string;
    telefonenumero: string;
  }

  const [telefone, setTelefone] = useState<Telefone[]>([]);
  const [nomeCliente, setNomeCliente] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    listarTelefone();
  }, []);

  const listarTelefone = () => {
    axios
      .get("http://localhost:3001/getTelefone")
      .then((response) => {
        setTelefone(response.data);
        const promises = response.data.map((telefone: Telefone) => {
          return obterNomeCliente(telefone.clienteid).then((nomeCliente) => {
            return { clienteid: telefone.clienteid, nomecliente: nomeCliente };
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
          Listagem de telefone
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
              <th scope="col">DDD</th>
              <th scope="col">Telefone</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {telefone.map((telefone) => (
              <tr key={telefone.telefoneid}>
                <td>{nomeCliente[telefone.clienteid]}</td>
                <td>{telefone.telefoneddd}</td>
                <td>{telefone.telefonenumero}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
