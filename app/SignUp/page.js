"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      if (!username || !password) {
        throw new Error("Both fields are required");
      }

      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setMessage(data.message);
      router.push("/login"); // Redirect to login page on successful signup
    } catch (error) {
      setMessage(error.message || "Error signing up user already exists");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-20 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Signup</h1>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Signup
        </button>
        {(!username || !password) && (
          <p className="text-center mt-2 text-red-500">Both fields are required</p>
        )}
        <p className="text-center mt-4 text-gray-600">{message}</p>
        <p>
          {" "}
          <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}
