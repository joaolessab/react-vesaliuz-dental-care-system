import React from 'react';
import '../assets/css/Upload.css';
import Dropzone from "./Dropzone";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import { Emoji } from 'emoji-mart'

class Upload extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        files: [],
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false
    };
  }

  onFilesAdded = (files) => {
    var filesAdded = this.state.files.concat(files);

    // Cortando os últimos caso haja mais que 4
    if (filesAdded.length > 4){
      filesAdded = filesAdded.slice(0, 4);
    }

    this.setState({files: filesAdded});
  }

  deleteThisFile = (fileToRemove) => {
    var cleannedFiles = [];
    for (var f = 0; f < this.state.files.length; f++){
      if (this.state.files[f] !== fileToRemove){
        cleannedFiles.push(this.state.files[f]);
      }
    }

    this.setState({files: cleannedFiles});
  }

  /*async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }*/

  /*sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", "http://localhost:8000/upload");
      req.send(formData);
    });
  }*/

  render () {
    return (
        <div className="div--upload-container">
          { this.state.files.length < 4 ? "" :
          <div className="div--maximum--container">
            <p>Limite máximo de anexos atingido para o seu plano.
              <br/>
              Quer fazer upload ilimitado?
            </p>
            <div className="div--maximum--upgrade">
              <p>Clique aqui e faça um upgrade!</p>
              <Emoji emoji={{ id: 'relaxed', skin: 3 }} size={22} set={'facebook'}/>
            </div>
          </div>
          }

          <div className="div--upload-content">
            <div>
              <Dropzone
                onFilesAdded={ this.onFilesAdded }
                //disabled={this.state.uploading || this.state.successfullUploaded || this.state.files.length >= 4}
                disabled={ this.state.files.length >= 4 }
              />
            </div>
            <div className="div--upload-files">
              {this.state.files.map(file => {
                return (
                  <div key={file.name} className="div--upload-filerow">
                    <span className="div--upload-filename">{file.name}</span>
                    <div>
                      <button className="btn--upload-actions btn--upload-actions-upload"><PublishIcon /></button>
                      <button className="btn--upload-actions btn--upload-actions-download"><GetAppIcon /></button>
                      <button 
                        className="btn--upload-actions btn--upload-actions-delete"
                        onClick={() => this.deleteThisFile(file)}
                      >
                        <DeleteForeverIcon />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    );    
  }
}

export default Upload;