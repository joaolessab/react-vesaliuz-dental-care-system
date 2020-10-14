import React from 'react';
import '../assets/css/Upload.css';
import Button from '@material-ui/core/Button';

class Upload extends React.Component {
  constructor(){
    super();

    this.state = {
        files: [],
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false
    };
  }
  
  render () {
    //const { files } = this.state;

    return (
        <div className="div--upload-container">
            <div className="div--upload-upload">
                <Button>Anexar</Button>
            </div>
            <div className="div--upload-files">
                <div className="div--upload-fileItem">
                    <p>Arquivo.png</p>
                    <div className="div--upload-progressContainer">
                        <div className="div--upload-progressBar"></div>
                        <div className="div--upload-loader"></div>
                    </div>
                </div>
            </div>
        </div>
    );    
  }
}

export default Upload;