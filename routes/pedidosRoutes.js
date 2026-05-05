const express = require("express");
const router = express.Router();

const {
criarPedido,
listarPedidos,
consultarPedido,
atualizarSituacao,
deletarPedido,
} = require("../controllers/pedidosController");

const {
validarCriacaoPedido,
validarCodigoParam,
validarAtualizacaoSituacao,
validarFiltroSituacao,
} = require("../middlewares/validacoes");

// US01 – Inclusão de um novo pedido
router.post("/", validarCriacaoPedido, criarPedido);

// US02 – Listagem de pedidos (com filtro opcional por situação)
router.get("/", validarFiltroSituacao, listarPedidos);

// US03 – Consulta de um pedido
router.get("/:codigo", validarCodigoParam, consultarPedido);

// US04 – Atualizar a situação de um pedido
router.patch("/:codigo/situacao", validarCodigoParam, validarAtualizacaoSituacao, atualizarSituacao);

// US05 – Deletar um pedido
router.delete("/:codigo", validarCodigoParam, deletarPedido);

module.exports = router;