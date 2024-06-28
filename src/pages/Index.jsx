import React from "react";
import StoryList from "../components/StoryList";

const Index = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center mb-4">Hacker News Top Stories</h1>
        <StoryList />
      </div>
    </div>
  );
};

export default Index;