import React from 'react';
import { useState } from 'react';
import { useFolderContext } from '../context/FolderContext';

const CreateFolder = ({ open, handleClose }) => {
  const [folderName, setFolderName] = useState('');
  const { createFolder } = useFolderContext();
  return open ? (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: ' 30px',
            borderRadius: '8px',
            border: '1px solid lightgrey',
            display: 'flex',
            width: 'fit-content',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 'fit-content',
              gap: '20px',
            }}
          >
            <input
              style={{
                padding: '12px',
                border: '1px solid grey',
                fontSize: '16px',
                borderRadius: '4px',
              }}
              placeholder="Folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <div
              style={{ display: 'flex ', justifyContent: 'end', gap: '10px' }}
            >
              <button
                style={{
                  border: 'none',
                  fontSize: '16px',
                  background: 'transparent',
                }}
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'blue',
                  fontSize: '16px',
                }}
                onClick={() => {
                  createFolder(folderName);
                  setFolderName('');
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default CreateFolder;
