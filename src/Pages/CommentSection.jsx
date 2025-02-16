import { useContext, useState } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const CommentSection = () => {
     const { user } = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Comment List */}
      <div className="mt-4 space-y-3 border-b border-gray-700 pb-3 ">
        {comments.map((comment, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-2 rounded-lg ${
              comment.user === "AI" ? "bg-gray-800" : "bg-gray-700"
            }`}
          >
            <div className="p-2 bg-gray-600 rounded-full">
              {comment.user === "AI" ? <FaRobot /> : <FaUser />}
            </div>
            <div>
              <p className="font-bold">{comment.user}</p>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <div className=" mt-4">
        <form
          className="flex items-center gap-2 mt-4"
          onSubmit={handleCommentSubmit}
        >
          <input
            type="text"
            placeholder="Add a comment..."
            className=" w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
