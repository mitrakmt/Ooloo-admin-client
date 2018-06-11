import React from 'react'
import { Link } from 'react-router-dom'

import './loggedInHome.css'

const LoggedInHome = ({ username }) => (
  <div className="loggedInHome">
    <h1 className="loggedInHome-heading">Welcome{username && ` ${username}`}!</h1>
    <div className="loggedInHome-buttons">
      <p className="loggedInHome-buttons-button">
        <Link to="/interests">Interests</Link>
      </p>
      <p className="loggedInHome-buttons-button">
        <Link to="/questions">Questions</Link>
      </p>
      <p className="loggedInHome-buttons-button">
        <Link to="/schools">Schools</Link>
      </p>
      <p className="loggedInHome-buttons-button">
        <Link to="/admins">Admins</Link>
      </p>
    </div>
  </div>
)

export default LoggedInHome
