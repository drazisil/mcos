-- +goose Up
-- +goose StatementBegin
INSERT INTO
	skin_type (skin_type_id, skin_type)
VALUES
	(1, '''Tinted'''),
	(2, '''Custom'''),
	(3, '''Cop'''),
	(4, 'Flames'),
	(5, 'Scallops'),
	(6, 'Decals'),
	(7, 'Rust'),
	(8, 'Traffic'),
	(9, 'Bad-ass'),
	(10, '''Starter''')
on conflict do nothing;
-- +goose StatementEnd