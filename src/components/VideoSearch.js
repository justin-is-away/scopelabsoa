import React from 'react';
import SearchBar from './SearchBar';

const VideoSearch = ({ videos, searchTerm, onSearchChange }) => {
  const filteredVideos = videos.filter(video => {
    const searchLower = searchTerm.toLowerCase();
    return (
      video.title.toLowerCase().includes(searchLower) ||
      video.description.toLowerCase().includes(searchLower)
    );
  });

  return {
    filteredVideos,
    searchComponent: (
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange}
      />
    )
  };
};

export default VideoSearch;