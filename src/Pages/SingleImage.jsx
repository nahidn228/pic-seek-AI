import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import PageTitle from "./../components/shared/PageTitle";

const SingleImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});
  const { user } = useContext(AuthContext);

  // const [comments, setComments] = useState([]);

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get(
        `https://pic-seek-server-lake.vercel.app/api/v1/comment/comment/${user?.email}/${id}`
      );
      return res.data;
    },
    refetchInterval: 5000,
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;

    const document = {
      email: user?.email,
      username: user?.displayName || "Anonymous",
      prompt: image?.prompt,
      imageId: id,
      comment,
    };

    axios
      .post(
        "https://pic-seek-server-lake.vercel.app/api/v1/comment/create",
        document
      )
      .then((res) => console.log(res.data));
    e.target.reset();
    refetch();
  };

  useEffect(() => {
    fetch(`https://pic-seek-server-lake.vercel.app/api/v1/image/single/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data));

    refetch();
    // axios
    //   .get("https://pic-seek-server-lake.vercel.app/api/v1/comment/comments")
    //   .then((res) => setComments(res.data));
  }, [id, refetch]);

  console.log(comments);
  return (
    <div className="bg-gradient-to-b lg:bg-gradient-to-l from-cyan-100 min-h-screen p-6">
      <PageTitle>{image?.prompt}</PageTitle>
      <div className="w-11/12 max-w-4xl mx-auto">
        {/* Image Section */}
        <figure className="my-5 flex justify-center">
          <img
            src={image?.original_img}
            alt="Generated"
            className="rounded-lg shadow-lg max-w-full"
          />
        </figure>

        {/* Comment Section */}
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg max-h-[500px] overflow-y-auto">
          {/* Comment List */}
          <div className="mt-4 space-y-4 border-b border-gray-300 pb-4">
            {comments?.map((comment, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-2 bg-gray-50 rounded-lg"
              >
                {/* User Comment */}
                <div className="flex gap-3 items-center">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                      <img src={user?.photoURL} />
                    </div>
                  </div>

                  <p className="font-medium text-gray-800">{comment.comment}</p>
                </div>
                {/* AI Reply */}
                {comment.reply && (
                  <div className="flex gap-3 items-center">
                    <div className="p-2 bg-gray-600 w-8 text-white rounded-full">
                      <FaRobot />
                    </div>
                    <p className="text-sm text-gray-600">{comment.reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div className="mt-4">
            <form className="flex gap-3" onSubmit={handleCommentSubmit}>
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex-shrink-0"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
