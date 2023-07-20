import { useGetAllPlatforms } from "@/app/hooks";
import { useCallback, useMemo } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { styled } from "styled-components";

const FilterPanelContainer = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 0;
    padding-top: 20px;

    .subfilters-container {
      flex-direction: column-reverse;
    }
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 768px) {
    box-sizing: border-box;
    display: block;
    width: 100%;
    margin: 0 10px;
  }
`;

const SortContainer = styled.div`
  display: flex;
  margin-left: 35px;

  .sort-option {
    margin-right: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .sort-option .sort-icon {
    margin-left: 3px;
    font-size: 16px;
    min-width: 16px;
  }

  .sort-option:hover {
    opacity: 0.56;
  }

  @media (max-width: 768px) {
    align-self: center;
    margin: 0;
  }
`;

const FilterContainer = styled.div`
  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    select {
      width: 100%;
      margin: 10px 0;
    }
  }
`;

export default function FilterPanel({
  order,
  handleFilterByPlatform,
  handleSort,
  handleSearch,
}) {
  const { data: platforms } = useGetAllPlatforms();

  const mostPopularPlatforms = useMemo(
    () =>
      platforms?.results
        ?.sort(
          (platformA, platformB) =>
            platformB.games_count - platformA.games_count
        )
        .slice(0, 5),
    [platforms]
  );

  const getOrderIcon = useCallback(
    (orderField) => (
      <>
        {order === orderField ? (
          <AiOutlineArrowDown />
        ) : order === `-${orderField}` ? (
          <AiOutlineArrowUp />
        ) : null}
      </>
    ),
    [order]
  );

  return (
    <FilterPanelContainer>
      <SearchInput
        type="text"
        placeholder="Games search"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="subfilters-container flex md:w-auto w-full">
        <SortContainer>
          <div className="sort-option" onClick={() => handleSort("released")}>
            By Date{" "}
            <span className="sort-icon mt-1">{getOrderIcon("released")}</span>
          </div>
          <div className="sort-option" onClick={() => handleSort("rating")}>
            By Rating{" "}
            <span className="sort-icon mt-1">{getOrderIcon("rating")}</span>
          </div>
        </SortContainer>
        <FilterContainer>
          <select onChange={(e) => handleFilterByPlatform(e.target.value)}>
            <option value="">All platforms</option>
            {mostPopularPlatforms?.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </FilterContainer>
      </div>
    </FilterPanelContainer>
  );
}
