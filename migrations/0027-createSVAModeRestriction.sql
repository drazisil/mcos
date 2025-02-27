-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	if not exists sva_mode_restriction (
		sva_mode_restriction INTEGER DEFAULT 0 NOT NULL,
		description VARCHAR(100),
		CONSTRAINT sys_pk_12180 PRIMARY KEY (sva_mode_restriction)
	);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_12180_12181 ON sva_mode_restriction (sva_mode_restriction);
-- +goose StatementEnd