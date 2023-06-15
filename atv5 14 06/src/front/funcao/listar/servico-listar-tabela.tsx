import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";

export default function ServicoListarTabela() {
    // listar servico na tabela
    interface Servico {
      servicoid: string;
      serviconome: string;
      servicopreco: string;
    }
    const [servico, setServico] =  useState<Servico[]>([]);
  
    useEffect(() => {
      listarServico();
    }, []);
    
    const listarServico = () => {
      axios
        .get("http://localhost:3001/listarServicos")
        .then((response) => {
          setServico(response.data);
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
            Listagem de Serviços
          </h2>
        </div>
        <div style={{marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px"}}>
          <table className="table table-hover table-bordered mt-5">
            <thead>
              <tr>

                <th scope="col">Nome</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
            {servico.map((servico) => (
              <tr key={servico.servicoid}>

                <td>{servico.serviconome}</td>
                <td>{servico.servicopreco}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
