const joi = require("joi");

const numberPositive = joi.number().positive().messages({
  "number.positive": "O campo deve ser um número positivo",
  "number.base": "O campo deve ser um número"
});

const schemaProdutos = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório"
  }),

  quantidade_estoque: numberPositive,
  valor: joi.number().positive().precision(2).required().messages({
    "number.positive": "O campo deve ser um número positivo",
    "number.base": "O campo deve ser um número",
    "number.precision":
      "O campo deve ter até dois dígitos após o ponto decimal"
  }),
  categoria_id: numberPositive

  /* ativo: joi.boolean().messages({
    "boolean.base": "O campo ativo precisa ser um booleano",
  }), */
});

module.exports = schemaProdutos;
