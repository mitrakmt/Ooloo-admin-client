import React from 'react'
import { Link } from 'react-router-dom'
import './loggedOutHome.css'

const LoggedOutHome = () => (
  <div className="loggedOutHome">
    <h1 className="loggedOutHome-heading">OOLOO APP</h1>
    <h5 className="loggedOutHome-secondaryHeading">by Oxys Technologies</h5>
    <h1 className="loggedOutHome-welcome">
      Please{' '}
      <Link to={'/login'} className="loggedOutHome-logIn">
        log in
      </Link>{' '}
      to continue
    </h1>
  </div>
)

export default LoggedOutHome
