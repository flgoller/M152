import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "127.0.0.1",
  //port: 3307,
  user: "vmadmin",
  password: "sml12345",
  database: "movie-db",
});

await connection.connect();

export async function getAll(userid) {
  const query = "SELECT * FROM Movies WHERE user = ? OR public = 1";
  const [data] = await connection.query(query, [userid]);

  return data;
}

async function insert(movie, userid) {
  const query =
    "INSERT INTO Movies (title, year, public, user) VALUES (?, ?, ?, ?)";
  const [result] = await connection.query(query, [
    movie.title,
    movie.year,
    movie.public,
    userid,
  ]);
  return { ...movie, id: result.insertId };
}

async function update(movie, userid) {
  const query =
    "UPDATE Movies SET title = ?, year = ?, public = ?, user = ? WHERE id = ?";
  await connection.query(query, [
    movie.title,
    movie.year,
    movie.public,
    userid,
    movie.id,
  ]);
  return movie;
}

export async function getRate(rating) {
  const query = "SELECT * FROM Ratings WHERE userId = ? AND movieId = ?";
  const [data] = await connection.query(query, [rating.userId, rating.movieId]);

  return data.pop();
}

export async function insertRate(rating) {
  const query = "INSERT INTO Ratings VALUES(?, ?, ?)";
  await connection.query(query, [rating.userId, rating.movieId, rating.rating]);

  return;
}

export async function updateRate(rating) {
  const query =
    "UPDATE Ratings SET rating = ? WHERE userId = ? AND movieId = ?";
  await connection.query(query, [rating.rating, rating.userId, rating.movieId]);

  return;
}

export async function saveRate(rating, userId) {
  if (!getRate(rating)) {
    return insertRate(rating);
  } else {
    return updateRate(rating);
  }
}
