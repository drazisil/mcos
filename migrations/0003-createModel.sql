-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	if not exists model (
		model_id INTEGER NOT NULL,
		brand_id INTEGER NOT NULL,
		e_model VARCHAR(100),
		g_model VARCHAR(100),
		f_model VARCHAR(100),
		s_model VARCHAR(100),
		i_model VARCHAR(100),
		j_model VARCHAR(100),
		sw_model VARCHAR(100),
		b_model VARCHAR(100),
		e_extra_info VARCHAR(100),
		g_extra_info VARCHAR(100),
		f_extra_info VARCHAR(100),
		s_extra_info VARCHAR(100),
		i_extra_info VARCHAR(100),
		j_extra_info VARCHAR(100),
		sw_extra_info VARCHAR(100),
		b_extra_info VARCHAR(100),
		e_short_model VARCHAR(50),
		g_short_model VARCHAR(50),
		f_short_model VARCHAR(50),
		s_short_model VARCHAR(50),
		i_short_model VARCHAR(50),
		j_short_model VARCHAR(50),
		sw_short_model VARCHAR(50),
		b_short_model VARCHAR(50),
		debug_string VARCHAR(255),
		debug_sort_string VARCHAR(50),
		CONSTRAINT SYS_PK_11927 PRIMARY KEY (model_id),
		CONSTRAINT MODEL_R_172 FOREIGN KEY (brand_id) REFERENCES brand (brand_id)
	);

CREATE INDEX if not exists SYS_IDX_MODEL_R_172_12422 ON model (brand_id);
-- +goose StatementEnd