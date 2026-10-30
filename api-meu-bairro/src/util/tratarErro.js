export function tratarErro(erro, _req, res, _next) {
  console.error(erro);
  const status = erro.status || 500;
  res.status(status).json({
    erro: status === 500 ? 'Erro interno do servidor.' : erro.message
  });
}

export function criarErro(mensagem, status = 400) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

export function executar(funcao) {
  return (req, res, next) => Promise.resolve(funcao(req, res, next)).catch(next);
}
