import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";

export default function ClienteListarTabela() {
   // listar produto na tabela
   interface Cliente {
    clienteid: string;
    clientenomesocial: string;
    clientecpf: string;
    clientecpfdataemissao: string;
    clientedatacadastro: string;
    clientenome: string;
  }
  const [cliente, setCliente] =  useState<Cliente[]>([]);

  useEffect(() => {
    listarCliente();
  }, []);
  console.log(cliente);
  
  const listarCliente = () => {
    axios
      .get("http://localhost:3001/getClientes")
      .then((response) => {
        setCliente(response.data);
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
            style={{ marginLeft: "600px" }}
          >
            Listagem de Clientes
          </h2>
        </div>
        <div style={{marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px"}}>
          <table className="table table-hover table-bordered mt-5">
            <thead>
              <tr>

                <th scope="col">Nome</th>
                <th scope="col">Nome Social</th>
                <th scope="col">CPF</th>
                <th scope="col">CPF data emissão</th>
                <th scope="col">Data cadastro</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {cliente.map((cliente) => (
              <tr>

                <td>{cliente.clientenome}</td>
                <td>{cliente.clientenomesocial}</td>
                <td>{cliente.clientecpf}</td>
                <td>{cliente.clientecpfdataemissao}</td>
                <td>{cliente.clientedatacadastro}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
