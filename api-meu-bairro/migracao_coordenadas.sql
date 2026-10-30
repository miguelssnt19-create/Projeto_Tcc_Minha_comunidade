USE meu_bairro;

-- Execute este arquivo UMA VEZ se o banco meu_bairro já foi criado com o schema antigo.
ALTER TABLE problemas
  ADD COLUMN latitude DECIMAL(10,7) NULL,
  ADD COLUMN longitude DECIMAL(10,7) NULL;

ALTER TABLE sugestoes
  ADD COLUMN localizacao VARCHAR(160) NULL,
  ADD COLUMN latitude DECIMAL(10,7) NULL,
  ADD COLUMN longitude DECIMAL(10,7) NULL;

ALTER TABLE eventos
  ADD COLUMN latitude DECIMAL(10,7) NULL,
  ADD COLUMN longitude DECIMAL(10,7) NULL;
