import { useNavigate } from "react-router-dom";

export const useCatalogOverviewSection = (label: string) => {
  const navigate = useNavigate();

  const viewMore = () => {
    const params = new URLSearchParams({ genre: label, subject: label });
    navigate(`/catalog?${params.toString()}`);
  };

  return { viewMore };
};
