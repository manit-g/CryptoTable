import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Coins from './components/Coins'
import Coin from './routes/Coin'
import Navbar from './components/Navbar'

function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true)
        const response = await axios.get(url)
        setCoins(response.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching coins:', error)
        setError('Failed to load cryptocurrency data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [])

  // Loading component
  const LoadingSpinner = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid rgba(139, 92, 246, 0.2)',
        borderTop: '4px solid #8b5cf6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{
        color: '#a0a0a0',
        fontSize: '1.2rem',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '500'
      }}>Loading CryptoTable by MG...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  // Error component
  const ErrorMessage = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      flexDirection: 'column',
      gap: '2rem',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        fontSize: '4rem',
        color: '#ef4444'
      }}>⚠️</div>
      <h2 style={{
        color: '#ef4444',
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '1.5rem',
        margin: 0
      }}>Oops! Something went wrong</h2>
      <p style={{
        color: '#a0a0a0',
        fontSize: '1.1rem',
        maxWidth: '500px',
        lineHeight: '1.6'
      }}>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          border: 'none',
          borderRadius: '12px',
          padding: '1rem 2rem',
          color: 'white',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)'
          e.target.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.4)'
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)'
          e.target.style.boxShadow = '0 8px 16px rgba(139, 92, 246, 0.3)'
        }}
      >
        Try Again
      </button>
    </div>
  )

  return (
    <>
      <Navbar />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <Routes>
          <Route path='/' element={<Coins coins={coins} />} />
          <Route path='/coin' element={<Coin />}>
            <Route path=':coinId' element={<Coin />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
