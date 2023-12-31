import React, { useState, useEffect } from "react";
import mockGroups from "../mocks/data/groupcontent.json";
import Masonry from "react-masonry-css";
import "./styles.css";

export default function GroupInfo() {
  const [groupInfo, setGroupInfo] = useState([]);
  const [groupContent, setGroupContent] = useState([]);

  function shuffleArray(array) {
    const shuffledArray = [...array]; // Create a copy of the original array to shuffle

    // Find an entry with an image to start
    let startIndex = shuffledArray.findIndex((entry) => entry.img);

    // If no entry with an image is found, start at index 0
    if (startIndex === -1) {
      startIndex = 0;
    }

    // Shuffle the array, but start from the chosen index
    for (let i = shuffledArray.length - 1; i > startIndex; i--) {
      const j = Math.floor(Math.random() * (i - startIndex + 1)) + startIndex;
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }
  useEffect(() => {
    async function FetchGroupInfo() {
      // edit route
      const response = await fetch("http://127.0.0.1:5000/album/1");
      const data = await response.json();
      setGroupInfo(data);
    }
    async function FetchGroupContent() {
      // edit route
      //   const response = await fetch("http://127.0.0.1:5000/album/1");
      const response = mockGroups;
      //   const response = await response.json();
      const shuffledData = shuffleArray(response);

      setGroupContent(shuffledData);
    }

    FetchGroupInfo();
    FetchGroupContent();
  }, []);
  console.log("Group Content:", groupContent);
  return (
    <>
      <div className="group-info-section">
        {groupInfo ? (
          <div className="group-info-section-left">
            <h1>{groupInfo.title}</h1>
            {groupInfo.location && <p>Location: {groupInfo.location}</p>}
            {groupInfo.description && <p>{groupInfo.description}</p>}
            {groupInfo.members && <p>Members: {groupInfo.members}</p>}
            {groupInfo.start_date && groupInfo.end_date && (
              <p>
                {new Date(groupInfo.start_date).toLocaleDateString()} to{" "}
                {new Date(groupInfo.end_date).toLocaleDateString()}
              </p>
            )}
            {groupInfo.share_code && <p>Share Code: {groupInfo.share_code}</p>}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* joshes component */}
      <div className="memories-gallery">
        <Masonry
          breakpointCols={{
            default: 4, // Number of columns by default
            1100: 3, // At screen width of 1100px, display 2 columns
            700: 2, // At screen width of 700px, display 1 column
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {groupContent.map((entry) => (
            <div key={entry.id} className="memory-div">
              {entry.img && (
                <div>
                  <img src={entry.img} alt={`Image ${entry.id}`} />
                  {/* {entry.content && (
                    <p className="memory-image-content">{entry.content}</p>
                  )} */}
                </div>
              )}
              {!entry.img && entry.content && (
                <p className="memory-text-content">{entry.content}</p>
              )}
            </div>
          ))}
        </Masonry>
      </div>
    </>
  );
}
