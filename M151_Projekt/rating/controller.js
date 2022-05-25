import { saveRate } from "./model.js";

export async function saveRate(request, response) {
  const rating = {
    userId: request.user.id,
    movieId: request.movieId,
    rating:
  };

  await saveRate(rating);
  response.redirect(request.baseUrl);
}
