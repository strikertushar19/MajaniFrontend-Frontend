import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const MyContent = () => {
  const [username, setUsername] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch username from cookies
        const usernameFromCookie = Cookies.get("username");
        if (!usernameFromCookie) {
          throw new Error("Username not found in cookies");
        }

        const response = await fetch(`http://localhost:8000/content/${usernameFromCookie}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setContent(data.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching content:", error);
        setLoading(false); // Update loading state in case of error
      }
    };

    // Fetch content only if username is not set
    if (!username) {
      fetchContent();
    }

    // Cleanup function
    return () => {
      // Any cleanup code goes here
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Fetch username from cookies
  useEffect(() => {
    const usernameFromCookie = Cookies.get("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div className="flex justify-center items-center m-20">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome, {username}!</h1>
          <div className="p-10 border-2">
            <p className="text-lg">{content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyContent;
