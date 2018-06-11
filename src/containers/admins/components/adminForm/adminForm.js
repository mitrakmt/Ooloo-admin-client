import React from 'react'
import '../../admins.css'

const AdminForm = ({ username, email, password, adminPassword, handleKeyPress, updateState, addAdmin }) => (
  <div className="admins-addContainer">
    <div className="column">
      <input
        className="admins-addContainer-input"
        id="username"
        onChange={updateState}
        placeholder="Username"
        value={username}
      />
      <input
        className="admins-addContainer-input"
        id="email"
        onChange={updateState}
        placeholder="Email"
        value={email}
      />
      <input
        className="admins-addContainer-input"
        id="password"
        onChange={updateState}
        placeholder="Password"
        type="password"
        value={password}
      />
      <input
        className="admins-addContainer-input"
        id="adminPassword"
        onChange={updateState}
        onKeyPress={handleKeyPress}
        placeholder="Admin Password"
        type="password"
        value={adminPassword}
      />
    </div>
    <button className="admins-addContainer-button" onClick={addAdmin}>
      Submit
    </button>
  </div>
)

export default AdminForm
