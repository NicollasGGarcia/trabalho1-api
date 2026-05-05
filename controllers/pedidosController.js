const db = require("../db");

// US01 – Inclusão de um novo pedido
const criarPedido = (req, res) => {
const { clienteCpf, clienteNome, produtoNome, produtoPreco } = req.body;

const novoPedido = db.insert({
clienteCpf: String(clienteCpf).trim(),
clienteNome: String(clienteNome).trim(),
produtoNome: String(produtoNome).trim(),
produtoPreco: Number(produtoPreco),
});

return res.status(201).json(novoPedido);
};

// US02 – Listagem de pedidos
const listarPedidos = (req, res) => {
const { situacao } = req.query;

let pedidos = db.getAll();

// [R01] Filtro opcional por situação
if (situacao) {
pedidos = pedidos.filter((p) => p.situacao === situacao);
}

// [R03] Campos a exibir na listagem
const resultado = pedidos.map((p) => ({
codigo: p.codigo,
dataHora: p.dataHora,
clienteNome: p.clienteNome,
produtoNome: p.produtoNome,
situacao: p.situacao,
valorTotal: p.produtoPreco,
}));

return res.status(200).json(resultado);
};

// US03 – Consulta de um pedido
const consultarPedido = (req, res) => {
const pedido = db.getById(req.codigoParsed);

if (!pedido) {
return res.status(404).json({ erro: "Pedido não encontrado." });
}

// [R03] Campos a exibir na consulta
const resultado = {
codigo: pedido.codigo,
dataHora: pedido.dataHora,
clienteCpf: pedido.clienteCpf,
clienteNome: pedido.clienteNome,
produtoNome: pedido.produtoNome,
situacao: pedido.situacao,
valorTotal: pedido.produtoPreco,
};

return res.status(200).json(resultado);
};

// US04 – Atualizar a situação de um pedido
const atualizarSituacao = (req, res) => {
const { situacao } = req.body;

const pedido = db.updateSituacao(req.codigoParsed, situacao);

if (!pedido) {
return res.status(404).json({ erro: "Pedido não encontrado." });
}

return res.status(200).json(pedido);
};

// US05 – Deletar um pedido
const deletarPedido = (req, res) => {
const removido = db.delete(req.codigoParsed);

if (!removido) {
return res.status(404).json({ erro: "Pedido não encontrado." });
}

return res.status(200).json({ mensagem: "Pedido removido com sucesso." });
};

module.exports = {
criarPedido,
listarPedidos,
consultarPedido,
atualizarSituacao,
deletarPedido,
};