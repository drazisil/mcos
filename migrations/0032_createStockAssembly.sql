-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS
	stock_assembly (
		parent_branded_part_id INTEGER NOT NULL,
		child_branded_part_id INTEGER NOT NULL,
		attachment_point_id INTEGER NOT NULL,
		config_default SMALLINT NOT NULL,
		physics_default SMALLINT NOT NULL,
		CONSTRAINT sys_pk_12146 PRIMARY KEY (
			parent_branded_part_id,
			child_branded_part_id,
			attachment_point_id
		),
		CONSTRAINT stockassembly_attachmentpointstockassembly FOREIGN KEY (attachment_point_id) REFERENCES attachment_point (attachment_point_id),
		CONSTRAINT stockassembly_brandedpartstockassembly FOREIGN KEY (child_branded_part_id) REFERENCES branded_part (branded_part_id),
		CONSTRAINT stockassembly_brandedpartstockassembly1 FOREIGN KEY (parent_branded_part_id) REFERENCES branded_part (branded_part_id)
	);

CREATE INDEX if not exists sys_idx_stockassembly_attachmentpointstockassembly_12750 ON stock_assembly (attachment_point_id);

CREATE INDEX if not exists sys_idx_stockassembly_brandedpartstockassembly1_12774 ON stock_assembly (parent_branded_part_id);

CREATE INDEX if not exists sys_idx_stockassembly_brandedpartstockassembly_12762 ON stock_assembly (child_branded_part_id);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_12146_12147 ON stock_assembly (
	parent_branded_part_id,
	child_branded_part_id,
	attachment_point_id
);
-- +goose StatementEnd