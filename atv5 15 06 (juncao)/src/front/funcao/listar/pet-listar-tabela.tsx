import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";

export default function PetListarTabela() {
  // listar Pet na tabela
  interface Pet {
    petid: string;
    clienteid: string;
    petnome: string;
    petraca: string;
    pettipo: string;
    petgenero: string;
  }

  const [pet, setPet] = useState<Pet[]>([]);
  const [nomeCliente, setNomeCliente] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    listarPet();
  }, []);

  const listarPet = () => {
    axios
      .get("http://localhost:3001/getPets")
      .then((response) => {
        setPet(response.data);
        const promises = response.data.map((pet: Pet) => {
          return obterNomeCliente(pet.clienteid).then((nomeCliente) => {
            return { clienteid: pet.clienteid, nomecliente: nomeCliente };
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
          Listagem de Pets
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
              <th scope="col">Responsável</th>
              <th scope="col">Nome</th>
              <th scope="col">Raça</th>
              <th scope="col">Tipo</th>
              <th scope="col">Gênero</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {pet.map((pet) => (
              <tr key={pet.petid}>
                <td>{nomeCliente[pet.clienteid]}</td>
                <td>{pet.petnome}</td>
                <td>{pet.petraca}</td>
                <td>{pet.pettipo}</td>
                <td>{pet.petgenero}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
