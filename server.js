const express = require("express");
const pedidosRoutes = require("./routes/pedidosRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
res.json({ mensagem: "API de Pedidos - MVP", versao: "1.0.0" });
});

// Rotas de pedidos
app.use("/pedidos", pedidosRoutes);

// Handler para rotas não encontradas
app.use((req, res) => {
res.status(404).json({ erro: "Rota não encontrada." });
});

// Handler global de erros
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ erro: "Erro interno do servidor." });
});

app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
console.log(`Acesse: http://localhost:${PORT}`);
});
