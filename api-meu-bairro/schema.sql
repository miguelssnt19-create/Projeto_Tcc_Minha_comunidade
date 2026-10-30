-- =====================================================================
--  Minha Comunidade (Meu Bairro) - Schema MySQL 8+
--  Uso:  mysql -u root -p < schema.sql
-- =====================================================================
CREATE DATABASE IF NOT EXISTS meu_bairro
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE meu_bairro;

-- ---------------------------------------------------------------------
-- BAIRROS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bairros (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome       VARCHAR(120) NOT NULL,
  cidade     VARCHAR(120) NULL,
  uf         CHAR(2)      NULL,
  criado_em  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_bairro (nome, cidade, uf)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- USUARIOS  (telas: cadastrar.html / entrar.html)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome          VARCHAR(100) NOT NULL,
  email         VARCHAR(160) NOT NULL,
  senha_hash    VARCHAR(255) NOT NULL,                       -- bcrypt
  papel         ENUM('morador','moderador','admin') NOT NULL DEFAULT 'morador',
  bairro_id     INT UNSIGNED NULL,
  criado_em     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_email (email),
  CONSTRAINT fk_usuarios_bairro FOREIGN KEY (bairro_id) REFERENCES bairros(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- PROBLEMAS  (tela: problemas.html)
-- mapa_x / mapa_y = posição no SVG do mapa (viewBox 1400x900), opcional
-- usuario_id NULL = relato anônimo (o formulário não exige login)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS problemas (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id    INT UNSIGNED NULL,
  bairro_id     INT UNSIGNED NOT NULL,
  titulo        VARCHAR(100)  NOT NULL,
  localizacao   VARCHAR(160)  NOT NULL,
  descricao     VARCHAR(2000) NOT NULL,
  contato       VARCHAR(120)  NULL,
  mapa_x        DECIMAL(7,2)  NULL,
  mapa_y        DECIMAL(7,2)  NULL,
  latitude      DECIMAL(10,7) NULL,
  longitude     DECIMAL(10,7) NULL,
  status        ENUM('aberto','em_analise','resolvido','rejeitado') NOT NULL DEFAULT 'aberto',
  criado_em     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_problemas_bairro_status (bairro_id, status, criado_em),
  CONSTRAINT fk_problemas_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  CONSTRAINT fk_problemas_bairro  FOREIGN KEY (bairro_id)  REFERENCES bairros(id)  ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- SUGESTOES  (tela: sugestoes.html)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sugestoes (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id    INT UNSIGNED NULL,
  bairro_id     INT UNSIGNED NOT NULL,
  titulo        VARCHAR(100)  NOT NULL,
  descricao     VARCHAR(2000) NOT NULL,
  localizacao   VARCHAR(160)  NULL,
  beneficio     VARCHAR(300)  NULL,
  contato       VARCHAR(120)  NULL,
  mapa_x        DECIMAL(7,2)  NULL,
  mapa_y        DECIMAL(7,2)  NULL,
  latitude      DECIMAL(10,7) NULL,
  longitude     DECIMAL(10,7) NULL,
  status        ENUM('nova','em_analise','aprovada','rejeitada') NOT NULL DEFAULT 'nova',
  criado_em     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sugestoes_bairro_status (bairro_id, status, criado_em),
  CONSTRAINT fk_sugestoes_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  CONSTRAINT fk_sugestoes_bairro  FOREIGN KEY (bairro_id)  REFERENCES bairros(id)  ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- EVENTOS  (tela: eventos.html - "Próximos eventos")
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS eventos (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id    INT UNSIGNED NULL,
  bairro_id     INT UNSIGNED NOT NULL,
  titulo        VARCHAR(120)  NOT NULL,
  descricao     VARCHAR(2000) NULL,
  local         VARCHAR(160)  NOT NULL,
  data_inicio   DATETIME      NOT NULL,
  data_fim      DATETIME      NULL,
  latitude      DECIMAL(10,7) NULL,
  longitude     DECIMAL(10,7) NULL,
  criado_em     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_eventos_bairro_data (bairro_id, data_inicio),
  CONSTRAINT fk_eventos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  CONSTRAINT fk_eventos_bairro  FOREIGN KEY (bairro_id)  REFERENCES bairros(id)  ON DELETE CASCADE,
  CONSTRAINT ck_eventos_datas CHECK (data_fim IS NULL OR data_fim >= data_inicio)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- LOCAIS_IMPORTANTES  (tela: mapa.html - praça, escola, posto, mercado...)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS locais_importantes (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  bairro_id  INT UNSIGNED NOT NULL,
  nome       VARCHAR(120) NOT NULL,
  subtitulo  VARCHAR(120) NULL,
  tipo       ENUM('praca','escola','saude','comercio','esporte','outro') NOT NULL DEFAULT 'outro',
  mapa_x     DECIMAL(7,2) NOT NULL,
  mapa_y     DECIMAL(7,2) NOT NULL,
  criado_em  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_locais_bairro (bairro_id),
  CONSTRAINT fk_locais_bairro FOREIGN KEY (bairro_id) REFERENCES bairros(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
--  DADOS INICIAIS (iguais aos do mapa ilustrativo)
-- =====================================================================
INSERT INTO bairros (id, nome, cidade, uf) VALUES (1, 'Vila Esperança', 'São Paulo', 'SP')
  ON DUPLICATE KEY UPDATE nome = VALUES(nome);

INSERT INTO locais_importantes (bairro_id, nome, subtitulo, tipo, mapa_x, mapa_y) VALUES
  (1, 'Praça Central',    NULL,           'praca',    650,  395),
  (1, 'Escola Municipal', 'Municipal',    'escola',   1175, 346),
  (1, 'Posto de Saúde',   'Unidade Vila', 'saude',    192,  435),
  (1, 'Mercado do Bairro','Do Bairro',    'comercio', 1185, 762),
  (1, 'Quadra Esportiva', 'Esportiva',    'esporte',  612,  772);

INSERT INTO problemas (bairro_id, titulo, localizacao, descricao, mapa_x, mapa_y) VALUES
  (1, 'Buraco na Rua das Flores', 'Rua das Flores, próximo ao nº 120',
      'Buraco grande no meio da rua, dificultando a passagem de carros e pedestres.', 170, 265);

INSERT INTO sugestoes (bairro_id, titulo, descricao, beneficio, mapa_x, mapa_y) VALUES
  (1, 'Sugestão de mais árvores', 'Plantar árvores nativas ao longo da Rua do Sol.', 'Mais sombra e ar mais limpo para todos.', 835, 145),
  (1, 'Instalar mais lixeiras',   'Colocar lixeiras seletivas próximas à Quadra Esportiva.', 'Bairro mais limpo.', 850, 735);

INSERT INTO eventos (bairro_id, titulo, descricao, local, data_inicio) VALUES
  (1, 'Mutirão de limpeza', 'Venha ajudar a limpar a praça. Luvas e sacos serão fornecidos.', 'Praça Central',
      DATE_ADD(CURDATE(), INTERVAL 7 DAY) + INTERVAL 9 HOUR);
