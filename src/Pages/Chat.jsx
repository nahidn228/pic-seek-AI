import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Chat = () => {
  const { user } = useContext(AuthContext);
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

  const handleChat = (e) => {
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
  return <div></div>;
};

export default Chat;
