"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllPlatforms, getGames } from "../services/api";

export function useDetectScrollPageBottom() {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isBottom;
}

export function useGetAllPlatforms() {
  return useQuery(["platforms"], () => getAllPlatforms());
}

export function useGetInfiniteGamesList({ search, order, platform }) {
  return useInfiniteQuery(
    ["games"],
    ({ pageParam = 1 }) => getGames({ pageParam, search, order, platform }),
    {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length + 1;
      },
      refetchOnWindowFocus: false,
    }
  );
}
