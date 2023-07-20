// TODO: Move to .env
const RAWR_API_KEY = process.env.NEXT_PUBLIC_RAWR_API_KEY;

console.log(process);
// SSR response
export const getGameById = async (id) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${RAWR_API_KEY}`
  );

  return response.json();
};

export const getGameScreenshotsById = async (id) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}/screenshots?key=${RAWR_API_KEY}`
  );

  return response.json();
};

export const getAllPlatforms = async () => {
  const response = await fetch(
    `https://api.rawg.io/api/platforms?key=${RAWR_API_KEY}`
  );

  return await response.json();
};

export const getGames = async ({ pageParam, search, order, platform }) => {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${RAWR_API_KEY}&page=${pageParam}${
      search && `&search=${search}`
    }${order && `&ordering=${order}`}${platform && `&platforms=${platform}`}
    `
  );

  return await response.json();
};
