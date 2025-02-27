-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS part_type (
		part_type_id INTEGER NOT NULL,
		abstract_part_type_id INTEGER NOT NULL,
		part_type VARCHAR(100) NOT NULL,
		part_filename VARCHAR(20),
		part_grade_id INTEGER,
		CONSTRAINT sys_pk_11991 PRIMARY KEY (part_type_id),
		CONSTRAINT parttype_abstractparttypeparttype FOREIGN KEY (abstract_part_type_id) REFERENCES abstract_part_type (abstract_part_type_id),
		CONSTRAINT parttype_partgradeparttype FOREIGN KEY (part_grade_id) REFERENCES part_grade (part_grade_id)
	);

CREATE INDEX if not exists sys_idx_parttype_abstractparttypeparttype_12453 ON part_type (abstract_part_type_id);

CREATE INDEX if not exists sys_idx_parttype_partgradeparttype_12463 ON part_type (part_grade_id);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_11991_11992 ON part_type (part_type_id);
-- +goose StatementEnd