import CommentCard from "./CommentCard";
import { envs } from "../environments";
import countFormatter from "../utils/CountFormatter";
import { useQuery } from "@tanstack/react-query";

interface Comment {
  id: string;
  snippet: {
    topLevelComment: {
      id: string;
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        likeCount: string;
        publishedAt: string;
        textDisplay: string;
      };
    };
  };
}

interface CommentSectionProps {
  videoId: string;
  commentCount: string;
}

function CommentSection({ videoId, commentCount }: CommentSectionProps) {
  const fetchCommentsData = async () => {
    const commentsListUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=20&videoId=${videoId}&key=${envs.VITE_YOUTUBE_API_KEY}`;
    const response = await fetch(commentsListUrl);
    const result = await response.json();
    console.log("Comments Data Called");
    return result.items;
  };
  const { data } = useQuery<Comment[]>({
    queryKey: ["comments", videoId],
    queryFn: fetchCommentsData,
    staleTime: 3000,
    enabled: !!videoId,
  });
  return (
    <>
      <h1 className="sm:text-2xl text-lg ml-4 sm:w-[60svw] w-full">
        {countFormatter(Number(commentCount))} Comments
      </h1>
      <div className="sm:w-[61svw] w-full flex flex-col gap-8 h-[80svh] overflow-y-scroll mb-8 py-8 px-2">
        <div className="flex flex-col gap-8 ">
          {data &&
            data.length &&
            data.map((c, i) => {
              return (
                <CommentCard
                  description={c.snippet.topLevelComment.snippet.textDisplay}
                  image={
                    c.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  username={c.snippet.topLevelComment.snippet.authorDisplayName}
                  time={c.snippet.topLevelComment.snippet.publishedAt}
                  key={i}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default CommentSection;
