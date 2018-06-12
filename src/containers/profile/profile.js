import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getSchools } from 'utils/schools'
import { getUserInfo, saveUserInfo } from 'actions/user'

import Dropdown from 'react-dropdown'
import ImageUpload from 'shared-components/image-upload/imageUpload'
import AWS from 'aws-sdk'

import './profile.css'
import 'react-dropdown/style.css'

class Profile extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      availableUniversities: [],
      email: '',
      email_verified: false,
      gender: '',
      name: '',
      username: '',
      university: '',
      universityId: null,
      profileImage: '',
    }
  }

  componentWillMount() {
    this.props.dispatch(getUserInfo(this.props.auth.profile.id)).then(() => {
      let user = this.props.user.data
      this.downloadPhoto()
      this.setState(user)

      getSchools().then(universities => {
        let availableUniversities = []
        for (let i = 0; i < universities.length; i++) {
          availableUniversities.push({
            label: universities[i].name,
            value: universities[i].id,
          })
          if (this.props.user.data.university === universities[i].id) {
            this.setState({
              university: universities[i].name,
            })
          }
        }
        this.setState({
          availableUniversities,
        })
      })
    })
  }

  updateState = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  updateUniversity = university => {
    this.setState({
      universityId: university.value,
      university,
    })
  }

  saveInfo = () => {
    let userInfo = {
      name: this.state.name,
      gender: this.state.gender,
      username: this.state.username,
      university: this.state.universityId,
    }
    this.props.dispatch(saveUserInfo(userInfo))
  }

  downloadPhoto = () => {
    var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com')
    var s3 = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: process.env.REACT_APP_WASABI_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_WASABI_SECRET_KEY,
    })
    var params = {
      Bucket: 'ooloo-profile-images',
      Key: this.props.userId.toString(),
    }
    let thisContext = this

    s3.getObject(params, (err, data) => {
      if (!err) {
        var url = window.URL || window.webkitURL
        var profileImage = new Blob([new Uint8Array(data.Body)])
        var imageSrc = url.createObjectURL(profileImage)

        thisContext.setState({
          profileImage: imageSrc,
        })
      } else {
        thisContext.setState({
          profileImage: imageSrc,
        })
      }
    })
  }

  deleteProfileImage = () => {
    var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com')
    var s3 = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: process.env.REACT_APP_WASABI_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_WASABI_SECRET_KEY,
    })
    var params = {
      Bucket: 'ooloo-profile-images',
      Key: this.props.userId.toString(),
    }
    let thisContext = this

    s3.deleteObject(params, function(err, data) {
      if (!err) {
        thisContext.setState({
          profileImage: '',
        })
      } else {
        console.log(err) // an error ocurred
      }
    })
  }

  render() {
    return (
      <div className="account">
        <h1>My Account</h1>
        <div className="account-container">
          {this.state.profileImage ? (
            <div className="account-container-profilePictureContainer">
              <img className="account-container-profilePictureContainer-image" src={this.state.profileImage} />
              <button
                className="account-container-profilePictureContainer-deleteButton"
                onClick={this.deleteProfileImage}
              >
                Delete
              </button>
            </div>
          ) : (
            <ImageUpload userId={this.props.userId} loadPhoto={this.downloadPhoto} />
          )}
          <input
            className="account-container-input"
            id="name"
            onChange={this.updateState}
            placeholder="Name"
            value={this.state.name || ''}
          />
          <div className="row">
            <input
              className="account-container-input"
              disabled
              id="email"
              placeholder="Email"
              value={this.state.email || ''}
            />
            <h5
              className="account-container-info"
              style={this.state.email_verified ? { color: '#2ADBA7' } : { color: 'red' }}
            >
              Email {this.state.email_verified ? ' ' : ' not '}verified
            </h5>
          </div>
          <input
            className="account-container-input"
            id="gender"
            onChange={this.updateState}
            placeholder="Gender"
            value={this.state.gender || ''}
          />
          <input
            className="account-container-input"
            disabled
            id="username"
            placeholder="Username"
            value={this.state.username || ''}
          />
          <Dropdown
            className="account-container-dropdown"
            controlClassName="account-container-dropdown-control"
            id="university"
            menuClassName="account-container-dropdown-menu"
            onChange={this.updateUniversity}
            options={this.state.availableUniversities}
            placeholder="Select a school"
            value={this.state.university}
          />
          <button className="account-container-submitButton" onClick={this.saveInfo}>
            Save
          </button>
        </div>
      </div>
    )
  }
}

Profile.defaultProps = {
  user: null,
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

Profile.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

function mapStateToProps({ auth, user }) {
  return { auth, user, userId: user.data.id }
}

export default connect(mapStateToProps)(Profile)
