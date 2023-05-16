import { log } from "console";
import Empresa from "../modelo/empresa";
import Produto from "../modelo/produto";
import Listagem from "./listagem";
import Servico from "../modelo/servico";

// import Cliente from "../modelo/cliente";
// import Empresa from "../modelo/empresa";
// import Produto from "../modelo/produto";
// import Listagem from "./listagem";

// interface ProdutoConsumido {
//   nome: string;
//   quantidade: number;
// }

// export default class QuantidadeProdutosConsumidos extends Listagem {
//   private empresa = new Empresa();
//   private produtosConsumidos: ProdutoConsumido[] = [];

//   constructor(empresa: Empresa) {
//     super();
//     this.empresa = empresa;
//   }

//   public listar(): void {
//     console.log(`\nLista de produtos mais consumidos:`);

//     this.empresa.getProdutos.forEach((produto: Produto) => {
//       const produtoConsumidoIndex = this.produtosConsumidos.findIndex(
//         (produtoConsumido) => produtoConsumido.nome === produto.nome
//       );
//       if (produtoConsumidoIndex === -1) {
//         this.produtosConsumidos.push({
//           nome: produto.nome,
//           quantidade: produto.quantidadeConsumida,
//         });
//       } else {
//         this.produtosConsumidos[produtoConsumidoIndex].quantidade +=
//           produto.quantidadeConsumida;
//       }
//     });

//     this.empresa.getClientes.forEach((cliente) => {
//       cliente.getProdutosConsumidos.forEach((produtoIndividual) => {
//         const produtoConsumidoIndex = this.produtosConsumidos.findIndex(
//           (produtoConsumido) => produtoConsumido.nome === produtoIndividual.nome
//         );
//         if (produtoConsumidoIndex !== -1) {
//           this.produtosConsumidos[produtoConsumidoIndex].quantidade += 1;
//         }
//       });
//     });

//     this.produtosConsumidos.sort(
//       (produtoA, produtoB) => produtoB.quantidade - produtoA.quantidade
//     );

//     this.produtosConsumidos.forEach((produto, index) => {
//       console.log(
//         `Posição ${index + 1}:   Produto consumido: ${
//           produto.nome
//         } | Quantidade consumida: ${produto.quantidade}`
//       );
//       console.log(`--------------------------------------`);
//       console.log(`\n`);
//     });

//     this.produtosConsumidos = [];
//   }
// }


// import Cliente from "../modelo/cliente";
// import Empresa from "../modelo/empresa";
// import Produto from "../modelo/produto";
// import Listagem from "./listagem";

// export default class QuantidadeProdutosConsumidos extends Listagem {
//   private empresa = new Empresa();
//   constructor(empresa: Empresa) {
//     super();
//     this.empresa = empresa;
//   }
//   public listar(): void {
//     console.log(`\nLista de produtos mais consumidos:`);
//     this.empresa.getProdutos.forEach((produto: Produto) => {
//       this.empresa.qntdProdutosTotal.push({
//         nome: produto.nome,
//         quantidade: produto.quantidadeConsumida,
//       });
//     });

//     //contando quantidade de produtos de cada cliente

//     this.empresa.getClientes.forEach((cliente) => {
//       this.empresa.qntdProdutosTotal.forEach((produtoGeral) => {
//         if (
//           cliente.getProdutosConsumidos.some(
//             (produtoIndividual) => produtoIndividual.nome === produtoGeral.nome
//           )
//         ) {
//           produtoGeral.quantidade += 1;
//         }
//       });
//     });

//     //listando a quantidade de consumo de cada produto
//     // this.empresa.qntdProdutosTotal.forEach((produto) => {
//     //   console.log(
//     //     `Produto consumido: ${produto.nome} | Quantidade consumida: ${produto.quantidade}`
//     //   );
//     //   console.log(`--------------------------------------`);
//     //   console.log(`\n`);
//     // });

//     //ordenando o consumo de produtos por ordem descrescente
//     this.empresa.qntdProdutosTotal.forEach((produto, index) => {
//       console.log(
//         `Posição ${index + 1}:   Produto consumido: ${
//           produto.nome
//         } | Quantidade consumida: ${produto.quantidade}`
//       );
//       console.log(`--------------------------------------`);
//       console.log(`\n`);
//     });
//     // while (this.empresa.qntdProdutosTotal.length > 0) {
//     //   this.empresa.qntdProdutosTotal.pop();
//     // }
//   }
// }

// import Cliente from "../modelo/cliente";
// import Empresa from "../modelo/empresa";
// import Produto from "../modelo/produto";
// import Listagem from "./listagem";

// export default class QuantidadeProdutosConsumidos extends Listagem {
//   private empresa = new Empresa();
//   constructor(empresa: Empresa) {
//     super();
//     this.empresa = empresa;
//   }
//   public listar(): void {
//     console.log(`\nLista de produtos mais consumidos:`);

//     const produtosContagem = new Map<string, number>(); // Map para armazenar a contagem dos produtos

//     this.empresa.getClientes.forEach((cliente) => {
//       cliente.getProdutosConsumidos.forEach((produtoIndividual) => {
//         const nomeProduto = produtoIndividual.nome;

//         // Atualiza a contagem do produto ou adiciona uma nova entrada no Map
//         produtosContagem.set(nomeProduto, (produtosContagem.get(nomeProduto) || 0) + 1);
//       });
//     });

//     // Cria um array com os objetos { nome: string, quantidade: number } para facilitar a ordenação
//     const listaOrdenada = Array.from(produtosContagem, ([nome, quantidade]) => ({ nome, quantidade }));

//     // Ordena a lista em ordem decrescente de quantidade
//     listaOrdenada.sort((a, b) => b.quantidade - a.quantidade);

//     // Exibe os produtos com a quantidade mais recente
//     listaOrdenada.forEach((produto, index) => {
//       console.log(`Posição ${index + 1}:   Produto consumido: ${produto.nome} | Quantidade consumida: ${produto.quantidade}`);
//       console.log(`--------------------------------------`);
//       console.log(`\n`);
//     });
//   }
// }


export default class ListagemProdutosEServicosMaisConsumidosTop extends Listagem {
  private empresa = new Empresa();
  constructor(empresa: Empresa) {
    super();
    this.empresa = empresa;
  }
  public listar(): void {
    console.log(`\nLista dos produtos e serviços mais consumidos:`);

    var listinhaPaiaProduto = this.empresa.getProdutos
    var listinhaPaiaServico = this.empresa.getServicos

    var listaBala: (Produto | Servico)[] = []
    listinhaPaiaProduto.forEach(produto=>{
      listaBala.push(produto)
    })
    listinhaPaiaServico.forEach(servico=>{
      listaBala.push(servico)
    })

var listaBalaOrdenada = listaBala.sort(function(a,b){
  return(
    b.quantidadeConsumida - a.quantidadeConsumida
  )
})
      function listarProdutosServicosMaisConsumidos(): void {
        var cont = 0
        listaBalaOrdenada.forEach((ps) => {
          cont += 1
          console.log(`${cont}º ${ps.tipo}`);
          console.log(`O ${ps.tipo}: ${ps.nome} foi consumido ${ps.quantidadeConsumida} vezes`)
      })
    }

  
  //     var listinhaPaia = this.empresa.getProdutos
  //     var listaProdutosOrdenada = listinhaPaia.sort(function (a, b) {
  //       return (
  //         b.quantidadeConsumida -
  //         a.quantidadeConsumida
  //       );
  //     });

  //     function listarProdutosMaisConsumidos(): void {
  //       var cont = 0
  //       listaProdutosOrdenada.forEach((produto) => {
  //         cont += 1
  //         console.log(`${cont}º produto`);
  //         console.log(`O Produto: ${produto.nome} foi consumido ${produto.quantidadeConsumida} vezes`)
  //     })
  //   }
  listarProdutosServicosMaisConsumidos()
  // }}


  }}
    //     this.produtos.forEach( produto =>{
    //         console.log(`Nome do produto: ${produto.nome}`);
    //     })

    //     // for(let i = 0; i< this.produtos.length; i++){
    //     //     let produto = this.produtos[i]
    //     //     console.log(`Nome do produto: ${produto.nome}`);

    //     // }
    //     // console.log('---------------------------------------');

    //     // this.produtos.forEach(produto => {
    //     //     console.log(`Nome: ` + produto.nome);
    //     //     console.log(`--------------------------------------`);
    //     // });
    //     console.log(`\n`);
    // }
