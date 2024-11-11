-- +goose Up
-- +goose StatementBegin
INSERT INTO
	part_grade (part_grade_id, e_text, g_text, f_text, part_grade)
VALUES
	(0, 'no grade', NULL, NULL, NULL),
	(1, 'Stock', NULL, NULL, NULL),
	(2, 'Performance', NULL, NULL, NULL),
	(3, 'High Performance', NULL, NULL, NULL),
	(4, 'Racing', NULL, NULL, NULL)
on conflict do nothing;
-- +goose StatementEnd