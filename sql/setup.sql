DROP TABLE IF EXISTS links;

CREATE TABLE links (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  url TEXT NOT NULL
);
