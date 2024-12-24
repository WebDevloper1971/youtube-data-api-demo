import HTMLReactParser from "html-react-parser/lib/index";
import moment from "moment";
import { useState } from "react";

interface CommentCardProps {
  image: string;
  username: string;
  description: string;
  time: string;
}

function CommentCard({ image, username, description, time }: CommentCardProps) {
  const [comment, setComment] = useState<boolean>(false);
  return (
    <div className="shadow shadow-slate-400 p-2 flex gap-3 rounded-lg items-start overflow-hidden">
      <img
        src={image ? image : ""}
        alt=""
        className="sm:size-12 size-9 bg-black rounded-full"
      />
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-lg flex items-center sm:gap-20 gap-4 font-semibold w-full sm:mt-2.5">
          <span className=" line-clamp-1 sm:text-base text-sm break-before-auto">
            {username ? username : "commments username"}
          </span>
          <span className="sm:text-sm text-xs">
            {time ? moment(time).fromNow() : "date-time-placeholder"}
          </span>
        </h1>

        <p
          className={`my-html-data text-justify text-wrap w-[95%] sm:text-sm text-xs tracking-wide leading-7 ${
            comment ? "line-clamp-none" : "line-clamp-2"
          }`}
        >
          {description
            ? `${HTMLReactParser(description.toString())}`
            : "description placeholder"}
        </p>

        <button
          onClick={() => setComment(!comment)}
          className="text-xs w-fit  line-clamp-1 underline"
        >
          Read {comment ? "Less" : "More"}
        </button>
      </div>
    </div>
  );
}

export default CommentCard;
