import { MediaGrid } from "@/components/MediaGrid";
import { getSearchMedia } from "@/lib/tmdb/tmdb";

type Props = {
  params: Promise<{ query: string }>;
};

export default async function SearchResultPage({ params }: Props) {
  const resolvedParams = await params;
  /* 
  await new Promise((resolve) => setTimeout(resolve, 5000)); */

  const searchTerm = decodeURIComponent(resolvedParams.query);

  const media = await getSearchMedia(searchTerm);

  async function loadMoreSearch(page: number) {
    "use server";
    const result = await getSearchMedia(searchTerm, page);
    return result ?? [];
  }

  return (
    <div className="">
      <h1 className="mb-4 text-2xl">Resultados para: {searchTerm}</h1>
      <MediaGrid
        media={media}
        key={searchTerm}
        fetchMoreAction={loadMoreSearch}
      />
    </div>
  );
}
