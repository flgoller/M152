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
    <thead><tr><th>Id</th><th>Title</th><th></th><th></th></tr></thead>
    <tbody>
      ${movies
        .map(
          (movie) => `
        <tr>
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>
          <a href="/movie/rate/1/${movie.id}">${
            movie.rating >= 1 ? "★" : "☆"
          }</a>
          <a href="/movie/rate/2/${movie.id}">${
            movie.rating >= 2 ? "★" : "☆"
          }</a>
          <a href="/movie/rate/3/${movie.id}">${
            movie.rating >= 3 ? "★" : "☆"
          }</a>
          <a href="/movie/rate/4/${movie.id}">${
            movie.rating >= 4 ? "★" : "☆"
          }</a>
          <a href="/movie/rate/5/${movie.id}">${
            movie.rating >= 5 ? "★" : "☆"
          }</a>
          </td>
          <td>${movie.avgRating}</td>
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
