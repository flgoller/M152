import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "127.0.0.1",
  //port: 3307,
  user: "vmadmin",
  password: "sml12345",
  database: "movie-db",
});

await connection.connect();

export async function getAVGRatingByMovie(movieId) {
  const query = "SELECT AVG(rating) as avg FROM Ratings WHERE movie = ?";
  const [data] = await connection.query(query, [movieId]);

  return data.pop().avg;
}

export async function getRate(userId, movieId) {
  const query = "SELECT * FROM Ratings WHERE user = ? AND movie = ?";
  const [data] = await connection.query(query, [userId, movieId]);
  const rating = data.pop();

  if (rating == undefined) {
    return 0;
  }
  return rating.rating;
}

export async function insertRate(rating) {
  const query = "INSERT INTO Ratings VALUES(?, ?, ?)";
  await connection.query(query, [rating.userId, rating.movieId, rating.rating]);

  return;
}

export async function updateRate(rating) {
  const query = "UPDATE Ratings SET rating = ? WHERE user = ? AND movie = ?";
  await connection.query(query, [rating.rating, rating.userId, rating.movieId]);

  return;
}

export async function removeRatingByMovie(movieId) {
  const query = "DELETE FROM Ratings WHERE movie = ?";
  await connection.query(query, [movieId]);

  return;
}

export async function saveRate(rating) {
  console.log(rating);
  const a = await getRate(rating.userId, parseInt(rating.movieId));
  console.log(a);
  if (a == 0) {
    return insertRate(rating);
  } else {
    console.log("test");
    return updateRate(rating);
  }
}
