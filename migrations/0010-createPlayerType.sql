-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS player_type (
		player_type_id INTEGER NOT NULL,
		player_type VARCHAR(100) NOT NULL,
		CONSTRAINT sys_pk_12040 PRIMARY KEY (player_type_id)
	);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_12040_12041 ON player_type (player_type_id);

-- +goose StatementEnd