import React from 'react'
import ImagesUploader from 'react-images-uploader'

import './imageUpload.css'
import 'react-images-uploader/styles.css'
import 'react-images-uploader/font.css'

const MyUploader = ({ userId, loadPhoto }) => (
  <div className="myUploader">
    <ImagesUploader
      url={`http://localhost:3001/api/image/profile/${userId}`}
      optimisticPreviews
      multiple={false}
      onLoadEnd={err => {
        if (err) {
          console.error(err)
        }
        loadPhoto()
      }}
      label="Upload your profile picture"
    />
  </div>
)

export default MyUploader
