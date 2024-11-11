-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS abstract_part_type (
		abstract_part_type_id INTEGER NOT NULL,
		parent_abstract_part_type_id INTEGER,
		depends_on INTEGER,
		part_filename VARCHAR(20),
		eapt VARCHAR(100) NOT NULL,
		gapt VARCHAR(100),
		faft VARCHAR(100),
		saft VARCHAR(100),
		iaft VARCHAR(100),
		jaft VARCHAR(100),
		sw_aft VARCHAR(100),
		baft VARCHAR(100),
		modified_rule INTEGER DEFAULT 0,
		eut TEXT,
		gut TEXT,
		fut TEXT,
		sut TEXT,
		iut TEXT,
		jut TEXT,
		swut TEXT,
		but TEXT,
		part_paired INTEGER DEFAULT 0,
		schematic_picname1 VARCHAR(9),
		schematic_picname2 VARCHAR(9),
		block_family_compatibility INTEGER DEFAULT 0,
		repair_cost_modifier NUMERIC(100, 7) DEFAULT 0,
		scrap_value_modifier NUMERIC(100, 7) DEFAULT 0,
		garage_category INTEGER DEFAULT 0,
		CONSTRAINT sys_pk_11740 PRIMARY KEY (abstract_part_type_id),
		CONSTRAINT abstractparttype_r_191 FOREIGN KEY (depends_on) REFERENCES abstract_part_type (abstract_part_type_id),
		CONSTRAINT abstractparttype_r2 FOREIGN KEY (parent_abstract_part_type_id) REFERENCES abstract_part_type (abstract_part_type_id)
	);

CREATE INDEX if not exists sys_idx_abstractparttype_r_191_15170 ON abstract_part_type (depends_on);

CREATE INDEX if not exists sys_idx_abstractparttype_r2_15181 ON abstract_part_type (parent_abstract_part_type_id);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_11740_11741 ON abstract_part_type (abstract_part_type_id);
-- +goose StatementEnd