-- +goose Up
-- +goose StatementBegin
INSERT INTO
	player_type (player_type_id, player_type)
VALUES
	(1, 'System'),
	(2, 'Admin'),
	(3, 'Player'),
	(4, 'Deleted Player'),
	(5, 'Escrow')
on conflict do nothing;
-- +goose StatementEnd