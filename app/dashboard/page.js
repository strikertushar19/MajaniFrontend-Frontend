"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import MyContent from "@/components/Mycontent";

function UpdateContent() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    setUsername(storedUsername || "");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage(""); // Clear any previous error messages

    try {
      const url = new URL("http://localhost:8000/update"); // Adjust for your API URL
      url.searchParams.append("username", username);
      url.searchParams.append("content", content);

      const response = await fetch(url.toString(), {
        method: "PUT", // Use GET method for query parameters
        headers: {
          "Content-Type": "application/json", // Optional header
          // Add any authentication headers required by your API
        },
        body: JSON.stringify({ username, content }), // Send data as JSON
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setContent(""); // Clear the content input after successful update
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include", // include cookies in the request
      });
      if (response.ok) {
        Cookies.remove("username"); // Remove username cookie
        router.push('/login'); // Redirect to the login page on client-side only
        // You can perform additional logout actions here
        // For example, redirect the user to the login page
        // window.location.href = '/login';
      } else {
        throw new Error("Logout failed");
      }

    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const [ucontent, setuContent] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const abortController = new AbortController();


    const fetchContent = async () => {

      try {

        // Fetch username from cookies

        const usernameFromCookie = Cookies.get("username");

        if (!usernameFromCookie) {

          throw new Error("Username not found in cookies");

        }


        const response = await fetch(

          `http://localhost:8000/content/${usernameFromCookie}`,

          { signal: abortController.signal }

        );

        if (!response.ok) {

          throw new Error("User not found");

        }

        const data = await response.json();

        setuContent(data.content);

        setLoading(false);

      } catch (error) {

        console.error("Error fetching content:", error);

        setLoading(false); // Update loading state in case of error

      }

    };


    fetchContent();


    return () => {

      abortController.abort();

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
    <>
      <div className="flex justify-center mt-20">
        <p className=" p-3 bg-red-600 w-[200px] h-[50px] text-center text-white rounded-xl" onClick={handleLogout}>
          Logout
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-40">
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username:
          </label>
          <p>{username}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2"
          >
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-md p-2"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Update
        </button>
      </form>
      <div className="flex justify-center items-center m-20">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome, {username}!</h1>
          <div className="p-10 border-2">
            <p className="text-lg">{ucontent}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default UpdateContent;
