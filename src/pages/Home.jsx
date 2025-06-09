import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [contents, setAllContent] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("/api/v1/content/get-all-contents");
        setAllContent(response.data.data);
      } catch (error) {
        const status = error?.response?.data?.statusCode
        if(status === 401) {
          navigate("/login")
        }
      }
    };
    fetchContent();
  }, []);

  const timeAgo = (updatedAt) => {
  const date = new Date(updatedAt);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else {
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} hours ago`;
  }
};

  // console.log("AllContent: ", contents[0].updatedAt);
  return (
    <div className="p-6 w-full grid md:grid-cols-2 2xl:grid-cols-3 flex-wrap justify-center gap-8 bg-gray-100 min-h-screen">
      {contents.length === 0 ? (
        <p className="text-5xl font-extrabold text-center w-full">No content available</p>
      ) : (
        contents.slice().reverse().map((content, index) => (
          <div
            key={index}
            className="bg-white justify-self-center h-fit  w-fit rounded-lg shadow-lg overflow-hidden max-w-lg"
          >
            <div className="h-64 w-full">
              <img
                src={content.img}
                alt="Mountain"
                className="w-full h-full overflow-hidden object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {content.title}
              </h2>
              <p className="text-gray-700 leading-tight mb-4">
                {content.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-800 font-semibold">{content.auther ? content.auther : "John Doe"}</span>
                </div>
                <span className="text-gray-600"> {timeAgo(content?.updatedAt)}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
