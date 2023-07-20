// TODO: Move to .env
const API_KEY = "b8938cdf849f40a3951c7bd772159fb6";

// SSR response
export const getGameById = async (id) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );

  return response.json();
};

export const getGameScreenshotsById = async (id) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
  );

  return response.json();
};

export const getAllPlatforms = async () => {
  const response = await fetch(
    `https://api.rawg.io/api/platforms?key=${API_KEY}`
  );

  return await response.json();
};

export const getGames = async ({ pageParam, search, order, platform }) => {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=${pageParam}${
      search && `&search=${search}`
    }${order && `&ordering=${order}`}${platform && `&platforms=${platform}`}
    `
  );

  return await response.json();
};
