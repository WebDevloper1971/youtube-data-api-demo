import { useState } from "react";
import { envs } from "../environments";
import countFormatter from "../utils/CountFormatter";
import HTMLReactParser from "html-react-parser/lib/index";
import { useQuery } from "@tanstack/react-query";

interface ChannelCardProps {
  channelId: string;
  title: string;
  likes?: string;
}

interface Channel {
  id: string;
  snippet: {
    description: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    title: string;
  };
  statistics: {
    subscriberCount: string;
    viewCount: string;
  };
}
function ChannelCard({ title, channelId }: ChannelCardProps) {
  const [description, setDescription] = useState<boolean>(false);

  const fetchChannelData = async () => {
    const channelDetailsUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${envs.VITE_YOUTUBE_API_KEY}`;
    const response = await fetch(channelDetailsUrl);
    const result = await response.json();
    console.log("Channel Data Called");
    return result.items[0];
  };
  const { data } = useQuery<Channel>({
    queryKey: ["channel", channelId],
    queryFn: fetchChannelData,
    staleTime: 3000,
    enabled: !!channelId,
  });
  return (
    <>
      {data && data.id && (
        <div className="sm:mx-0 mx-2">
          <div className="flex sm:w-[60svw] w-full items-center">
            <div className="flex gap-3 rounded-lg items-center w-fit">
              <img
                src={data.snippet.thumbnails.default.url}
                alt=""
                className="sm:size-16 size-10 bg-black rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h1 className="sm:text-xl text-sm font-semibold line-clamp-1">
                  {title}
                </h1>
                <h2 className="sm:text-base text-xs line-clamp-1">
                  {countFormatter(Number(data.statistics.subscriberCount))}{" "}
                  Subscribers
                </h2>
              </div>
            </div>
          </div>

          <div className="sm:w-[60svw] w-full sm:text-base text-xs flex flex-col gap-4 mt-8">
            <p
              className={`sm:w-[60svw] w-full  tracking-wide leading-8 transition-all duration-300 text-justify ${
                description ? "line-clamp-none" : "line-clamp-3"
              } `}
            >
              {data.snippet.description
                ? `${HTMLReactParser(data.snippet.description)}`
                : "description"}
            </p>
            <button
              onClick={() => setDescription(!description)}
              className="underline w-fit"
            >
              Read {description ? "Less" : "More"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
//{HTMLReactParser(channelData.snippet.description)}
export default ChannelCard;
