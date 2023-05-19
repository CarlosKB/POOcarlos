/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type props = {
  tema: string;
  botoes: string[];
  dropdown: string[];
  seletorView: Function;
};

export default class BarraNavegacao extends Component<props> {
  constructor(props: props | Readonly<props>) {
    super(props);
    this.gerarListaBotoes = this.gerarListaBotoes.bind(this);
  }

  gerarListaBotoes() {
    if (this.props.botoes.length <= 0) {
      return <></>;
    } else {
      let lista = this.props.botoes.map((valor) => (
        <li key={valor} className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={(e) => this.props.seletorView(valor, e)}
          >
            {valor}
          </a>
        </li>
      ));
      return lista;
    }
  }
  gerarListaDropdown() {
    if (this.props.dropdown.length <= 0) {
      return <></>;
    } else {
      let lista = this.props.dropdown.map((valor) => (
        <li key={valor} className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={(e) => this.props.seletorView(valor, e)}
          >
            {valor}
          </a>
        </li>
      ));
      return lista;
    }
  }
  
//   gerarListaDropdownGerson() {
//     let listaBotoes = this.props.botoes.map((valor) => (
//         <li key={valor} className="nav-item dropdown">
//           <a
//             className="nav-link dropdown-toggle"
//             href="#"
//             onClick={(e) => this.props.seletorView(valor, e)}
//           >
//             {valor}
//           </a>
        
//         </li>
//       ));

//     let lista = this.props.dropdown.map((valor) => (
//         <li key={valor} className="nav-item">
//           <a
//             className="nav-link"
//             href="#"
//             onClick={(e) => this.props.seletorView(valor, e)}
//           >
//             {valor}
//           </a>
//         </li>
//       ));
//       return lista;
//   }

  render() {
    let tema = this.props.tema;

    return (
      <>
        <nav
          className="navbar navbar-expand-lg"
          data-bs-theme="light"
          style={{ backgroundColor: tema, marginBottom: 10 }}
        >
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">PetLovers</span>
            <div className="nav-item dropdown" style={{listStyle: "none"}}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >Cadastrar</a>
              <ul className="dropdown-menu">{this.gerarListaDropdown()}</ul>
            </div>
            <div className="nav-item dropdown" style={{listStyle: "none"}}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >Editar</a>
              <ul className="dropdown-menu">{this.gerarListaDropdown()}</ul>
            </div>
            <div className="nav-item dropdown" style={{listStyle: "none"}}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >Listar</a>
              <ul className="dropdown-menu">{this.gerarListaDropdown()}</ul>
            </div>
            <div className="nav-item dropdown" style={{listStyle: "none"}}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >Excluir</a>
              <ul className="dropdown-menu">{this.gerarListaDropdown()}</ul>
            </div>

            
            
          </div>
        </nav>
      </>
    );
  }
}
