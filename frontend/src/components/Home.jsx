import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

function Home() {
  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="logo">Text Enrichment Tool</h1>
        <ul className="nav-links">
          <li><Link to="/upload">Upload File</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>

          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to Enhanced Text Extraction and Enrichment Tool</h1>
        <p>
          This tool utilizes Langchain library for text extraction and OpenAI for data enrichment.
        </p>
        <p>
          It allows users to upload files, extract text from PDF formats, enrich the extracted data using OpenAI, and display the processed results in an interactive table format.
        </p>
        <p>
          Get started by <Link to="/upload">uploading a file</Link>.
        </p>
      </div>
    </div>
  );
}

export default Home;
