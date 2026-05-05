const SITUACOES_VALIDAS = ["aberto", "pago", "finalizado"];

// Validações para criação de pedido (US01)
const validarCriacaoPedido = (req, res, next) => {
const { clienteCpf, clienteNome, produtoNome, produtoPreco } = req.body;
const erros = [];

// [R01] CPF obrigatório
if (!clienteCpf && clienteCpf !== 0) {
erros.push("O CPF do cliente é obrigatório. [R01]");
} else {
// [R02] CPF deve ser numérico e ter 9 algarismos
const cpfStr = String(clienteCpf).trim();
if (!/^\d{9}$/.test(cpfStr)) {
erros.push("O CPF deve ser numérico e possuir exatamente 9 algarismos. [R02]");
}
}

// [R03] Nome do cliente obrigatório
if (!clienteNome || String(clienteNome).trim() === "") {
erros.push("O nome do cliente é obrigatório. [R03]");
} else if (String(clienteNome).trim().length < 5) {
// [R04] Nome do cliente deve ter pelo menos 5 caracteres
erros.push("O nome do cliente deve ter pelo menos 5 caracteres. [R04]");
}

// [R05] Nome do produto obrigatório
if (!produtoNome || String(produtoNome).trim() === "") {
erros.push("O nome do produto é obrigatório. [R05]");
} else if (String(produtoNome).trim().length < 5) {
// [R06] Nome do produto deve ter pelo menos 5 caracteres
erros.push("O nome do produto deve ter pelo menos 5 caracteres. [R06]");
}

// [R07] Preço obrigatório
if (produtoPreco === undefined || produtoPreco === null || produtoPreco === "") {
erros.push("O preço do produto é obrigatório. [R07]");
} else if (typeof produtoPreco !== "number" || produtoPreco <= 0) {
// [R08] Preço deve ser número positivo
erros.push("O preço do produto deve ser um número positivo. [R08]");
}

if (erros.length > 0) {
return res.status(400).json({ erros });
}

next();
};

// Validações de código nos parâmetros de rota
const validarCodigoParam = (req, res, next) => {
const codigo = Number(req.params.codigo);

// [R01] Código obrigatório / [R02] deve ser número
if (!req.params.codigo || isNaN(codigo) || !Number.isInteger(codigo)) {
return res.status(400).json({ erro: "O código do pedido é obrigatório e deve ser um número inteiro. [R01][R02]" });
}

req.codigoParsed = codigo;
next();
};

// Validações para atualização de situação (US04)
const validarAtualizacaoSituacao = (req, res, next) => {
const { situacao } = req.body;

// [R03] Situação obrigatória
if (!situacao || String(situacao).trim() === "") {
return res.status(400).json({ erro: "A situação do pedido é obrigatória. [R03]" });
}

// [R04] Situação só permite valores válidos
if (!SITUACOES_VALIDAS.includes(situacao)) {
return res.status(400).json({
erro: `A situação deve ser um dos valores: ${SITUACOES_VALIDAS.join(", ")}. [R04]`,
});
}

next();
};

// Validação do filtro de situação na listagem (US02)
const validarFiltroSituacao = (req, res, next) => {
const { situacao } = req.query;

if (situacao && !SITUACOES_VALIDAS.includes(situacao)) {
return res.status(400).json({
erro: `A situação deve ser um dos valores: ${SITUACOES_VALIDAS.join(", ")}. [R02]`,
});
}

next();
};

module.exports = {
validarCriacaoPedido,
validarCodigoParam,
validarAtualizacaoSituacao,
validarFiltroSituacao,
};