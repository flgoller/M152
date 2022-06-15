export function render(movies) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Movie list</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
<a href="/logout">abmelden</a>
  <table>
    <thead><tr><th>Id</th><th>Title</th><th></th><th></th><th></th><th></th></th></th></tr></thead>
    <tbody>
      ${movies
        .map(
          (movie) => `
        <tr>
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>
          ${[1, 2, 3, 4, 5]
            .map(
              (index) =>
                `
                <a href="/movie/rate/${index}/${movie.id}">${
                  movie.rating >= index ? "★" : "☆"
                }</a>
              `
            )
            .join("")}
          </td>
          <td>${movie.avgRating ? movie.avgRating : ""}</td>
          <td><a href="/movie/delete/${movie.id}">löschen</a></td>
          <td><a href="/movie/form/${movie.id}">bearbeiten</a></td> 
        </tr>`
        )
        .join("")}
    </tbody>
  </table>
  <a href="/movie/form">neu</a>
</body>
</html>
  `;
}
