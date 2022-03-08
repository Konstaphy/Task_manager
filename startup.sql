CREATE TABLE IF NOT EXISTS Users(
    name varchar(225),
    surname varchar(127),
    password varchar(225),
    email varchar(225),
    user_id SERIAL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS Tokens(
    refresh_token varchar(225),
    user_id int,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Tasks(
    task_id SERIAL,
    user_id int,
    message varchar(63),
    description varchar(255),
    completed boolean,
    PRIMARY KEY (task_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
