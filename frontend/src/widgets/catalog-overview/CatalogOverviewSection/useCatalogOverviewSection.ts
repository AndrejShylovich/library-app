import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useCatalogOverviewSection = (genre: string) => {
  const navigate = useNavigate();

  const viewMore = useCallback(() => {
    const params = new URLSearchParams({ genre });

    navigate(`/catalog?${params.toString()}`);
  }, [navigate, genre]);

  return { viewMore };
};