
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function ProdutoFormCadastro() {
  return (
    <div>
      <Navbar />
        
      <div>
        <h2
          className="position-absolute top-20 end-60  mt-4"
          style={{ marginLeft: "150px" }}
        >
          Cadastro de Produto
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
          placeholder="Nome do produto"
          aria-label="CPF do responsavel"
          aria-describedby="basic-addon1"
        />
      </div>
      <div
        className="input-group position-relative ms-5 mt-5"
        style={{ width: "600px", top: "30px" }}
      >
        <span className="input-group-text" id="basic-addon1">
          R$
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Valor do produto"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
     
      <div
        className="input-group position-relative ms-5"
        style={{ width: "600px", top: "90px", left: "500px" }}
      >
      <button type="button" className="btn btn-info" style={{width: "100px"}}>Cadastrar</button></div>
    </div>
  );
}
