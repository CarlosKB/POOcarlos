import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function ClienteFormEdicao() {
  return (
    <div>
      <Navbar />
      <div>
        <h2
          className="position-absolute top-20 end-60  mt-4"
          style={{ marginLeft: "150px" }}
        >
          Edição de Cliente
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
          placeholder="CPF"
          aria-label="Username"
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
          Buscar cliente
        </button>
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "80px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Nome Social"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "110px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Nome"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "140px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          *
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="data de emissão do CPF"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "170px" }}
      >
        <p>
          <a
            className="btn btn-primary"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            + Adicionar um pet
          </a>
        </p>
        <div className="collapse" id="collapseExample">
          <div className="input-group" style={{ width: "600px" }}>
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Nome do pet"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group" style={{ width: "600px", top: "10px" }}>
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Raça do pet"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group" style={{ width: "600px", top: "20px" }}>
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Gênero do pet"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group" style={{ width: "600px", top: "30px" }}>
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Tipo do pet"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <button
            type="button"
            className="btn btn-info"
            style={{ width: "120px", top: "40px", left: "480px" }}
          >
            Adicionar
          </button>
        </div>
        <div
          className="input-group position-relative ms-5"
          style={{ width: "600px", top: "50px", left: "343px", bottom: "20px" }}
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
            style={{ width: "100px", left:"10px" }}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
