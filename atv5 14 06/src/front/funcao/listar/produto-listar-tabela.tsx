import axios from "axios";
import Navbar from "../componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";

export default function ProdutoListarTabela() {
    // listar produto na tabela
    interface Produto {
      produtoid: string;
      produtonome: string;
      produtopreco: string;
    }
    const [produto, setProduto] =  useState<Produto[]>([]);
  
    useEffect(() => {
      listarProduto();
    }, []);
    
    const listarProduto = () => {
      axios
        .get("http://localhost:3001/listarProdutos")
        .then((response) => {
          setProduto(response.data);
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
            Listagem de Produtos
          </h2>
        </div>
        <div style={{marginTop: "100px", width: "1000px", marginLeft: "250px", borderRadius: "50px"}}>
          <table className="table table-hover table-bordered mt-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
            {produto.map((produto) => (
              <tr key={produto.produtoid}>
                <td>{produto.produtoid}</td>
                <td>{produto.produtonome}</td>
                <td>{produto.produtopreco}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
