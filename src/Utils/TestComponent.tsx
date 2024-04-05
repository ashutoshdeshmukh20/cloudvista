import React, { useEffect, useState } from "react";
import { get } from "../Utils/api_connection"; // Import the common request methods
import Breadcrumbs from "Components/Common/Breadcrumb";
import { Container } from "reactstrap";

const TestComponent = () => {
  const [apiData, setApiData] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await get("/list-clients");
      console.log(response); // Logging the response data
      setApiData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Clients" breadcrumbItem="Clients" />
          <div>
            <h1>Test Component</h1>
            {/* Check if data is an array before using map */}
            {Array.isArray(apiData) ? (
              <ul>
                {apiData.map((item:any) => (
                  <li key={item.id}>{item.client_name}</li>
                ))}
              </ul>
            ) : (
              <p>Data is not in the expected format</p>
            )}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TestComponent;
