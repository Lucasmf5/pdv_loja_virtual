const express = require("express");
const validarCorpoRequisicao = require("./intermediario/validarCorpoRequisicao");
const schemaUsuario = require("./validacoes/schemaUsuarios");
const schemaProdutos = require("./validacoes/schemaProdutos");
const schemaClientes = require("./validacoes/schemaClientes");

const {
  verificarEnvioEmailSenha,
} = require("./intermediario/enviado");

const {
  verificarExisteEmailUsuario,
  verificarExisteEmailCliente,
} = require("./intermediario/existe");

const {
  verificarNaoEnviadoBody,
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
} = require("./intermediario/nao-enviado");


const {
  cadastrarUsuario,
  login,
  infoUsuario,
  atualizarUsuario,
} = require("./controlador/usuarios");

const {
  cadastrarProduto,
  atualizarProduto,
  listarProdutos,
  detalharProduto,
  excluirProduto,
} = require("./controlador/produtos");

const listarCategorias = require("./controlador/categorias");

const {
  cadastrarCliente,
  atualizarCliente,
  listarClientes,
  detalharCliente,
} = require("./controlador/clientes");

const {
  listarPedidos,
} = require("./controlador/pedidos");

const verificarUsuarioLogado = require("./intermediario/verificaLogin");

const rotas = express();

rotas.post(
  "/usuario",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarExisteEmailUsuario,
  validarCorpoRequisicao(schemaUsuario),
  cadastrarUsuario
);
rotas.post(
  "/login",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarEnvioEmailSenha,
  verificarExisteEmailUsuario,
  validarCorpoRequisicao(schemaUsuario),
  login
);
rotas.get("/categoria", listarCategorias);

rotas.use(verificarUsuarioLogado);

rotas.get(
  "/usuario",
  verificarNaoEnviadoBody,
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  infoUsuario
);
rotas.put(
  "/usuario",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarExisteEmailUsuario,
  validarCorpoRequisicao(schemaUsuario),
  atualizarUsuario
);
rotas.post(
  "/produto",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  validarCorpoRequisicao(schemaProdutos),
  cadastrarProduto
);

rotas.put(
  "/produto/:id",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  validarCorpoRequisicao(schemaProdutos),
  atualizarProduto
);

rotas.get(
  "/produto/:id",
  verificarNaoEnviadoBody,
  verificarNaoEnviadoQuery,
  detalharProduto
);

rotas.get(
  "/produto",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  listarProdutos
);

rotas.delete("produto/:id", excluirProduto);

rotas.post(
  "/cliente",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarExisteEmailCliente,
  validarCorpoRequisicao(schemaClientes),
  cadastrarCliente
);

rotas.put(
  "/cliente/:id",
  verificarNaoEnviadoQuery,
  verificarExisteEmailCliente,
  validarCorpoRequisicao(schemaClientes),
  atualizarCliente
);

rotas.get(
  "/cliente",
  verificarNaoEnviadoBody,
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  listarClientes
);

rotas.get(
  "/cliente/:id",
  verificarNaoEnviadoBody,
  verificarNaoEnviadoQuery,
  detalharCliente
);

rotas.get(
  "/pedido",
  listarPedidos
);
rotas.get(
  "/pedido/:id",
  listarPedidos
);

module.exports = rotas;
