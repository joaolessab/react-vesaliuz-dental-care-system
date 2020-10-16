import React, { Component } from "react";
import '../assets/css/Dropzone.css';

class Dropzone extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      hightlight: false 
    };
    
    this.fileInputRef = React.createRef();
  }

  openFileDialog = () => {
    if (this.props.disabled) return;
      this.fileInputRef.current.click();
  }

  onFilesAdded = (evt) => {
    if (this.props.disabled) return;
      const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  onDragOver = (event) => {
    event.preventDefault();
    if (this.props.disabed) return;
      this.setState({ hightlight: true });
  }

  onDragLeave = (event) => {
    this.setState({ hightlight: false });
  }

  onDrop = (event) => {
    event.preventDefault();
    if (this.props.disabed) return;
      const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  fileListToArray = (list) => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <div
        className={`dropzone--container ${this.state.hightlight ? "dropzone--highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="dropzone--input"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <div className="dropzone--image"/>
        <span>Solte o arquivo<br/>ou clique aqui</span>
      </div>
    );
  }
}

export default Dropzone;