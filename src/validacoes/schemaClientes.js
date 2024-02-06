const joi = require("joi");

const schemaClientes = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório"
  }),

  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório"
  }),

  cpf: joi
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .message("O campo deve ser um CPF válido")
    .required()
    .messages({
      "any.required": "O campo CPF é obrigatório",
      "string.empty": "O campo CPF é obrigatório"
    })
});

module.exports = schemaClientes;
