"use client";

import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";
import FilterPanel from "./components/FilterPanel";
import GameCard from "./components/GameCard";
import Loader from "./components/Loader";
import PrimaryButton from "./components/PrimaryButton";
import { useDetectScrollPageBottom, useGetInfiniteGamesList } from "./hooks";

const MainContainer = styled.main`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 20px;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState("");
  const [filteredPlatform, setFilteredPlatform] = useState("");

  const queryClient = useQueryClient();

  const {
    data,
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

  const clearPagesCacheAfterFiltering = useCallback(() => {
    queryClient.setQueryData(["games"], (old) => ({
      pagesParams: [],
      pages: [old.pages[0]],
    }));
  }, [queryClient]);

  const performSearchWithDelay = useDebouncedCallback(
    useCallback(
      (searchQuery) => {
        clearPagesCacheAfterFiltering();
        setSearchQuery(searchQuery);
      },
      [clearPagesCacheAfterFiltering]
    ),
    700
  );

  const performFilterByPlatform = useCallback(
    (platformId) => {
      clearPagesCacheAfterFiltering();
      setFilteredPlatform(platformId);
    },
    [clearPagesCacheAfterFiltering]
  );

  const performSort = useCallback(
    (orderField) => {
      clearPagesCacheAfterFiltering();
      setOrder(
        order === `-${orderField}`
          ? `${orderField}`
          : order === `${orderField}`
          ? ""
          : `-${orderField}`
      );
    },
    [order, clearPagesCacheAfterFiltering]
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
    <MainContainer>
      <>
        <FilterPanel
          order={order}
          handleFilterByPlatform={performFilterByPlatform}
          handleSearch={performSearchWithDelay}
          handleSort={performSort}
        />
        <GamesGrid>
          {data?.pages?.map((pageWithGames, i) => (
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
    </MainContainer>
  );
}
