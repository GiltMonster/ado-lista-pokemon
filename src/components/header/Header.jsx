import React from 'react'
import './header.css'

export default function Header() {
  return (
    <div className='container-header'>
      <header>
        <a href="/">
          <img src="https://img.icons8.com/?size=100&id=63311&format=png&color=000000" alt="React Logo" />
        </a>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
