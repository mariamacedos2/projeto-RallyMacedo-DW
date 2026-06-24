export async function errorHandler(
  error,
  request,
  reply
) {

  if (error.statusCode) {

    return reply
      .status(error.statusCode)
      .send({
        message: error.message
      });
  }

  console.error(error);

  return reply.status(500).send({
    message:
      "Erro interno do servidor"
  });
}