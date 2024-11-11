-- +goose Up
CREATE TABLE
	if not exists attachment_point (
		attachment_point_id INTEGER NOT NULL,
		attachment_point VARCHAR(100) NOT NULL,
		CONSTRAINT SYS_PK_11761 PRIMARY KEY (attachment_point_id)
	);

CREATE UNIQUE INDEX if not exists SYS_IDX_SYS_PK_11761_11762 ON attachment_point (attachment_point_id);