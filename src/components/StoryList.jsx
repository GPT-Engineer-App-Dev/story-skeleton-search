import React, { useState } from "react";
import { useQuery } from "react-query";
import StoryCard from "./StoryCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const fetchTopStories = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storyIds = await response.json();
  const stories = await Promise.all(
    storyIds.slice(0, 100).map(async (id) => {
      const storyResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return storyResponse.json();
    })
  );
  return stories;
};

const StoryList = () => {
  const { data, error, isLoading } = useQuery("topStories", fetchTopStories);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-24 mb-4" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error loading stories</div>;
  }

  const filteredStories = data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      {filteredStories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
};

export default StoryList;