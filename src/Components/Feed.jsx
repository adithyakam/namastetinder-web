import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosServer from "../Redux/api";
import { addFeed } from "../Redux/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    // console.log("feed");

    // if (feed) return;
    try {
      const res = await axiosServer.get("/feed", {
        withCredentials: true,
      });
      console.log(res?.data);

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed data:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
