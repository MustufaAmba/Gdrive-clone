import React from 'react';
import {
  faCaretDown,
  faChevronRight,
  faFile,
  faFolder,
  faImage,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFolderContext } from '../context/FolderContext';
const imageTypes = ['png', 'jpg', 'jpeg', 'svg'];
const FolderDisplay = () => {
  const { currentFolder, folderStructure, setCurrentFolderData } =
    useFolderContext();
  const targetFolder = currentFolder ?? folderStructure[0];
  const pathStrings = targetFolder.path.split('/');

  const getIcon = (type) => {
    if (imageTypes.find((img) => type.includes(img))) {
      return faImage;
    } else if (type.includes('pdf')) {
      return faFilePdf;
    }
    return faFile;
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {pathStrings.map((pathname, index) => {
          return (
            <div
              key={pathname}
              style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
            >
              <p>{pathname}</p>
              {index !== pathStrings.length - 1 ? (
                <FontAwesomeIcon icon={faChevronRight} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}
            </div>
          );
        })}
      </div>
      <hr />
      <h4>Folders</h4>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {targetFolder?.childs.map((folder) => {
          return (
            <div
              key={folder.id}
              onDoubleClickCapture={() => setCurrentFolderData(folder)}
              style={{
                display: 'flex',
                cursor: 'pointer',
                gap: '10px',
                alignItems: 'center',
                border: '1px solid lightgrey',
                borderRadius: '8px',
                padding: '3px 10px',
                minWidth: '200px',
              }}
            >
              <FontAwesomeIcon icon={faFolder} size={'2x'} />
              <p>
                {folder.name.length > 20
                  ? `${folder.name.slice(0, 20)}...`
                  : folder.name}
              </p>
            </div>
          );
        })}
        {!targetFolder.childs.length && !targetFolder.contents.length && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FontAwesomeIcon icon={faFolderOpen} size={'2x'} />
            <p>Folder is empty!!</p>
          </div>
        )}
        {targetFolder?.contents.map((file) => {
          return (
            <div
              key={`${file.name}${file.id}`}
              onDoubleClickCapture={() => window.open(file.url, '_blank')}
              style={{
                display: 'flex',
                cursor: 'pointer',
                gap: '10px',
                alignItems: 'center',
                border: '1px solid lightgrey',
                borderRadius: '8px',
                padding: '3px 10px',
                minWidth: '200px',
              }}
            >
              <FontAwesomeIcon icon={getIcon(file.type)} size={'2x'} />
              <p>
                {file.name.length > 15
                  ? `${file.name.slice(0, 15)}...`
                  : file.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FolderDisplay;
