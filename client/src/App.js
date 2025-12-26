import React, { useState } from 'react';
import axios from 'axios';
import logo from './my logo.png'; 

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
    setStatus("Processing... ⏳");

    try {
      const response = await axios.post(process.env.REACT_APP_WEBHOOK_URL, formData);
      console.log(response.data);
      setStatus("✅ Success! Automation Started.");
    } catch (error) {
      console.error(error);
      setStatus("❌ Error! Check Backend connection.");
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(3px)',
      zIndex: 0
    },
    glassCard: {
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '420px',
      padding: '40px',
      borderRadius: '20px',
      backgroundColor: 'rgba(30, 41, 59, 0.75)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      textAlign: 'center',
      color: 'white'
    },
    inputGroup: {
      marginBottom: '20px',
      textAlign: 'left'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#cbd5e1',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      fontSize: '16px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '14px',
      borderRadius: '8px',
      border: 'none',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'transform 0.2s'
    },
    status: {
      marginTop: '20px',
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      fontWeight: 'bold',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      
      <div style={styles.glassCard}>
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '80px', height: 'auto', marginBottom: '10px' }} 
        />
        <h1 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>⚡ AutoFlow</h1>
        <p style={{ color: '#94a3b8', margin: '0 0 30px 0' }}>Web Automation Platform</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>User Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter your name" 
              style={styles.input}
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="name@example.com" 
              style={styles.input}
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Task Description</label>
            <textarea 
              name="task" 
              rows="3"
              placeholder="What should the automation do?" 
              style={{...styles.input, resize: 'vertical'}}
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" style={styles.button}>Run Automation 🚀</button>
        </form>

        {status && <div style={styles.status}>{status}</div>}
      </div>
    </div>
  );
}

export default App;