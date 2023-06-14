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
                    const clienteID = result.rows[0].ClienteID;
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
                "SELECT TelefoneDDD, TelefoneNumero FROM ClienteTelefone WHERE ClienteID = $1",
                [clienteID],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        const telefones = result.rows;
                        callback(null, telefones);
                    }
                }
            );
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

//Consumir produto e Serviço
function recuperarClienteServicoPetID(clienteCPF, nomeServico, nomePet, callback) {
    cliente.query(
        `SELECT c.ClienteID, s.ServicoID, pt.PetID
      FROM Cliente c
      JOIN ServicoConsumidosCliente sc ON c.ClienteID = sc.ClienteID
      JOIN Servico s ON sc.ServicoID = s.ServicoID
      JOIN Pets pt ON sc.PetID = pt.PetID
      WHERE c.ClienteCPF = $1 AND s.ServicoNome = $2 AND pt.PetNome = $3`,
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



function recuperarClienteProdutoPetID(clienteCPF, nomeProduto, nomePet, callback) {
    cliente.query(
        `SELECT c.ClienteID, p.ProdutoID, pt.PetID
      FROM Cliente c
      JOIN ProdutosConsumidosCliente pc ON c.ClienteID = pc.ClienteID
      JOIN Produto p ON pc.ProdutoID = p.ProdutoID
      JOIN Pets pt ON pc.PetID = pt.PetID
      WHERE c.ClienteCPF = $1 AND p.ProdutoNome = $2 AND pt.PetNome = $3`,
        [clienteCPF, nomeProduto, nomePet],
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



function consumirProduto(clienteCpf, nomeProduto, nomePet, callback) {
    recuperarClienteProdutoPetID(clienteCpf, nomeProduto, nomePet, (err, result) => {
        if (err) {
            callback(err);
        } else {
            const clienteID = result[0].ClienteID;
            const produtoID = result[0].ProdutoID;
            const petID = result[0].PetID;

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
    });
}

function consumirServico(clienteCpf, nomeServico, nomePet, callback) {
    recuperarClienteServicoPetID(clienteCpf, nomeServico, nomePet, (err, result) => {
        if (err) {
            callback(err);
        } else {
            const clienteID = result[0].ClienteID;
            const servicoID = result[0].ServicoID;
            const petID = result[0].PetID;

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
    });
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
    cliente.query('SELECT * FROM Servico', (err, result) => {
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


function listarProdutosMaisConsumidosPorRaca(racaPet, callback) {
    cliente.query(
        `SELECT p.ProdutoNome, COUNT(*) AS Quantidade
      FROM Produto p
      JOIN ProdutosConsumidosCliente pc ON p.ProdutoID = pc.ProdutoID
      JOIN Pets pt ON pc.PetID = pt.PetID
      WHERE pt.PetRaca = $1
      GROUP BY p.ProdutoNome
      ORDER BY Quantidade DESC`,
        [racaPet],
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


function listarProdutosMaisConsumidosPorTipoPet(tipoPet, callback) {
    cliente.query(
        `SELECT p.ProdutoNome, COUNT(*) AS Quantidade
      FROM Produto p
      JOIN ProdutosConsumidosCliente pc ON p.ProdutoID = pc.ProdutoID
      JOIN Pets pt ON pc.PetID = pt.PetID
      WHERE pt.PetTipo = $1
      GROUP BY p.ProdutoNome
      ORDER BY Quantidade DESC`,
        [tipoPet],
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


function listarServicosMaisConsumidosPorTipoPet(tipoPet, callback) {
    cliente.query(
        `SELECT s.ServicoNome, COUNT(*) AS Quantidade
      FROM Servico s
      JOIN ServicosConsumidosCliente sc ON s.ServicoID = sc.ServicoID
      JOIN Pets p ON sc.PetID = p.PetID
      WHERE p.PetTipo = $1
      GROUP BY s.ServicoNome
      ORDER BY Quantidade DESC`,
        [tipoPet],
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

function cadastrarPetPorCpf(nomePet, tipoPet, petRaca, petgenero, clienteCPF, callback) {
    obterClienteIDPorCPF(clienteCPF, (err, clienteID) => {
        if (err) {
            callback(err);
        } else {
            cliente.query(
                'INSERT INTO Pets (PetNome, PetTipo, petraca, petgenero, ClienteID) VALUES ($1, $2, $3, $4)',
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
                'INSERT INTO Telefone (DDD, Numero, ClienteID) VALUES ($1, $2, $3)',
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


app.get("/produtosMaisConsumidos", (req, res) => {
    listarProdutosMaisConsumidos((err, produtos) => {
        if (err) {
            res.status(500).json({ error: "Erro ao listar produtos mais consumidos" });
        } else {
            res.json(produtos);
        }
    });
});


app.post('/cadastrarTelefone', (req, res) => {
    const { ddd, numero, clienteCPF } = req.body;

    cadastrarTelefonePorCPF(ddd, numero, clienteCPF, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao cadastrar telefone' });
        } else {
            res.json({ message: 'Telefone cadastrado com sucesso' });
        }
    });
});


app.post("/cadastrarPetPorCPF", (req, res) => {
    const { nomePet, tipoPet, petRaca, petGenero, clienteCPF } = req.body;

    cadastrarPetPorCpf(nomePet, tipoPet, petRaca, petGenero, clienteCPF, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao cadastrar o pet" });
        } else {
            res.json({ message: "Pet cadastrado com sucesso" });
        }
    });
});



app.get("/servicosMaisConsumidosPorRaca", (req, res) => {
    const { raca } = req.body;

    listarServicosMaisConsumidosPorRaca(raca, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao obter os serviços mais consumidos por raça" });
        } else {
            res.json(result);
        }
    });
});


app.get("/servicosMaisConsumidosPorTipoPet/:tipoPet", (req, res) => {
    const tipoPet = req.params.tipoPet;

    listarServicosMaisConsumidosPorTipoPet(tipoPet, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao listar serviços mais consumidos por tipo de pet" });
        } else {
            res.json(result);
        }
    });
});


app.get('/produtosMaisConsumidosPorTipoPet', (req, res) => {
    const { tipoPet } = req.body;

    listarProdutosMaisConsumidosPorTipoPet(tipoPet, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao listar produtos mais consumidos por tipo de pet' });
        } else {
            res.json(result);
        }
    });
});

app.get('/produtosMaisConsumidosPorRaca', (req, res) => {
    const { raca } = req.body;

    listarProdutosMaisConsumidosPorRaca(raca, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao listar produtos mais consumidos por raça' });
        } else {
            res.json(result);
        }
    });
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

app.get('/servicos', (req, res) => {
    listarServicos((err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao listar os serviços' });
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
    const { cpf } = req.body;

    listarPetsPorCPF(cpf, (err, pets) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao listar os pets" });
        } else {
            res.json(pets);
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
//Final ConsumirProdutoServico


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
            res.status(500).json({ error: "Erro ao recuperar os clientes que mais consumiram produtos." });
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
            res.status(500).json({ error: "Erro ao recuperar os clientes que mais consumiram serviços." });
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
            res.status(500).json({ error: "Erro ao recuperar os clientes que mais consumiram produtos em valor." });
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
            res.status(500).json({ error: "Erro ao recuperar os clientes que mais consumiram serviços em valor." });
        } else {
            res.json(result.rows);
        }
    });
});


app.listen(3001, () => {
    console.log("Servidor rodando!")
})