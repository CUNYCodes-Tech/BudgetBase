import React, {Component} from 'react';

class ImportExport extends React.Component {
  render() {
    return (
      <div className="center import/export-container">
        <div>
            <button className="btn import-button">Import</button>
            <button className="btn export-button">Export</button>
        </div>
                                  
      </div>
    );
  }
}

export default ImportExport;