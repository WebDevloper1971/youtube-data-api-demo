import moment from "moment";
import countFormatter from "../utils/CountFormatter";
import { Link } from "react-router-dom";
import { UseVTubeContext } from "../context/VTubeContext";

interface CardProps {
  title: string;
  viewCount: string;
  publishedAt: string;
  thumbnailUrl: string;
  channelTitle: string;
  videoId: string;
}

const Card = ({
  title,
  viewCount,
  publishedAt,
  thumbnailUrl,
  channelTitle,
  videoId,
}: CardProps) => {
  const { category } = UseVTubeContext();

  return (
    <Link
      to={`/video/${category}/${videoId}`}
      className="flex flex-col gap-6 aspect-video shadow-slate-400 shadow-sm rounded-lg"
    >
      <div className="flex-2 rounded-lg p-2">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="h-full w-full object-cover object-center rounded-lg"
        />
      </div>

      <div className="flex-1 flex flex-col gap-4 px-4">
        <h1 className="flex-1">
          <span className="line-clamp-1 font-bold text-lg">
            {title.toUpperCase()}
          </span>
        </h1>

        <div className="flex-1 flex flex-col gap-6 w-full justify-center items-center mb-4">
          <div className="w-full overflow-hidden flex items-center gap-2">
            <img
              src={thumbnailUrl}
              className="size-10 rounded-full bg-black"
              alt=""
            />
            <h2 className="">{channelTitle}</h2>
          </div>
          <div className="flex justify-between items-center w-full ">
            <div className="w-fit flex  items-center">
              <h2>{countFormatter(Number(viewCount))} views</h2>
            </div>
            <div className="w-fit flex items-center">
              <h2>{moment(publishedAt).fromNow()}</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
