CREATE TABLE account_votes (
    user_id INT PRIMARY KEY,
    track_ids integer[] DEFAULT '{}',
    FOREIGN KEY (user_id) REFERENCES accounts(user_id) ON DELETE CASCADE
);

CREATE TABLE musictracks_votes (
    track_id INT PRIMARY KEY,
    track_votes INT DEFAULT 0,
    FOREIGN KEY (track_id) REFERENCES musictracks(track_id) 
);

CREATE TABLE accounts (
	user_id serial PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (250) NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL
);

CREATE TABLE roles(
   role_id serial PRIMARY KEY,
   role_name VARCHAR (255) UNIQUE NOT NULL
);


CREATE TABLE account_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (role_id)
    REFERENCES roles (role_id),
  FOREIGN KEY (user_id)
    REFERENCES accounts (user_id) ON DELETE CASCADE
);

CREATE TABLE musictracks (
    track_id serial PRIMARY KEY,
    artist VARCHAR (200) NOT NULL,
    title VARCHAR (200) NOT NULL,
    link TEXT NOT NULL
);