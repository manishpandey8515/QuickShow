import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const showData = dummyShowsData.find((show) => show._id === id);
    if (showData) {
      setShow({
        movie: showData,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-[120px] md:pt-[200px]">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-10">
        <img
          src={show.movie.poster_path}
          alt=""
          className="max-md:mx-auto rounded-xl h-[26rem] max-w-[18rem] object-cover"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="100px" left="100px" />
          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average?.toFixed(1)} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>

          <p className="text-gray-200 text-sm">
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres?.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date?.split("-")[0]}
          </p>
          <div className=" flex items-center flex-wrap gap-4 mt-4">
            <button
              className="flex items-center gap-2 px-3 py-3 text-sm 
             bg-gray-800 hover:bg-gray-900 transition 
             rounded-md font-medium cursor-pointer active:scale-95"
            >
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>
            <a
              href="dateSelect"
              className="px-5 py-3 text-sm text-white bg-primary hover:bg-primary/80
             transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>
            <button
              className="bg-gray-700 p-2.5 rounded-full transition 
             cursor-pointer active:scale-95"
            >
              <Heart className={`w-5 h-5`} />
            </button>
          </div>
        </div>
      </div>
      {/* Favorite Cast Section */}
      <p className=" text-lg font-medium mt-20">Your Favorite Cast</p>
      <div className=" overflow-x-auto no-scrollbar  mt-8 pb-4">
        <div className=" flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div
              key={index}
              className=" flex flex-col items-center text-center"
            >
              <img
                src={cast.profile_path}
                alt=""
                className=" rounded-full h-20
			 md:h-20 aspect-square object-cover"
              />
              <p className=" font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-300 text-lg">Loading...</div>
  );
};

export default MovieDetails;
