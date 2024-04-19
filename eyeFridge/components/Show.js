import React, { useState, useEffect } from 'react';

const Show = () => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const fetchContents = async () => {
    try {
      const response = await fetch('.../backend/src/main/rs'); // Replace with your server URL
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Mark loading complete in any case
    }
  };

  useEffect(() => {
    fetchContents();
  }, []); // Fetch data on component mount

  return (
    <div>
      {isLoading ? (
        <p>Loading contents...</p>
      ) : (
        // Render content here using contents state
        <ul>
          {contents.map((content) => (
            <li key={content.id}>{content.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Show;
