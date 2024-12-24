import { useParams } from "react-router-dom";
import { envs } from "../environments";
import CommentSection from "../components/CommentSection";
import ChannelCard from "../components/ChannelCard";
import { useQuery } from "@tanstack/react-query";

interface VideoType {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    categoryId: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
    channelId: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

function Video() {
  const { videoId } = useParams();

  const fetchVideoData = async () => {
    const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${envs.VITE_YOUTUBE_API_KEY}`;
    const response = await fetch(videoDetailsUrl);
    const result = await response.json();
    console.log("Video Function Called");
    return result.items[0];
  };

  const { data } = useQuery<VideoType>({
    queryKey: ["video", videoId],
    queryFn: fetchVideoData,
    staleTime: 3000,
    enabled: !!videoId,
  });

  return (
    <div className="w-full min-h-svh flex sm:gap-10 gap-6 sm:my-0 my-10 flex-col  items-center">
      <div className="aspect-video sm:w-[60svw] w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=true`}
          className="w-full h-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      {data && data.id && (
        <>
          {" "}
          <h1 className="sm:text-4xl text-sm sm:w-[60svw] w-full px-2 font-bold break-words">
            {data && data.id ? data.snippet.title : "Title Placeholder"}
          </h1>
          <div className="flex sm:w-[60svw] w-full items-center">
            <ChannelCard
              likes={data.statistics.likeCount}
              channelId={data.snippet.channelId}
              title={data.snippet.channelTitle}
            />
          </div>
          <CommentSection
            commentCount={data.statistics.commentCount}
            videoId={data.id}
          />
        </>
      )}
    </div>
  );
}

export default Video;
