import jwt from 'jsonwebtoken';

export function usuarioOpcional(req, _res, next) {
  const cabecalho = req.headers.authorization;
  if (cabecalho?.startsWith('Bearer ')) {
    try {
      req.usuario = jwt.verify(cabecalho.slice(7), process.env.JWT_SECRET);
    } catch {

    }
  }
  next();
}

export function usuarioObrigatorio(req, _res, next) {
  const cabecalho = req.headers.authorization;
  if (!cabecalho?.startsWith('Bearer ')) {
    return next(Object.assign(new Error('Faça login para realizar esta ação.'), { status: 401 }));
  }
  try {
    req.usuario = jwt.verify(cabecalho.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    next(Object.assign(new Error('Sessão inválida. Entre novamente.'), { status: 401 }));
  }
}
