import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import logo from './my-logo.png';

function App() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    task: ''
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", text: "Processing Automation... ⚡" });

    try {
      const response = await axios.post('http://localhost:5000/api/trigger', formData);
      console.log(response.data);
      setStatus({ type: "success", text: "✅ Workflow Executed Successfully!" });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", text: "❌ Connection Failed. Is Server Running?" });
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <img
          src={logo}
          alt="AutoFlow Logo"
          style={{ width: '100px', height: 'auto', marginBottom: '10px', filter: 'drop-shadow(0 0 15px rgba(0,242,255,0.6))' }}
        />
        <h1>AutoFlow</h1>
        <p>Intelligent Automation Hub</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>User Identity</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Task Parameter</label>
            <textarea
              name="task"
              placeholder="Define your automation task..."
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">Initiate Workflow 🚀</button>
        </form>

        {status && <div className={`status-msg ${status.type}`}>{status.text}</div>}
      </div>
    </div>
  );
}

export default App;