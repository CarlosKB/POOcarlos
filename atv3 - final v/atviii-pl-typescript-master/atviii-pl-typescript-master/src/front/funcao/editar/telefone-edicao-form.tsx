import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function TelefoneFormEdicao(){
  return (
    <div>
      <Navbar />

      <div>
        <h2
          className="position-absolute top-20 end-60  mt-4"
          style={{ marginLeft: "150px" }}
        >
          Edição de telefone
        </h2>
      </div>
      <div
        className="input-group position-relative ms-5 mt-5"
        style={{ width: "600px", top: "50px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="CPF do cliente"
          aria-label="CPF do responsavel"
          aria-describedby="basic-addon1"
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "10px", left: "300px" }}
      >
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "200px", marginLeft: "350px" }}
        >
          Buscar telefone
        </button>
      </div>
      <div className="input-group mb-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ top: "45px", left: "48px" }}
        >
        </button>
        <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
              >
              </a>
            </li>
              <li >
                <a
                  id="combobox-pet"
                  className="dropdown-item"
                  href="#"
                >
                  
                </a>
              </li>
        </ul>
      </div>
      <div
        className="input-group position-relative ms-5 mt-5"
        style={{ width: "600px", top: "30px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="DDD do telefone"
          aria-label="Nome do pet"
          aria-describedby="basic-addon1"
        />
      </div>
      <div
        className="input-group position-relative ms-5 mt-5"
        style={{ width: "600px", top: "30px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Numero do telefone"
          aria-label="Nome do pet"
          aria-describedby="basic-addon1"
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "140px", left: "390px" }}
      >
        <button
          type="button"
          className="btn btn-danger"
          style={{ width: "100px" }}
        >
          Excluir
        </button>
        <button
          type="button"
          className="btn btn-info"
          style={{ width: "100px", left: "10px" }}
         
        >
          Editar
        </button>
      </div>
    </div>
  );
}
