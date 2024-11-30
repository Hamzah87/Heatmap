import React, { useState, useEffect } from 'react';
import Heatmap from './components/Heatmap'; 
import './styles.css'; 

const App = () => {
  const [data, setData] = useState([]); // State hook to hold the data for the heatmap

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/data/2023expenses.json') // Fetching from the public/data folder
      .then((response) => {
        if (!response.ok) { // If the fetch response is not ok, throw an error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Transform data for the heatmap
        const formattedData = data.map((entry) => ({
          date: entry.date, // Ensure the date is in YYYY-MM-DD format
          count: entry.cost, // Use "cost" as the intensity for the heatmap
          expenses: entry.expenses, // Include "expenses" for tooltip
        }));
        console.log('Formatted data:', formattedData); // Debugging log to inspect the formatted data
        setData(formattedData); // Set the formatted data in the state
      })
      .catch((error) => {
        console.error('Error fetching or processing data:', error); // Error handling for the fetch
      });
  }, []); // Empty dependency array ensures this useEffect runs only once when the component mounts

  return (
    <div className="App">
      <h1>2023 Spending Heatmap</h1>
      {data.length > 0 ? (
        // If data is loaded, render the heatmap with the data
        <Heatmap data={data} />
      ) : (
        // If data is still loading, show a loading message
        <p>Loading data, please wait...</p> 
      )}
    </div>
  );
};

export default App;
