-- +goose Up
-- +goose StatementBegin
INSERT INTO
	attachment_point (attachment_point_id, attachment_point)
VALUES
	(0, '(default)'),
	(1, 'Left Front'),
	(2, 'Right Front'),
	(3, 'Left Rear'),
	(4, 'Right Rear'),
	(5, 'Left'),
	(6, 'Right'),
	(7, 'A'),
	(8, 'B'),
	(9, 'C')
on conflict do nothing;

INSERT INTO
	attachment_point (attachment_point_id, attachment_point)
VALUES
	(10, 'Front'),
	(11, 'Rear')
on conflict do nothing;	
-- +goose StatementEnd