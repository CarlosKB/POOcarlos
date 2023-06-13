import express from "express"
import cors from "cors"
import { Pool } from "pg"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
import shortid from "shortid";
import dotenv from "dotenv"

const cliente = new Pool({
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "Empresa",
    // connectionString: 'postgres://jgkjdnpq:LSQ78hphQqJtTT5At_aS9Z-T3Dps25iG@silly.db.elephantsql.com/jgkjdnpq',
    // ssl: {
    //   rejectUnauthorized: false
    // }
});


const app = express()
app.use(cors())
app.use(express.json())


function cadastroCliente(ClienteNomeSocial, ClienteCPF, ClienteCPFDataEmissao, ClienteRG, ClienteRGDataEmissao, ClienteDataCadastro, callback) {
    let SQL = "INSERT INTO cliente (ClienteNomeSocial, ClienteCPF, ClienteCPFDataEmissao, ClienteRG, ClienteRGDataEmissao, ClientedataCadastro) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ClienteID";
    cliente.query(SQL, [ClienteNomeSocial, ClienteCPF, ClienteCPFDataEmissao, ClienteRG, ClienteRGDataEmissao, ClienteDataCadastro], (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            const clienteID = result.rows[0].ClienteID;
            callback(null, clienteID);
        }
    });
}

function cadastrarPet(ClienteID, PetNome, PetRaca, PetTipo, PetGenero, callback) {
    let SQL = "INSERT INTO Pets (ClienteID, PetNome, PetRaca, PetTipo, PetGenero) VALUES ($1, $2, $3, $4, $5)";
    cliente.query(SQL, [ClienteID, PetNome, PetRaca, PetTipo, PetGenero], (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

function cadastrarTelefone(ClienteID, TelefoneDDD, TelefoneNumero, callback) {
    let SQL = "INSERT INTO ClienteTelefone (ClienteID, TelefoneDDD, TelefoneNumero) VALUES ($1, $2, $3)";
    cliente.query(SQL, [ClienteID, TelefoneDDD, TelefoneNumero], (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
}




// async function cadastroCliente(ClienteNomeSocial: string, ClienteCPF: String, ClienteCPFDataEmissao: String, ClienteRG: String, ClienteRGDataEmissao: String, ClienteDataCadastro: String, res) {
//     let SQL = "INSERT INTO cliente (ClienteNomeSocial, ClienteCPF, ClienteCPFDataEmissao, ClienteRG, ClienteRGDataEmissao, ClientedataCadastro) VALUES('" + ClienteNomeSocial + "', '" + ClienteCPF + "', '" + ClienteCPFDataEmissao + "', '" + ClienteRG + "','" + ClienteRGDataEmissao + "', '" + ClienteDataCadastro + "')"
//     cliente.query(SQL, (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send({ msg: "Usuário cadastrado com sucesso." })
//         }
//     })
// }

function recuperarClienteProdutoID(nomeCliente, nomeProduto, callback) {
    cliente.query(
        `SELECT c.ClienteID, p.ProdutoID
      FROM Cliente c
      JOIN ProdutosConsumidosCliente pc ON c.ClienteID = pc.ClienteID
      JOIN Produto p ON pc.ProdutoID = p.ProdutoID
      WHERE c.ClienteNomeSocial = $1 AND p.ProdutoNome = $2`,
        [nomeCliente, nomeProduto],
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

function consumirProduto(nomeCliente, nomeProduto, callback) {
    recuperarClienteProdutoID(nomeCliente, nomeProduto, (err, result) => {
        if (err) {
            callback(err);
        } else {
            const clienteID = result[0].ClienteID;
            const produtoID = result[0].ProdutoID;

            cliente.query(
                "INSERT INTO ProdutosConsumidosCliente (ProdutoID, ClienteID) VALUES ($1, $2)",
                [produtoID, clienteID],
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
function recuperarClienteServicoID(nomeCliente, nomeServico, callback) {
    cliente.query(
        `SELECT c.ClienteID, s.ServicoID
      FROM Cliente c
      JOIN ServicoConsumidosCliente sc ON c.ClienteID = sc.ClienteID
      JOIN Servico s ON sc.ServicoID = s.ServicoID
      WHERE c.ClienteNomeSocial = $1 AND s.ServicoNome = $2`,
        [nomeCliente, nomeServico],
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

function consumirServico(nomeCliente, nomeServico, callback) {
    recuperarClienteServicoID(nomeCliente, nomeServico, (err, result) => {
        if (err) {
            callback(err);
        } else {
            const clienteID = result[0].ClienteID;
            const servicoID = result[0].ServicoID;

            cliente.query(
                "INSERT INTO ServicoConsumidosCliente (ServicoID, ClienteID) VALUES ($1, $2)",
                [servicoID, clienteID],
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

app.post("/consumirServico", (req, res) => {
    const { nomeCliente, nomeServico } = req.body;

    consumirServico(nomeCliente, nomeServico, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao consumir serviço" });
        } else {
            res.json({ message: "Serviço consumido com sucesso" });
        }
    });
});


app.post("/consumirProduto", (req, res) => {
    const { nomeCliente, nomeProduto } = req.body;

    consumirProduto(nomeCliente, nomeProduto, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao consumir produto" });
        } else {
            res.json({ message: "Produto consumido com sucesso" });
        }
    });
});

app.post('/cadastroCliente', (req, res) => {
    const { ClienteNomeSocial, ClienteCPF, ClienteCPFDataEmissao, ClienteRG, ClienteRGDataEmissao, ClienteDataCadastro } = req.body;

    cadastroCliente(ClienteNomeSocial, ClienteCPF, ClienteCPFDataEmissao, ClienteRG, ClienteRGDataEmissao, ClienteDataCadastro, (err, clienteID) => {
        if (err) {
            res.status(500).json({ error: "Erro ao cadastrar cliente." });
        } else {
            const { PetNome, PetRaca, PetTipo, PetGenero, TelefoneDDD, TelefoneNumero } = req.body;

            cadastrarPet(clienteID, PetNome, PetRaca, PetTipo, PetGenero, (err, resultPet) => {
                if (err) {
                    res.status(500).json({ error: "Erro ao cadastrar pet." });
                } else {
                    cadastrarTelefone(clienteID, TelefoneDDD, TelefoneNumero, (err, resultTelefone) => {
                        if (err) {
                            res.status(500).json({ error: "Erro ao cadastrar telefone." });
                        } else {
                            res.send({ msg: "Cliente, pet e telefone cadastrados com sucesso." });
                        }
                    });
                }
            });
        }
    });
});



// app.post('/cadastroCliente', async (req, res) => {
//     const { ClienteNomeSocial } = req.body
//     const { ClienteCPF } = req.body
//     const { ClienteCPFDataEmissao } = req.body
//     const { ClienteRG } = req.body
//     const { ClienteRGDataEmissao } = req.body
//     const { ClienteDataCadastro } = req.body

//     await cadastroCliente(ClienteNomeSocial, ClienteCPF, ClienteCPFDataEmissao, ClienteRG, ClienteRGDataEmissao, ClienteDataCadastro, res)

// })

app.get("/getClientes", (req, res) => {
    cliente.query(
        "select * from clientes ORDER BY ClientedataCadastro DESC",
        (err, result) => {
            if (err) console.log(err);
            else res.json(result.rows);
        }
    );
});

app.get("/clientesMaisConsumiramProdutos", (req, res) => {
    const quantidade = req.query.quantidade || 5; // Número padrão de clientes a serem exibidos

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
            res.status(500).json({ error: "Erro ao recuperar os clientes que mais consumiram produtos." });
        } else {
            res.json(result.rows);
        }
    });
});


app.get("/clientesMaisConsumiramServicos", (req, res) => {
    const quantidade = req.query.quantidade || 5; // Número padrão de clientes a serem exibidos

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
            res.status(500).json({ error: "Erro ao recuperar os clientes que mais consumiram serviços." });
        } else {
            res.json(result.rows);
        }
    });
});


app.get("/clientesMaisConsumiramProdutosValor", (req, res) => {
    const quantidade = req.query.quantidade || 5; // Número padrão de clientes a serem exibidos

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
            res.status(500).json({ error: "Erro ao recuperar os clientes que mais consumiram produtos em valor." });
        } else {
            res.json(result.rows);
        }
    });
});


app.get("/clientesMaisConsumiramServicosValor", (req, res) => {
    const quantidade = req.query.quantidade || 5; // Número padrão de clientes a serem exibidos

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
            res.status(500).json({ error: "Erro ao recuperar os clientes que mais consumiram serviços em valor." });
        } else {
            res.json(result.rows);
        }
    });
});


app.listen(3001, () => {
    console.log("Servidor rodando!")
})