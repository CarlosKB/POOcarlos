import express from "express";
import cors from "cors";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import shortid from "shortid";
import dotenv from "dotenv";

const cliente = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "Empresa",
});

const app = express();
app.use(cors());
app.use(express.json());

// function cadastroCliente(
//   ClienteNomeSocial,
//   ClienteNome,
//   ClienteCPF,
//   ClienteCPFDataEmissao,
//   ClienteRG,
//   ClienteRGDataEmissao,
//   ClienteDataCadastro,
//   callback
// ) {
//   ClienteDataCadastro = new Date().toLocaleString();
//   let SQL =
//     "INSERT INTO cliente (ClienteNomeSocial, ClienteNome, ClienteCPF, ClienteCPFDataEmissao, ClienteRG, ClienteRGDataEmissao, ClientedataCadastro) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ClienteID";
//   cliente.query(
//     SQL,
//     [
//       ClienteNomeSocial,
//       ClienteNome,
//       ClienteCPF,
//       ClienteCPFDataEmissao,
//       ClienteRG,
//       ClienteRGDataEmissao,
//       ClienteDataCadastro,
//     ],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         callback(err);
//       } else {
//         const clienteID = result.rows[0].clienteid; // Corrected variable name

//         callback(null, clienteID);
//       }
//     }
//   );
// }

function cadastroCliente(
  ClienteNomeSocial,
  ClienteNome,
  ClienteCPF,
  ClienteCPFDataEmissao,
  ClienteDataCadastro,
  callback
) {
  ClienteDataCadastro =  new Date().toLocaleString();
  let SQL =
    "INSERT INTO cliente (ClienteNomeSocial, ClienteNome, ClienteCPF, ClienteCPFDataEmissao, ClientedataCadastro) VALUES ($1, $2, $3, $4, $5) RETURNING ClienteID";
  cliente.query(
    SQL,
    [
      ClienteNomeSocial,
      ClienteNome,
      ClienteCPF,
      ClienteCPFDataEmissao,
      ClienteDataCadastro,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        const clienteID = result.rows[0].clienteid; // Corrected variable name

        callback(null, clienteID);
      }
    }
  );
}

function cadastrarPet(
  ClienteID,
  PetNome,
  PetRaca,
  PetTipo,
  PetGenero,
  callback
) {
  let SQL =
    "INSERT INTO Pets (ClienteID, PetNome, PetRaca, PetTipo, PetGenero) VALUES ($1, $2, $3, $4, $5)";
  cliente.query(
    SQL,
    [ClienteID, PetNome, PetRaca, PetTipo, PetGenero],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

function obterClienteIDPorCPF(clienteCPF, callback) {
  cliente.query(
    "SELECT ClienteID FROM Cliente WHERE ClienteCPF = $1",
    [clienteCPF],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        if (result.rows.length > 0) {
          const clienteID = result.rows[0].clienteid;

          callback(null, clienteID);
        } else {
          const error = new Error("Cliente não encontrado");
          callback(error);
        }
      }
    }
  );
}

function listarTelefonesPorCPF(clienteCPF, callback) {
  obterClienteIDPorCPF(clienteCPF, (err, clienteID) => {
    if (err) {
      callback(err);
    } else {
      cliente.query(
        "SELECT TelefoneDDD, TelefoneNumero, clientetelefoneid FROM ClienteTelefone WHERE ClienteID = $1",
        [clienteID],
        (err, result) => {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            const telefones = result.rows;
            console.log(telefones);
            
            callback(null, telefones);
          }
        }
      );
    }
  });
}

function cadastrarTelefone(ClienteID, TelefoneDDD, TelefoneNumero, callback) {
  let SQL =
    "INSERT INTO ClienteTelefone (ClienteID, TelefoneDDD, TelefoneNumero) VALUES ($1, $2, $3)";
  cliente.query(
    SQL,
    [ClienteID, TelefoneDDD, TelefoneNumero],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

//Consumir produto e Serviço
function recuperarClienteServicoPetID(
  clienteCPF,
  nomeServico,
  nomePet,
  callback
) {
  cliente.query(
    `SELECT c.ClienteID, p.PetID, pr.ServicoID
        FROM Cliente c
        JOIN Pets p ON c.ClienteID = p.ClienteID
        JOIN Servico pr ON pr.ServicoNome = $2
        WHERE c.ClienteCPF = $1 AND p.PetNome = $3;`,
    [clienteCPF, nomeServico, nomePet],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result.rows);
      }
    }
  );
}

function recuperarClienteProdutoPetID(
  clienteCPF,
  nomeProduto,
  nomePet,
  callback
) {
  cliente.query(
    `SELECT c.ClienteID, p.PetID, pr.ProdutoID
        FROM Cliente c
        JOIN Pets p ON c.ClienteID = p.ClienteID
        JOIN Produto pr ON pr.ProdutoNome = $2
        WHERE c.ClienteCPF = $1 AND p.PetNome = $3;`,
    [clienteCPF, nomeProduto, nomePet],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        // console.log(result.rows);
        callback(null, result.rows);
      }
    }
  );
}

function consumirProduto(clienteCpf, nomeProduto, nomePet, callback) {
  recuperarClienteProdutoPetID(
    clienteCpf,
    nomeProduto,
    nomePet,
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        const clienteID = result[0].clienteid;
        const produtoID = result[0].produtoid;
        const petID = result[0].petid;

        cliente.query(
          "INSERT INTO ProdutosConsumidosCliente (ProdutoID, ClienteID, PetID) VALUES ($1, $2, $3)",
          [produtoID, clienteID, petID],
          (err, result) => {
            if (err) {
              console.log(err);
              callback(err);
            } else {
              callback(null, result);
            }
          }
        );
      }
    }
  );
}

function consumirServico(clienteCpf, nomeServico, nomePet, callback) {
  recuperarClienteServicoPetID(
    clienteCpf,
    nomeServico,
    nomePet,
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        const clienteID = result[0].clienteid;
        const servicoID = result[0].servicoid;
        const petID = result[0].petid;

        cliente.query(
          "INSERT INTO ServicoConsumidosCliente (ServicoID, ClienteID, PetID) VALUES ($1, $2, $3)",
          [servicoID, clienteID, petID],
          (err, result) => {
            if (err) {
              console.log(err);
              callback(err);
            } else {
              callback(null, result);
            }
          }
        );
      }
    }
  );
}

function listarPetsPorCPF(cpf, callback) {
  obterClienteIDPorCPF(cpf, (err, clienteID) => {
    if (err) {
      callback(err);
    } else {
      cliente.query(
        `SELECT PetID, PetNome FROM Pets WHERE ClienteID = $1`,
        [clienteID],
        (err, result) => {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            callback(null, result.rows);
          }
        }
      );
    }
  });
}

function listarServicos(callback) {
  cliente.query("SELECT * FROM Servico", (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result.rows);
    }
  });
}

function listarProdutos(callback) {
  cliente.query("SELECT * FROM Produto", (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result.rows);
    }
  });
}

function listarServicosMaisConsumidosPorRaca(raca, callback) {
  cliente.query(
    `SELECT s.ServicoNome, COUNT(*) AS Quantidade
      FROM Servico s
      JOIN ServicosConsumidosCliente sc ON s.ServicoID = sc.ServicoID
      JOIN Pets p ON sc.PetID = p.PetID
      WHERE p.PetRaca = $1
      GROUP BY s.ServicoNome
      ORDER BY Quantidade DESC`,
    [raca],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result.rows);
      }
    }
  );
}

// function listarProdutosMaisConsumidosPorRaca(racaPet, callback) {
//   cliente.query(
//     `SELECT p.ProdutoNome, COUNT(*) AS Quantidade
//       FROM Produto p
//       JOIN ProdutosConsumidosCliente pc ON p.ProdutoID = pc.ProdutoID
//       JOIN Pets pt ON pc.PetID = pt.PetID
//       WHERE pt.PetRaca = $1
//       GROUP BY p.ProdutoNome
//       ORDER BY Quantidade DESC`,
//     [racaPet],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         callback(err);
//       } else {
//         callback(null, result.rows);
//       }
//     }
//   );
// }

// function listarProdutosMaisConsumidosPorTipoPet(tipoPet, callback) {
//   cliente.query(
//     `SELECT p.ProdutoNome, COUNT(*) AS Quantidade
//       FROM Produto p
//       JOIN ProdutosConsumidosCliente pc ON p.ProdutoID = pc.ProdutoID
//       JOIN Pets pt ON pc.PetID = pt.PetID
//       WHERE pt.PetTipo = $1
//       GROUP BY p.ProdutoNome
//       ORDER BY Quantidade DESC`,
//     [tipoPet],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         callback(err);
//       } else {
//         callback(null, result.rows);
//       }
//     }
//   );
// }

// function listarServicosMaisConsumidosPorTipoPet(tipoPet, callback) {
//   cliente.query(
//     `SELECT s.ServicoNome, COUNT(*) AS Quantidade
//       FROM Servico s
//       JOIN ServicosConsumidosCliente sc ON s.ServicoID = sc.ServicoID
//       JOIN Pets p ON sc.PetID = p.PetID
//       WHERE p.PetTipo = $1
//       GROUP BY s.ServicoNome
//       ORDER BY Quantidade DESC`,
//     [tipoPet],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         callback(err);
//       } else {
//         callback(null, result.rows);
//       }
//     }
//   );
// }

function cadastrarPetPorCpf(
  nomePet,
  tipoPet,
  petRaca,
  petgenero,
  clienteCPF,
  callback
) {
  obterClienteIDPorCPF(clienteCPF, (err, clienteID) => {
    if (err) {
      callback(err);
    } else {
      cliente.query(
        "INSERT INTO Pets (PetNome, PetTipo, petraca, petgenero, ClienteID) VALUES ($1, $2, $3, $4, $5)",
        [nomePet, tipoPet, petRaca, petgenero, clienteID],
        (err, result) => {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            callback(null, result);
          }
        }
      );
    }
  });
}

function cadastrarTelefonePorCPF(ddd, numero, clienteCPF, callback) {
  obterClienteIDPorCPF(clienteCPF, (err, clienteID) => {
    if (err) {
      callback(err);
    } else {
      cliente.query(
        "INSERT INTO clientetelefone (telefoneddd, telefonenumero, ClienteID) VALUES ($1, $2, $3)",
        [ddd, numero, clienteID],
        (err, result) => {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            callback(null, result);
          }
        }
      );
    }
  });
}

function listarProdutosMaisConsumidos(callback) {
  cliente.query(
    `SELECT p.ProdutoNome, COUNT(*) AS Quantidade
      FROM Produto p
      JOIN ProdutosConsumidosCliente pc ON p.ProdutoID = pc.ProdutoID
      GROUP BY p.ProdutoNome
      ORDER BY Quantidade DESC`,
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result.rows);
      }
    }
  );
}

function listarServicosMaisConsumidos(callback) {
  cliente.query(
    `SELECT s.ServicoNome, COUNT(*) AS Quantidade
      FROM Servico s
      JOIN ServicoConsumidosCliente sc ON s.ServicoID = sc.ServicoID
      GROUP BY s.ServicoNome
      ORDER BY Quantidade DESC`,
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result.rows);
      }
    }
  );
}


function cadastrarProduto(nomeProduto, precoProduto, callback) {
  cliente.query(
    "INSERT INTO Produto (ProdutoNome, ProdutoPreco) VALUES ($1, $2)",
    [nomeProduto, precoProduto],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

function cadastrarServico(nomeServico, precoServico, callback) {
  cliente.query(
    "INSERT INTO Servico (ServicoNome, ServicoPreco) VALUES ($1, $2)",
    [nomeServico, precoServico],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

function listarProdutosMaisConsumidosPorCPF(clienteCPF, callback) {
  obterClienteIDPorCPF(clienteCPF, (err, clienteID) => {
    if (err) {
      callback(err);
    } else {
      const SQL = `
        SELECT c.ClienteNome, pr.ProdutoNome, COUNT(*) AS quantidade
        FROM ProdutosConsumidosCliente pc
        JOIN Produto pr ON pc.ProdutoID = pr.ProdutoID
        JOIN Cliente c ON pc.ClienteID = c.ClienteID
        WHERE pc.ClienteID = $1
        GROUP BY c.ClienteNome, pr.ProdutoNome
        ORDER BY quantidade DESC;
      `;

      cliente.query(SQL, [clienteID], (err, result) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null, result.rows);
        }
      });
    }
  });
}

function listarServicosMaisConsumidosPorCPF(clienteCPF, callback) {
  obterClienteIDPorCPF(clienteCPF, (err, clienteID) => {
    if (err) {
      callback(err);
    } else {
      const SQL = `
        SELECT c.ClienteNome, s.ServicoNome, COUNT(*) AS quantidade
        FROM ServicoConsumidosCliente sc
        JOIN Servico s ON sc.ServicoID = s.ServicoID
        JOIN Cliente c ON sc.ClienteID = c.ClienteID
        WHERE sc.ClienteID = $1
        GROUP BY c.ClienteNome, s.ServicoNome
        ORDER BY quantidade DESC;
      `;

      cliente.query(SQL, [clienteID], (err, result) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null, result.rows);
        }
      });
    }
  });
}

app.post("/servicosMaisConsumidosPorCPF", (req, res) => {
  const clienteCPF = req.body.clienteCPF;

  listarServicosMaisConsumidosPorCPF(clienteCPF, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Erro ao recuperar os serviços mais consumidos pelo cliente.",
      });
    } else {
      res.json(result);
    }
  });
});



app.post("/produtosMaisConsumidosPorCPF", (req, res) => {
  const clienteCPF = req.body.clienteCPF;

  listarProdutosMaisConsumidosPorCPF(clienteCPF, (err, produtos) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Erro ao listar os produtos mais consumidos pelo cliente.",
      });
    } else {
      res.json(produtos);
    }
  });
});



app.get("/produtosMaisConsumidosPorTipoPet", (req, res) => {
  const SQL = `
    SELECT p.PetTipo, pr.ProdutoNome, COUNT(*) AS quantidade
    FROM Pets p
    JOIN ProdutosConsumidosCliente pc ON p.PetID = pc.PetID
    JOIN Produto pr ON pc.ProdutoID = pr.ProdutoID
    GROUP BY p.PetTipo, pr.ProdutoNome
    ORDER BY quantidade DESC;
  `;

  cliente.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Erro ao recuperar os produtos mais consumidos por tipo de pet.",
      });
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/produtosMaisConsumidosPorRacaPet", (req, res) => {
  const SQL = `
    SELECT p.PetRaca, pr.ProdutoNome, COUNT(*) AS quantidade
    FROM Pets p
    JOIN ProdutosConsumidosCliente pc ON p.PetID = pc.PetID
    JOIN Produto pr ON pc.ProdutoID = pr.ProdutoID
    GROUP BY p.PetRaca, pr.ProdutoNome
    ORDER BY quantidade DESC;
  `;

  cliente.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Erro ao recuperar os produtos mais consumidos por raça de pet.",
      });
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/servicosMaisConsumidosPorRacaPet", (req, res) => {
  const SQL = `
    SELECT p.PetRaca, s.ServicoNome, COUNT(*) AS quantidade
    FROM Pets p
    JOIN ServicoConsumidosCliente sc ON p.PetID = sc.PetID
    JOIN Servico s ON sc.ServicoID = s.ServicoID
    GROUP BY p.PetRaca, s.ServicoNome
    ORDER BY quantidade DESC;
  `;

  cliente.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Erro ao recuperar os serviços mais consumidos por raça de pet.",
      });
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/servicosMaisConsumidosPorTipoPet", (req, res) => {
  const SQL = `
    SELECT p.PetTipo, s.ServicoNome, COUNT(*) AS quantidade
    FROM Pets p
    JOIN ServicoConsumidosCliente sc ON p.PetID = sc.PetID
    JOIN Servico s ON sc.ServicoID = s.ServicoID
    GROUP BY p.PetTipo, s.ServicoNome
    ORDER BY quantidade DESC;
  `;

  cliente.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Erro ao recuperar os serviços mais consumidos por tipo de pet.",
      });
    } else {
      res.json(result.rows);
    }
  });
});



app.post("/cadastrarServico", (req, res) => {
  const { nomeServico, precoServico } = req.body;

  cadastrarServico(nomeServico, precoServico, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao cadastrar o serviço" });
    } else {
      res.json({ message: "Serviço cadastrado com sucesso" });
    }
  });
});

app.post("/cadastrarProduto", (req, res) => {
  const { nomeProduto, precoProduto } = req.body;

  cadastrarProduto(nomeProduto, precoProduto, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao cadastrar o produto" });
    } else {
      res.json({ message: "Produto cadastrado com sucesso" });
    }
  });
});

app.get("/produtosMaisConsumidos", (req, res) => {
  listarProdutosMaisConsumidos((err, produtos) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erro ao listar produtos mais consumidos" });
    } else {
      res.json(produtos);
    }
  });
});

app.get('/listarServicosMaisConsumidos', (req, res) => {
  listarServicosMaisConsumidos((err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter os serviços mais consumidos' });
    } else {
      res.json(result);
    }
  });
});

app.post("/cadastrarTelefone", (req, res) => {
  const { ddd, numero, clienteCPF } = req.body;

  cadastrarTelefonePorCPF(ddd, numero, clienteCPF, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao cadastrar telefone" });
    } else {
      res.json({ message: "Telefone cadastrado com sucesso" });
    }
  });
});

app.post("/cadastrarPetPorCPF", (req, res) => {
  const { nomePet, tipoPet, petRaca, petGenero, clienteCPF } = req.body;

  cadastrarPetPorCpf(
    nomePet,
    tipoPet,
    petRaca,
    petGenero,
    clienteCPF,
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Erro ao cadastrar o pet" });
      } else {
        res.json({ message: "Pet cadastrado com sucesso" });
      }
    }
  );
});

app.get("/listarProdutos", (req, res) => {
  listarProdutos((err, produtos) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao listar os produtos" });
    } else {
      res.json(produtos);
    }
  });
});

app.get("/ListarServicos", (req, res) => {
  listarServicos((err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao listar os serviços" });
    } else {
      res.json(result);
    }
  });
});

app.get("/ListarTelefones", (req, res) => {
  const { cpf } = req.body;

  obterClienteIDPorCPF(cpf, (err, clienteID) => {
    if (err) {
      res.status(500).json({ error: "Erro ao obter ID do cliente" });
    } else {
      listarTelefonesPorCPF(cpf, (err, telefones) => {
        if (err) {
          res.status(500).json({ error: "Erro ao listar telefones" });
        } else {
          res.json({ clienteID, telefones });
        }
      });
    }
  });
});

app.get("/listarPetsPorCPF", (req, res) => {
  const { cpf } = req.query;

  listarPetsPorCPF(cpf, (err, pets) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao listar os pets" });
    } else {
      res.json(pets);
      // console.log(pets);
    }
  });
});

app.post("/consumirServico", (req, res) => {
  const { clienteCpf, nomeServico, nomePet } = req.body;

  consumirServico(clienteCpf, nomeServico, nomePet, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao consumir serviço" });
    } else {
      res.json({ message: "Serviço consumido com sucesso" });
    }
  });
});

app.post("/consumirProduto", (req, res) => {
  const { clienteCpf, nomeProduto, nomePet } = req.body;

  consumirProduto(clienteCpf, nomeProduto, nomePet, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao consumir produto" });
    } else {
      res.json({ message: "Produto consumido com sucesso" });
    }
  });
});
app.post("/cadastroCliente", (req, res) => {
  const {
    ClienteNomeSocial,
    ClienteNome,
    ClienteCPF,
    ClienteCPFDataEmissao,
    ClienteDataCadastro,
  } = req.body;

  cadastroCliente(
    ClienteNomeSocial,
    ClienteNome,
    ClienteCPF,
    ClienteCPFDataEmissao,
    ClienteDataCadastro,
    (err, clienteID) => {
      if (err) {
        res.status(500).json({ error: "Erro ao cadastrar cliente." });
      } else {
        const {
          PetNome,
          PetRaca,
          PetTipo,
          PetGenero,
          TelefoneDDD,
          TelefoneNumero,
        } = req.body;

        cadastrarPet(
          clienteID,
          PetNome,
          PetRaca,
          PetTipo,
          PetGenero,
          (err, resultPet) => {
            if (err) {
              res.status(500).json({ error: "Erro ao cadastrar pet." });
            } else {
              cadastrarTelefone(
                clienteID,
                TelefoneDDD,
                TelefoneNumero,
                (err, resultTelefone) => {
                  if (err) {
                    res
                      .status(500)
                      .json({ error: "Erro ao cadastrar telefone." });
                  } else {
                    res.send({
                      msg: "Cliente, pet e telefone cadastrados com sucesso.",
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

  
  app.get("/getPets", (req, res) => {
    cliente.query("SELECT * FROM pets", (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Erro ao obter pets" });
      } else {
        res.json(result.rows);
      }
    });
  });
  app.get("/getTelefone", (req, res) => {
    cliente.query("SELECT * FROM clientetelefone", (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Erro ao obter clientetelefoneid" });
      } else {
        res.json(result.rows);
      }
    });
  });
  app.get("/getPetsResponsavel", (req, res) => {
    const { clienteid } = req.query;
  
    obterNomeClientePorID(clienteid, (err, nomeCliente) => {
      if (err) {
        res.status(500).json({ error: "Erro ao obter nome do cliente" });
      } else {
        res.json({ nomecliente: nomeCliente });
      }
    });
  });

app.get("/getClientes", (req, res) => {
  cliente.query(
    "select * from cliente ORDER BY ClientedataCadastro DESC",
    (err, result) => {
      if (err) console.log(err);
      else res.json(result.rows);
    }
  );
});

app.get("/clientesMaisConsumiramProdutosQTD", (req, res) => {
  const quantidade = req.body.quantidade || 10; // Número padrão de clientes a serem exibidos

  const SQL = `
      SELECT c.ClienteID, c.ClienteNomeSocial, COUNT(pc.ProdutoID) AS total_produtos_consumidos
      FROM Cliente c
      LEFT JOIN ProdutosConsumidosCliente pc ON c.ClienteID = pc.ClienteID
      GROUP BY c.ClienteID, c.ClienteNomeSocial
      ORDER BY total_produtos_consumidos DESC
      LIMIT $1;
    `;

  cliente.query(SQL, [quantidade], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Erro ao recuperar os clientes que mais consumiram produtos.",
      });
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/clientesMaisConsumiramProdutosListaNomeProdutoQTD", (req, res) => {
  const quantidade = req.body.quantidade || 10; // Número padrão de clientes a serem exibidos

  const SQL = `
    SELECT c.ClienteID, c.ClienteNomeSocial, p.ProdutoNome, COUNT(pc.ProdutoID) AS quantidade
    FROM Cliente c
    LEFT JOIN ProdutosConsumidosCliente pc ON c.ClienteID = pc.ClienteID
    LEFT JOIN Produto p ON pc.ProdutoID = p.ProdutoID
    GROUP BY c.ClienteID, c.ClienteNomeSocial, p.ProdutoNome
    ORDER BY quantidade DESC
    LIMIT $1;
  `;

  cliente.query(SQL, [quantidade], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Erro ao recuperar os clientes que mais consumiram produtos.",
      });
    } else {
      res.json(result.rows);
    }
  });
});


app.get("/clientesMaisConsumiramServicosQTD", (req, res) => {
  const quantidade = req.body.quantidade || 10; // Número padrão de clientes a serem exibidos

  const SQL = `
      SELECT c.ClienteID, c.ClienteNomeSocial, COUNT(sc.ServicoID) AS total_servicos_consumidos
      FROM Cliente c
      LEFT JOIN ServicoConsumidosCliente sc ON c.ClienteID = sc.ClienteID
      GROUP BY c.ClienteID, c.ClienteNomeSocial
      ORDER BY total_servicos_consumidos DESC
      LIMIT $1;
    `;

  cliente.query(SQL, [quantidade], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Erro ao recuperar os clientes que mais consumiram serviços.",
      });
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/clientesMaisConsumiramProdutosValor", (req, res) => {
  const quantidade = req.body.quantidade || 10; // Número padrão de clientes a serem exibidos

  const SQL = `
      SELECT c.ClienteID, c.ClienteNomeSocial, SUM(p.ProdutoPreco) AS total_valor_produtos_consumidos
      FROM Cliente c
      LEFT JOIN ProdutosConsumidosCliente pc ON c.ClienteID = pc.ClienteID
      LEFT JOIN Produto p ON pc.ProdutoID = p.ProdutoID
      GROUP BY c.ClienteID, c.ClienteNomeSocial
      ORDER BY total_valor_produtos_consumidos DESC
      LIMIT $1;
    `;

  cliente.query(SQL, [quantidade], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error:
          "Erro ao recuperar os clientes que mais consumiram produtos em valor.",
      });
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/clientesMaisConsumiramServicosValor", (req, res) => {
  const quantidade = req.body.quantidade || 10; // Número padrão de clientes a serem exibidos

  const SQL = `
      SELECT c.ClienteID, c.ClienteNomeSocial, SUM(s.ServicoPreco) AS total_valor_servicos_consumidos
      FROM Cliente c
      LEFT JOIN ServicoConsumidosCliente sc ON c.ClienteID = sc.ClienteID
      LEFT JOIN Servico s ON sc.ServicoID = s.ServicoID
      GROUP BY c.ClienteID, c.ClienteNomeSocial
      ORDER BY total_valor_servicos_consumidos DESC
      LIMIT $1;
    `;

  cliente.query(SQL, [quantidade], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error:
          "Erro ao recuperar os clientes que mais consumiram serviços em valor.",
      });
    } else {
      res.json(result.rows);
    }
  });
});



// app.listen(3001, () => {
//   console.log("Servidor rodando!");
// });
// ADIÇÕES - STEF -----------------------------------------------------------------------------
function obterNomeClientePorID(clienteID, callback) {
  cliente.query(
    "SELECT ClienteNome FROM Cliente WHERE ClienteID = $1",
    [clienteID],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        if (result.rows.length > 0) {
          const nomeCliente = result.rows[0].clientenome;
          callback(null, nomeCliente);
        } else {
          const error = new Error("Cliente não encontrado");
          callback(error);
        }
      }
    }
  );
}

app.get("/getPets", (req, res) => {
  cliente.query("SELECT * FROM pets", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao obter pets" });
    } else {
      res.json(result.rows);
    }
  });
});
app.get("/getTelefone", (req, res) => {
  cliente.query("SELECT * FROM clientetelefone", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao obter clientetelefoneid" });
    } else {
      res.json(result.rows);
    }
  });
});
app.get("/getPetsResponsavel", (req, res) => {
  const { clienteid } = req.query;

  obterNomeClientePorID(clienteid, (err, nomeCliente) => {
    if (err) {
      res.status(500).json({ error: "Erro ao obter nome do cliente" });
    } else {
      res.json({ nomecliente: nomeCliente });
    }
  });
});

app.get("/getClientes", (req, res) => {
cliente.query(
  "select * from cliente ORDER BY ClientedataCadastro DESC",
  (err, result) => {
    if (err) console.log(err);
    else res.json(result.rows);
  }
);
});


app.get("/getClientePorCpf", (req, res) => {
const cpf = req.query.cpf; // Recupera o valor do CPF da requisição

cliente.query(
  "SELECT * FROM cliente WHERE clientecpf = $1",
  [cpf],
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Ocorreu um erro ao buscar o cliente por CPF" });
    } else {
      res.json(result.rows);
    }
  }
);
});


app.put("/atualizarPet/:idPet", (req, res) => {
const petID = req.params.idPet;
const { nomePet, racaPet, tipoPet, generoPet } = req.body;

const SQL = "UPDATE Pets SET PetNome = $1, PetRaca = $2, PetTipo = $3, PetGenero = $4 WHERE PetID = $5";
cliente.query(SQL, [nomePet, racaPet, tipoPet, generoPet, petID], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao atualizar o pet" });
  } else {
    res.json({ message: "Pet atualizado com sucesso" });
  }
});
});

app.put("/atualizarCliente/:cpf", (req, res) => {
const cpf = req.params.cpf;


const { clientenome, clientenomesocial, clientenovocpf, clientedataemissaocpf } = req.body;


const SQL = "UPDATE cliente SET clientenome = $1, clientenomesocial = $2, clientecpf = $3, clientecpfdataemissao = $4 WHERE clientecpf = $5";
cliente.query(SQL, [clientenome, clientenomesocial, clientenovocpf, clientedataemissaocpf, cpf], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao atualizar o cliente" });
  } else {
    res.json({ message: "Cliente atualizado com sucesso" });
  }
});
});

app.get("/getProdutoPorNome", (req, res) => {
const produtonome = req.query.produtonome;
cliente.query("SELECT * FROM produto WHERE produtonome = $1",
[produtonome], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao obter produto por nome" });
  } else {
    res.json(result.rows);
  }
});
});


app.put("/atualizarProduto/:produtonome", (req, res) => {
const produtonome = req.params.produtonome;


const { produtonovonome, produtopreco  } = req.body;


const SQL = "UPDATE produto SET produtonome = $1, produtopreco = $2 WHERE produtonome = $3";
cliente.query(SQL, [produtonovonome, produtopreco, produtonome ], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  } else {
    res.json({ message: "Produto atualizado com sucesso" });
  }
});
});

app.get("/getServicoPorNome", (req, res) => {
const serviconome = req.query.serviconome;

cliente.query("SELECT * FROM servico WHERE serviconome = $1",
[serviconome], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao obter servico por nome" });
  } else {
    res.json(result.rows);
  }
});
});


app.put("/atualizarServico/:serviconome", (req, res) => {
const serviconome = req.params.serviconome;


const { serviconovonome, servicopreco  } = req.body;


const SQL = "UPDATE servico SET serviconome = $1, servicopreco = $2 WHERE serviconome = $3";
cliente.query(SQL, [serviconovonome, servicopreco, serviconome ], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao atualizar o servico" });
  } else {
    res.json({ message: "Servico atualizado com sucesso" });
  }
});
});


app.put("/atualizarTelefone/:idTelefone", (req, res) => {
const telefoneid = req.params.idTelefone;
const { telefoneddd, telefonenumero } = req.body;
console.log(telefoneid,telefoneddd, telefonenumero);

const SQL = "UPDATE clientetelefone SET telefoneddd = $1, telefonenumero = $2 WHERE clientetelefoneid = $3";
cliente.query(SQL, [telefoneddd, telefonenumero, telefoneid], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao atualizar o telefone" });
  } else {
    res.json({ message: "Telefone atualizado com sucesso" });
  }
});
});

app.get("/listarTelefonesPorCPF", (req, res) => {
const { cpf } = req.query;

listarTelefonesPorCPF(cpf, (err, telefones) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao listar os telefones" });
  } else {
    res.json(telefones);
  }
});
});


function cadastrarRgPorCPF(rgnumero, rgdataemissao, clienteCPF, callback) {

obterClienteIDPorCPF(clienteCPF, (err, clienteID) => {
  if (err) {
    callback(err);
  } else {
    cliente.query(
      "INSERT INTO clienterg (rgnumero, rgdataemissao, ClienteID) VALUES ($1, $2, $3)",
      [rgnumero, rgdataemissao, clienteID],
      (err, result) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  }
});
}

app.post("/cadastrarRG", (req, res) => {
const { rgnumero, rgdataemissao, clienteCPF} = req.body;

cadastrarRgPorCPF(rgnumero, rgdataemissao, clienteCPF, (err, result) => {
  if (err) {
    res.status(500).json({ error: "Erro ao cadastrar RG" });
  } else {
    res.json({ message: "RG cadastrado com sucesso" });
  }
});
});



function listarRGsPorCPF(clienteCPF, callback) {
obterClienteIDPorCPF(clienteCPF, (err, clienteID) => {
  if (err) {
    callback(err);
  } else {
    cliente.query(
      "SELECT clientergid, rgnumero, rgdataemissao FROM clienterg WHERE ClienteID = $1",
      [clienteID],
      (err, result) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          const rgs = result.rows;
          callback(null, rgs);
        }
      }
    );
  }
});
}
app.get("/listarRGsPorCPF", (req, res) => {
const { cpf } = req.query;

listarRGsPorCPF(cpf, (err, rgs) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao listar os telefones" });
  } else {
    res.json(rgs);
  }
});
});


app.put("/atualizarRG/:clientergid", (req, res) => {
const clientergid = req.params.clientergid;
const { rgnumero, rgdataemissao } = req.body;
console.log(clientergid,rgnumero, rgdataemissao);

const SQL = "UPDATE clienterg SET rgnumero = $1, rgdataemissao = $2 WHERE clientergid = $3";
cliente.query(SQL, [rgnumero, rgdataemissao, clientergid], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao atualizar o RG" });
  } else {
    res.json({ message: "RG atualizado com sucesso" });
  }
});
});

app.get("/getRG", (req, res) => {
cliente.query("SELECT * FROM clienterg", (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao obter RGs" });
  } else {
    res.json(result.rows);
  }
});
});


app.delete("/excluirCliente/:cpf", (req, res) => {
const clientecpf = req.params.cpf;

// Excluir registros da tabela produtosconsumidoscliente
const deleteProdutosQuery = `DELETE FROM produtosconsumidoscliente WHERE clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $1)`;

cliente.query(deleteProdutosQuery, [clientecpf])
  .then(() => {
    // Excluir registros da tabela servicoconsumidoscliente
    const deleteServicosQuery = `DELETE FROM servicoconsumidoscliente WHERE clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $1)`;

    cliente.query(deleteServicosQuery, [clientecpf])
      .then(() => {
        // Excluir registros da tabela clientetelefone
        const deleteTelefonesQuery = `DELETE FROM clientetelefone WHERE clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $1)`;

        cliente.query(deleteTelefonesQuery, [clientecpf])
          .then(() => {
            // Excluir registros da tabela clienterg
            const deleteRgsQuery = `DELETE FROM clienterg WHERE clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $1)`;

            cliente.query(deleteRgsQuery, [clientecpf])
              .then(() => {
                // Excluir registros da tabela pets
                const deletePetsQuery = `DELETE FROM pets WHERE clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $1)`;

                cliente.query(deletePetsQuery, [clientecpf])
                  .then(() => {
                    // Excluir o cliente da tabela cliente
                    const deleteClienteQuery = `DELETE FROM cliente WHERE clientecpf = $1`;

                    cliente.query(deleteClienteQuery, [clientecpf])
                      .then(() => {
                        res.status(200).json({ message: "Cliente excluído com sucesso" });
                      })
                      .catch((error) => {
                        res.status(500).json({ error: "Erro ao excluir cliente" });
                      });
                  })
                  .catch((error) => {
                    res.status(500).json({ error: "Erro ao excluir registros de pets" });
                  });
              })
              .catch((error) => {
                res.status(500).json({ error: "Erro ao excluir registros de clienterg" });
              });
          })
          .catch((error) => {
            res.status(500).json({ error: "Erro ao excluir registros de clientetelefone" });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: "Erro ao excluir registros de servicoconsumidoscliente" });
      });
  })
  .catch((error) => {
    res.status(500).json({ error: "Erro ao excluir registros de produtosconsumidoscliente" });
  });
});
// Rota para exclusão de serviço
app.delete("/excluirTelefone/:clientetelefoneid/:cpf", (req, res) => {
const clientetelefoneid = req.params.clientetelefoneid;
const clientecpf = req.params.cpf;

// Executar a consulta DELETE na tabela clientetelefone
const query = `DELETE FROM clientetelefone WHERE clientetelefoneid = $1 AND clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $2)`;

cliente.query(query, [clientetelefoneid, clientecpf])
  .then(() => {
    res.status(200).json({ message: "Telefone excluído com sucesso" });
  })
  .catch((error) => {
    res.status(500).json({ error: "Erro ao excluir telefone" });
  });
});

app.delete("/excluirRG/:clientergid/:cpf", (req, res) => {
const clientergid = req.params.clientergid;
const clientecpf = req.params.cpf;

// Executar a consulta DELETE na tabela clientetelefone
const query = `DELETE FROM clienterg WHERE clientergid = $1 AND clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $2)`;

cliente.query(query, [clientergid, clientecpf])
  .then(() => {
    res.status(200).json({ message: "RG excluído com sucesso" });
  })
  .catch((error) => {
    res.status(500).json({ error: "Erro ao excluir RG" });
  });
});

app.delete("/excluirPet/:idPet/:cpf", (req, res) => {
const petid = req.params.idPet;
const clientecpf = req.params.cpf;

// Excluir registros da tabela produtosconsumidoscliente
const deleteProdutosQuery = `DELETE FROM produtosconsumidoscliente WHERE petid = $1 AND clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $2)`;

cliente.query(deleteProdutosQuery, [petid, clientecpf])
  .then(() => {
    // Excluir registros da tabela servicoconsumidoscliente
    const deleteServicosQuery = `DELETE FROM servicoconsumidoscliente WHERE petid = $1 AND clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $2)`;

    cliente.query(deleteServicosQuery, [petid, clientecpf])
      .then(() => {
        // Excluir o pet da tabela pets
        const deletePetQuery = `DELETE FROM pets WHERE petid = $1 AND clienteid IN (SELECT clienteid FROM cliente WHERE clientecpf = $2)`;

        cliente.query(deletePetQuery, [petid, clientecpf])
          .then(() => {
            res.status(200).json({ message: "Pet excluído com sucesso" });
          })
          .catch((error) => {
            res.status(500).json({ error: "Erro ao excluir pet" });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: "Erro ao excluir registros de servicoconsumidoscliente" });
      });
  })
  .catch((error) => {
    res.status(500).json({ error: "Erro ao excluir registros de produtosconsumidoscliente" });
  });
});

app.delete("/excluirServico/:serviconome", (req, res) => {
const serviconome = req.params.serviconome;
console.log(serviconome);

// Excluir registros da tabela servicoconsumidoscliente
const deleteServicoConsumidosQuery = `DELETE FROM servicoconsumidoscliente WHERE servicoid IN (SELECT servicoid FROM servico WHERE serviconome = $1)`;

cliente.query(deleteServicoConsumidosQuery, [serviconome])
  .then(() => {
    // Excluir o serviço da tabela servico
    const deleteServicoQuery = `DELETE FROM servico WHERE serviconome = $1`;

    cliente.query(deleteServicoQuery, [serviconome])
      .then(() => {
        res.status(200).json({ message: "Serviço excluído com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({ error: "Erro ao excluir serviço" });
      });
  })
  .catch((error) => {
    res.status(500).json({ error: "Erro ao excluir registros de servicoconsumidoscliente" });
  });
});

app.delete("/excluirProduto/:produtonome", (req, res) => {
const produtonome = req.params.produtonome;
console.log(produtonome);

// Excluir registros da tabela servicoconsumidoscliente
const deleteProdutoConsumidosQuery = `DELETE FROM produtosconsumidoscliente WHERE produtoid IN (SELECT produtoid FROM produto WHERE produtonome = $1)`;

cliente.query(deleteProdutoConsumidosQuery, [produtonome])
  .then(() => {
    // Excluir o serviço da tabela servico
    const deleteServicoQuery = `DELETE FROM produto WHERE produtonome = $1`;

    cliente.query(deleteServicoQuery, [produtonome])
      .then(() => {
        res.status(200).json({ message: "Produto excluído com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({ error: "Erro ao excluir produto" });
      });
  })
  .catch((error) => {
    res.status(500).json({ error: "Erro ao excluir registros de produto" });
  });
});




app.listen(3001, () => {
console.log("Servidor rodando!");
});

