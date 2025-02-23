import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Fixed incorrect import
import Loader from "../components/shared/Loader";
import PageTitle from "./../components/shared/PageTitle";

const Creation = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetch("https://pic-seek-server-lake.vercel.app/api/v1/image/all")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false); // Data fetched, stop loading
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (
    <div>
      <PageTitle>All Creation</PageTitle>

      {loading ? (
        // Show loader while fetching
        <div className="flex justify-center items-center min-h-screen ">
          <Loader message={"Loading images..."} />
        </div>
      ) : (
        // Show images once loaded
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
          {images.map((img) => (
            <div key={img._id}>
              <div className="card card-compact bg-base-100 shadow-xl relative">
                <figure>
                  <img src={img.thumb_img} className="w-full" alt="image" />
                </figure>

                <Link
                  to={`/creation/${img._id}`}
                  className="btn btn-primary shadow-2xl absolute bottom-1 right-1"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Creation;
