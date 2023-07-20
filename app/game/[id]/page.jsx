import { getGameById, getGameScreenshotsById } from "@/app/services/api";
import Link from "next/link";
import { IoOpenOutline } from "react-icons/io5";

export default async function Page({ params }) {
  const game = await getGameById(params.id);
  const screenshots = await getGameScreenshotsById(params.id);

  return (
    <div
      className={`
      max-w-screen-lg md:mt-4 bg-gray-100
      rounded-lg shadow-lg
      mx-auto mb-[5rem] py-8 px-2 md:py-10 md:px-8
    `}
    >
      <div className="flex items-center">
        <div className="game-title font-bold text-2xl pl-4">{game.name}</div>
        {game.metacritic_url && (
          <Link href={game.metacritic_url} target="__blank">
            <IoOpenOutline className="ml-2 text-2xl cursor-pointer text-blue-600" />
          </Link>
        )}
      </div>
      <div className="game-description p-4">
        <p
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: game.description }}
        />
      </div>
      <div
        className={`
        flex flex-row
        overflow-x-auto whitespace-nowrap
        snap-x snap-mandatory
        w-full
    `}
      >
        {screenshots.results.map((screenshot, index) => (
          <div
            key={screenshot.id}
            className={`
              game-screenshot  bg-gray-300 bg-cover bg-center rounded-md mr-4 
              snap-center flex flex-col
              mx-2 my-4 
              rounded-lg shadow-lg  
            `}
          >
            <img
              className="object-cover md:w-[42rem] h-auto w-[30rem]"
              src={screenshot.image}
              alt={`screenshot-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
