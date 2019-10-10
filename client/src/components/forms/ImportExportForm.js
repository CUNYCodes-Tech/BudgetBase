import React from 'react';

const ImportExportForm = props => {
  return (
    <div>
      <button className="btn import-button">Import</button>
      <button className="btn export-button">Export</button>
      <button className="btn red" onClick={() => props.toggleModal()}>Close</button>
    </div>
  );
}

export default ImportExportForm;