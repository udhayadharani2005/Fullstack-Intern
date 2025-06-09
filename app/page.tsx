// app/page.tsx
"use client";
export const metadata = {
  title: "Project | Full Stack App",
  description: "Landing page of your full-stack application",
};



import React from 'react';

/**
 * Home Component
 *
 * This component serves as the main landing page, providing navigation links
 * to different sections of your full-stack application.
 */
export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f0f2f5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: '#333',
        lineHeight: '1.6',
        background: 'linear-gradient(135deg, #e0f2f7 0%, #c8e6c9 100%)',
      }}
    >
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

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <li
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
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

      <style jsx>{`
        .home-nav-link {
          display: block;
          padding: 20px 25px;
          text-decoration: none;
          color: #3498db;
          font-size: 1.3rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: color 0.2s ease-in-out;
        }

        .home-nav-link:hover {
          color: #2980b9;
        }

        ul li:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

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
