-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS skin_type (
		skin_type_id INTEGER NOT NULL,
		skin_type VARCHAR(100),
		CONSTRAINT sys_pk_12138 PRIMARY KEY (skin_type_id)
	);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_12138_12139 ON skin_type (skin_type_id);
-- +goose StatementEnd