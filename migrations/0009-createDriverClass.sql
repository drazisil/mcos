-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS driver_class (
		driver_class_id SMALLINT NOT NULL,
		driver_class VARCHAR(50),
		CONSTRAINT sys_pk_11831 PRIMARY KEY (driver_class_id)
	);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_11831_11832 ON driver_class (driver_class_id);
-- +goose StatementEnd