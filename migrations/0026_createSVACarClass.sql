-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS sva_car_class (
		sva_car_class INTEGER DEFAULT 0 NOT NULL,
		description VARCHAR(50),
		CONSTRAINT sys_pk_12175 PRIMARY KEY (sva_car_class)
	);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_12175_12176 ON sva_car_class (sva_car_class);
-- +goose StatementEnd