# Minha Comunidade — instalação da API

## 1. Requisitos
- Node.js 18 ou mais recente
- MySQL e MySQL Workbench (ou outro cliente MySQL)

## 2. Configurar o banco
Se ainda não criou o banco, abra e execute o arquivo `schema.sql` no MySQL Workbench.

Se você já tinha criado o banco `meu_bairro` usando a versão anterior do schema, execute **uma única vez** o arquivo `migracao_coordenadas.sql`. Ele adiciona as colunas necessárias para salvar coordenadas geográficas. Não execute a migração duas vezes.

## 3. Configurar a API
1. Abra a pasta `api-meu-bairro` no VS Code.
2. No terminal, execute `npm install`.
3. Copie `.env.example` para um arquivo chamado `.env`.
4. Confira `DB_USER`, `DB_PASSWORD` e `DB_NAME` no `.env` de acordo com o seu MySQL. O banco padrão é `meu_bairro`.
5. Troque `JWT_SECRET` por uma chave longa e exclusiva.
6. Inicie com `npm run dev`.

A API deve informar que está rodando em `http://localhost:5000`. Teste no navegador `http://localhost:5000/api/saude`. Se aparecer `{"ok":true,"mensagem":"API e banco conectados."}`, a conexão com o banco está funcionando.

## 4. Coordenadas no mapa
Ao enviar um problema ou uma sugestão com localização, a API tenta converter o endereço em latitude/longitude usando Nominatim/OpenStreetMap. A busca pode não encontrar endereços incompletos ou fictícios; nesses casos, o registro continua sendo salvo, mas não aparece como marcador no mapa. A geocodificação acontece apenas no envio, não a cada atualização do mapa.
