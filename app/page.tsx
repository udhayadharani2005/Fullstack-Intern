// This is a Client Component because we might add interactive elements later,
// but for a purely static page, it could technically be a Server Component.
// For consistency with the chatbot example, keeping it a Client Component.
"use client";

import React from 'react';

/**
 * Home Component
 *
 * This component serves as the main landing page, providing navigation links
 * to different sections of your full-stack application.
 *
 * All CSS is embedded directly within this component using inline styles
 * for simple properties and a <style jsx> block for styles that require
 * pseudo-classes like :hover.
 */
export default function Home() {
  return (
    // Main container div with inline styles for basic layout and typography
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f0f2f5', // Light background color
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: '#333',
        lineHeight: '1.6',
        background: 'linear-gradient(135deg, #e0f2f7 0%, #c8e6c9 100%)', // Soft gradient
      }}
    >
      {/* Page title with inline styles */}
      <h1
        style={{
          fontSize: '2.8rem',
          fontWeight: 800,
          color: '#2c3e50',
          marginBottom: '40px',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        🌐 Welcome to My Full Stack App
      </h1>

      {/* Navigation list with inline styles */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'flex',
          flexDirection: 'column', // Stack links vertically
          gap: '20px', // Space between items
          width: '100%',
          maxWidth: '400px', // Limit width of the list
        }}
      >
        {/* Each list item with inline styles for background, shadow, and transitions */}
        <li
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
          // You'd typically use a useState and onMouseEnter/onMouseLeave for true hover effects with inline styles
          // but for simplicity and to handle pseudo-classes, we use a <style> tag below.
        >
          <a href="/todos" className="home-nav-link">
            <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>✅</span> TODO APPLICATION
          </a>
        </li>
        <li
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
        >
          <a href="/note" className="home-nav-link">
            <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>📦</span> Notes
          </a>
        </li>
        <li
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
        >
          <a href="/chat" className="home-nav-link">
            <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>💬</span> Chat
          </a>
        </li>
      </ul>

      {/* This style block contains CSS rules for classes, especially for hover effects
          which cannot be achieved with simple inline styles.
          It's placed directly in the component as requested.
      */}
      <style jsx>{`
        .home-nav-link {
          display: block; /* Make the whole area clickable */
          padding: 20px 25px;
          text-decoration: none;
          color: #3498db; /* A vibrant blue */
          font-size: 1.3rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: color 0.2s ease-in-out;
        }

        .home-nav-link:hover {
          color: #2980b9; /* Slightly darker blue on hover */
        }

        /* Hover effect for list items, applied directly to the <li> via JavaScript or more complex CSS if needed */
        /* For this specific setup, the transition is on the <li> directly, and we rely on the parent's hover behavior.
           If you want to apply hover on <li> itself with inline styles, it requires JavaScript event listeners.
           Here, the visual effect is on the link, and the li transition is passive.
        */
        ul li:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        /* Responsive Adjustments for smaller screens */
        @media (max-width: 768px) {
          h1 {
            font-size: 2.2rem;
            margin-bottom: 30px;
          }

          ul {
            max-width: 300px;
          }

          .home-nav-link {
            font-size: 1.1rem;
            padding: 15px 20px;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.8rem;
            margin-bottom: 25px;
          }

          .home-nav-link {
            font-size: 1rem;
            padding: 12px 15px;
          }
        }
      `}</style>
    </div>
  );
}
