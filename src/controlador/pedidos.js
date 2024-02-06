const knex = require("../banco/conexao");



const listarPedidos = async (req, res) => {
    const { client_id } = req.body;
    try {
        if (client_id) {
            const clientIdTabela = await knex("pedidos")
                .where("id", client_id)
                .first();

            if (!clientIdTabela) {
                return res
                    .status(404)
                    .json({ mensagem: "O cliente informado não existe." });
            }

            const pedidos = await knex
                .select()
                .from("pedidos")
                .where("client_id", client_id);

            return res.status(200).json(pedidos);
        } else {
            const pedidos = await knex.select().from("pedidos");

            return res.status(200).json(pedidos);
        }
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};


module.exports = {
    listarPedidos,
};