import React from 'react';
import '../assets/css/Attacher.css';
import Button from '@material-ui/core/Button';

class Attacher extends React.Component {
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
        <div className="div--attacher-container">
            <div className="div--attacher-upload">
                <Button>Anexar</Button>
            </div>
            <div className="div--attacher-files">
                <div className="div--attacher-fileItem">
                    <p>Arquivo.png</p>
                    <div className="div--attacher-progressContainer">
                        <div className="div--attacher-progressBar"></div>
                        <div className="div--attacher-loader"></div>
                    </div>
                </div>
            </div>
        </div>
    );    
  }
}

export default Attacher;