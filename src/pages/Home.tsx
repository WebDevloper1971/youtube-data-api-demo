import { Link } from "react-router-dom";
import { UseVTubeContext, YTVideoData } from "../context/VTubeContext";
import Card from "../components/Card";
import { envs } from "../environments";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const { category } = UseVTubeContext();

  const fetchData = async () => {
    const url: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${envs.VITE_YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log("API Called");
    return result.items;
  };
  const { data } = useQuery<YTVideoData[], Error>({
    queryKey: ["feed"],
    queryFn: fetchData,
    staleTime: 300000,
  });

  return (
    <div className="w-fit h-full sm:my-0 my-8">
      <div className="w-full h-2/3 sm:flex sm:flex-row flex-col">
        <div className="titles-and-cta gap-12 p-2 flex-1 w-full flex flex-col  justify-between">
          <div className="titles flex flex-col gap-4">
            <h1 className="text-4xl font-semibold">Trending Topics</h1>
            <p className="tracking-wider">
              Explore what people around the world are interested in.
            </p>
          </div>
          <div className="cta">
            <button className="text-white bg-blue-950 h-12 rounded w-48 flex justify-center items-center">
              Buy Premium
            </button>
          </div>
        </div>

        {data && data.length && (
          <div className=" trending-video flex-1 sm:px-4 px-2 h-full w-full">
            <Link to={`/video/${category}/${data[0].id}`} className="w-full">
              <img
                src={data[0].snippet.thumbnails.high.url}
                alt="trending-video"
                className="w-full h-full object-cover bg-black"
              />
            </Link>
          </div>
        )}
      </div>

      <h1 className="text-2xl w-full h-12 flex justify-center items-center my-28">
        Explore More Topics
      </h1>

      {data && data.length ? (
        <div className="my-grid-container">
          {data.map((v, i) => {
            return (
              <Card
                key={i}
                thumbnailUrl={v.snippet.thumbnails.high.url}
                title={v.snippet.title}
                channelTitle={v.snippet.channelTitle}
                publishedAt={v.snippet.publishedAt}
                videoId={v.id}
                viewCount={v.statistics.viewCount}
              />
            );
          })}
        </div>
      ) : (
        <div>Error Loading Videos</div>
      )}
    </div>
  );
}

export default Home;
