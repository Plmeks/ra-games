"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";
import FilterPanel from "./components/FilterPanel";
import GameCard from "./components/GameCard";
import Loader from "./components/Loader";
import PrimaryButton from "./components/PrimaryButton";
import { useDetectScrollPageBottom, useGetInfiniteGamesList } from "./hooks";

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 42px;
`;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState("");
  const [filteredPlatform, setFilteredPlatform] = useState("");

  const {
    data: pagesWithGames,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useGetInfiniteGamesList({
    search: searchQuery,
    order,
    platform: filteredPlatform,
  });

  const performSearchWithDelay = useDebouncedCallback((searchQuery) => {
    setSearchQuery(searchQuery);
  }, 700);

  const performFilterByPlatform = useCallback((platformId) => {
    setFilteredPlatform(platformId);
  }, []);

  const performSort = useCallback(
    (orderField) => {
      setOrder(
        order === orderField
          ? `-${orderField}`
          : order === `-${orderField}`
          ? ""
          : orderField
      );
    },
    [order]
  );

  const isScrolledToPageBottom = useDetectScrollPageBottom();

  useEffect(() => {
    if (isScrolledToPageBottom) {
      fetchNextPage({ cancelRefetch: true });
    }
  }, [fetchNextPage, isScrolledToPageBottom]);

  useEffect(() => {
    refetch();
  }, [refetch, searchQuery, order, filteredPlatform]);

  return (
    <main className="relative">
      <>
        <FilterPanel
          order={order}
          handleFilterByPlatform={performFilterByPlatform}
          handleSearch={performSearchWithDelay}
          handleSort={performSort}
        />
        <GamesGrid>
          <>
            {pagesWithGames?.pages?.map((pageWithGames, i) => (
              <React.Fragment key={i}>
                {pageWithGames.results.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    poster={game.background_image}
                    rating={game.rating}
                    released={game.released}
                  />
                ))}
              </React.Fragment>
            ))}
          </>
        </GamesGrid>
      </>
      {status !== "loading" && (
        <div className="mt-8">
          <PrimaryButton
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </PrimaryButton>
        </div>
      )}
      {status === "error" && <p>Error: {error.message}</p>}
      {isFetching && !isFetchingNextPage && (
        <Loader
          containerClass={status === "loading" ? "opacity-1" : "opacity-[0.5]"}
        />
      )}
    </main>
  );
}
