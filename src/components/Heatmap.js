import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css'; // Ensure styles for calendar heatmap and tooltips are imported

const Heatmap = ({ data }) => {
  return (
    <div>
      <CalendarHeatmap
        startDate={new Date('2023-01-01')} // Set the start date of the heatmap (beginning of 2023)
        endDate={new Date('2023-12-31')} // Set the end date of the heatmap (end of 2023)
        values={data} // Pass in the data to be displayed on the heatmap
        tooltipDataAttrs={(value) => {
          // Set tooltip data when hovering over a date
          if (value.date) {
            return {
              'data-tooltip-id': 'heatmap-tooltip', // Associate the tooltip with the specific date on hover
              'data-tooltip-html': `
                <div>
                  <div><strong>Date:</strong> ${value.date}</div> <!-- Display the date -->
                  <div><strong>Cost:</strong> $${value.count || 0}</div> <!-- Display the cost for that date -->
                  <div><strong>Expenses:</strong> ${value.expenses || 'None'}</div> <!-- Display the expenses for that date -->
                </div>`,
            };
          }
          // If there's no data for the date, display a default message
          return { 
            'data-tooltip-id': 'heatmap-tooltip', 
            'data-tooltip-html': '<div>No data available</div>' 
          };
        }}
        classForValue={(value) => {
          // Determines the color scale for the heatmap based on the cost value
          if (!value || value.count === 0) {
            return 'color-empty'; // For no data, return the empty color
          }
          // Dynamically generate class for color scale based on cost amount
          return `color-scale-${Math.min(4, Math.ceil(value.count / 50))}`;
        }}
      />
      <ReactTooltip id="heatmap-tooltip" html={true} /> {/* Render the tooltip when hovering over a date */}
    </div>
  );
};

export default Heatmap; 
