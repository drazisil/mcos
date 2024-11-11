-- +goose Up
-- +goose StatementBegin

CREATE TABLE
	IF NOT EXISTS part_grade (
		part_grade_id INTEGER NOT NULL,
		e_text VARCHAR(50),
		g_text VARCHAR(50),
		f_text VARCHAR(50),
		part_grade VARCHAR(50),
		CONSTRAINT sys_pk_11985 PRIMARY KEY (part_grade_id)
	);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_11985_11986 ON part_grade (part_grade_id);
-- +goose StatementEnd