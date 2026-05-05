// Banco de dados em memória
let pedidos = [];
let proximoCodigo = 1;

const db = {
getAll: () => pedidos,

getById: (codigo) => pedidos.find((p) => p.codigo === codigo),

insert: (pedido) => {
const novoPedido = {
codigo: proximoCodigo++,
dataHora: new Date().toISOString(),
situacao: "aberto",
pedido,
};
pedidos.push(novoPedido);
return novoPedido;
},

updateSituacao: (codigo, situacao) => {
const pedido = pedidos.find((p) => p.codigo === codigo);
if (!pedido) return null;
pedido.situacao = situacao;
return pedido;
},

delete: (codigo) => {
const index = pedidos.findIndex((p) => p.codigo === codigo);
if (index === -1) return false;
pedidos.splice(index, 1);
return true;
},
};

module.exports = db;