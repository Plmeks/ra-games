import dayjs from "dayjs";
import Link from "next/link";
import { AiOutlineCalendar, AiOutlineStar } from "react-icons/ai";
import { styled } from "styled-components";

const GameCardWrapper = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const GamePoster = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  margin-bottom: 10px;
  background-image: url(${(props) => props.poster});
`;

const GameTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
  min-height: 3.125rem;
`;

const GameInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const GameReleaseDate = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 16px;
  color: #888;
`;

const GameRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 18px;
  color: #ff9800;
`;

export default function GameCard({ id, name, poster, rating, released }) {
  return (
    <Link href={`game/${id}`} className="no-underline">
      <GameCardWrapper>
        <GamePoster poster={poster} />
        <GameTitle>{name}</GameTitle>
        <GameInfoContainer>
          <GameReleaseDate>
            <AiOutlineCalendar />{" "}
            {released ? dayjs(released).format("DD.MM.YYYY") : "N/A release"}
          </GameReleaseDate>
          <GameRating>
            <AiOutlineStar />
            {rating}/5
          </GameRating>
        </GameInfoContainer>
      </GameCardWrapper>
    </Link>
  );
}
