import axios from "axios";
import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import Loader from "../components/shared/Loader";
import PageTitle from "../components/shared/PageTitle";
import { AuthContext } from "../provider/AuthProvider";

const Create = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const options = [
    "Painting",
    "Animated-Image",
    "Wallpaper",
    "Poster",
    "Digital-Art",
    "Realistic-Image",
  ];

  const checkUser = () => {
    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "Join as a Creator with One Click",
        imageUrl: "https://img.icons8.com/?size=100&id=szz75vJoS2OI&format=gif",
        imageHeight: "80px",
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonText: `Login using Google`,
        confirmButtonColor: "#149b9b",
      }).then((res) => {
        if (res.isConfirmed) {
          login()
            .then((res) => {
              const user = res.user;
              console.log(user);
              Swal.fire("success", "Welcome", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      return false;
    } else {
      return true;
    }
  };

  const validate = (prompt, category) => {
    // validation starts
    if (!category) {
      Swal.fire(
        "Select Category",
        "Select a Category from the dropdown",
        "error"
      );
      return false;
    }
    if (!prompt) {
      Swal.fire("Write a Prompt", "Write a prompt in the input", "error");
      return false;
    }
    if (!prompt) {
      Swal.fire("Write a Prompt", "Write a prompt in the input", "error");
      return false;
    }
    if (prompt.trim().length < 20) {
      Swal.fire(
        "Invalid Prompt",
        "make your prompt bigger (minimum 20 character)",
        "error"
      );
      return false;
    }
    return true;
    //validation End
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = user?.email;
    // Get the current time
    const currentTime = new Date().getTime();
    const userInfo = {
      userEmail: email,
      currentTime,
    };

    const lastClicked = localStorage.getItem("click");
    const storedData = JSON.parse(lastClicked);

    // console.log(storedData?.currentTime);

    if (storedData) {
      const timeDifference = currentTime - storedData?.currentTime;
      const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

      if (
        timeDifference < twentyFourHoursInMilliseconds &&
        storedData?.userEmail == user?.email
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You can't generate your AI-Generated Masterpiece  again within 24 hours.!",
        });
        return;
      }
    }

    const form = e.target;
    const prompt = form.prompt.value;
    const category = form.category.value;

    if (!checkUser()) return;
    if (!validate(prompt, category)) return;

    console.log({ prompt, category });
    try {
      axios
        .post("https://pic-seek-server-lake.vercel.app/api/v1/image/create", {
          email: user?.email,
          prompt,
          username: user?.displayName || "Anonymous",
          userImg:
            user?.photoUrl ||
            "https://img.icons8.com/?size=100&id=4kuCnjaqo47m&format=png&color=000000",
          category,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            localStorage.setItem("click", JSON.stringify(userInfo));
            e.target.reset();
            navigate(`/creation/${res.data?.insertedId}`);
            Swal.fire({
              title: "Your AI-Generated Masterpiece!",
              text: "Crafted with precision, powered by imagination.",
              imageUrl: `${res?.data?.url}`,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
            });
          }
        });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.message}`,
      });
    } finally {
      setLoading(false);
    }

    // const blob = new Blob([buffer], { type: "image/jpeg" });
    // const url = URL.createObjectURL(blob);
    // console.log(url);
  };
  return (
    <div>
      <PageTitle>🌱Let&apos;s Create 🐦‍🔥</PageTitle>

      <div className="w-11/12 mx-auto py-10">
        <div className="flex justify-center py-5">
          <img
            src="https://img.icons8.com/?size=96&id=8gR77jBNhfyz&format=png"
            alt=""
            className="animate-bounce"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="join w-full justify-center flex-wrap"
        >
          <div className="flex-1">
            <div className="">
              <input
                name="prompt"
                className="input w-full input-bordered join-item outline-none focus:outline-none focus:border-primary"
                placeholder="Write , Whats on your Mind🧠🧠"
              />
            </div>
          </div>
          <select
            name="category"
            className="select select-bordered join-item max-w-max outline-none focus:outline-none focus:border-primary"
          >
            <option value="">Select a Category</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="indicator">
            <button className="btn join-item btn-primary">Create</button>
          </div>
        </form>
        <div>{loading ? <Loader /> : ""}</div>
      </div>
    </div>
  );
};

export default Create;
