import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function TelefoneListarTabela() {
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
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
