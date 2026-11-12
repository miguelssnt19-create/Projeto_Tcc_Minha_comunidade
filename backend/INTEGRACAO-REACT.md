# React + API

O React usa Axios configurado em `src/services/api.js` para chamar `http://localhost:5000/api`.

1. Inicie o MySQL.
2. Inicie a API na pasta `api-meu-bairro` com `npm run dev`.
3. Inicie o React na pasta `react-minha-comunidade` com `npm install` e `npm start`.
4. Teste cadastrar/entrar, enviar problema/sugestão, abrir Eventos e Mapa.

Os formulários de problema e sugestão enviam POST para `/problemas` e `/sugestoes`. Cadastro e login usam `/auth/cadastro` e `/auth/login`. A tela de eventos lê `/eventos`; o mapa lê `/mapa`.

A API usa o bairro inicial `bairro_id: 1` (Vila Esperança), que é inserido pelo `schema.sql`. Para usar outro bairro, altere o `bairro_id` enviado pelo React.
