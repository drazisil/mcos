-- +goose Up
-- +goose StatementBegin
INSERT INTO
	sva_mode_restriction (sva_mode_restriction, "description")
VALUES
	(0, 'All Modes'),
	(1, 'Motor City'),
	(2, 'Debug'),
	(3, 'Traffic'),
	(4, 'Cop'),
	(5, 'Arcade')
on conflict do nothing;
-- +goose StatementEnd