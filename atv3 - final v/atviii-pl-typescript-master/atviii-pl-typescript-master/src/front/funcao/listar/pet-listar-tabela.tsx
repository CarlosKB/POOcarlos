import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function PetListarTabela() {
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
        <div style={{marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px"}}>
          <table className="table table-hover table-bordered mt-5">
            <thead>
              <tr>
                <th scope="col">Posição</th>
                <th scope="col">Nome</th>
                <th scope="col">Raça</th>
                <th scope="col">Responsável</th>
                <th scope="col">Perfil</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th scope="row">1</th>
                <td>Pet 1</td>
                <td>SRD</td>
                <td>Cliente 1</td>
                <td>Visualizar 🔎</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Pet 2</td>
                <td>SRD</td>
                <td>Cliente 2</td>
                <td>Visualizar 🔎</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Pet 3</td>
                <td>SRD</td>
                <td>Cliente 3</td>
                <td>Visualizar 🔎</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
