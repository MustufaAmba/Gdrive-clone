import {
    faFileArrowUp,
    faFolderOpen,
    faFolderPlus,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import React, { useState, useRef } from 'react';
  import Folder from '../components/Folder';
  import { useFolderContext } from '../context/FolderContext';
  const SideBar = () => {
    const { folderStructure, handleOpenFolderModal, uploadFile } =
      useFolderContext();
    const [openMenu, setOpenMenu] = useState(false);
    const windowRef = useRef(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const handleMenuClick = (event) => {
      if (event.target.localName === 'div') {
        setOpenMenu(false);
      }
    };
  
    const handleOpenFolder = (e) => {
      e.preventDefault();
      handleOpenFolderModal();
    };
  
    const handleFileUpload = (event) => {
      if (event.target.files.length) {
        const { name, size, type } = event.target.files[0];
        const fileDetails = {
          name,
          size,
          type,
          url: URL.createObjectURL(event.target.files[0]),
        };
        uploadFile(fileDetails);
      }
    };
  
    return (
      <div>
        <button
          ref={buttonRef}
          style={{
            border: 'none',
            margin: '10px',
            background: 'transparent',
            borderRadius: '20px',
            padding: '20px 40px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          }}
          onClick={() => setOpenMenu(true)}
        >
          New
        </button>
        {openMenu && (
          <div
            ref={windowRef}
            style={{
              position: 'fixed',
              top: buttonRef?.current?.clientHeight || 0,
              left: 10,
              height: '100%',
              width: '100%',
              background: 'transparent',
            }}
            onClick={handleMenuClick}
          >
            <div
              ref={menuRef}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid lightgrey',
                width: '18vw',
              }}
              onClick={handleMenuClick}
            >
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                <li style={{ cursor: 'pointer' }} onClick={handleOpenFolder}>
                  <FontAwesomeIcon
                    icon={faFolderPlus}
                    color={'grey'}
                    style={{ marginRight: '5px' }}
                  />
                  Folder
                </li>
                <hr />
                <li
                  style={{
                    cursor: 'pointer',
                    gap: '5px',
                    display: 'flex',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFileArrowUp}
                    color={'grey'}
                    style={{ marginRight: '5px' }}
                  />
                  <form>
                    <label htmlFor="fileButton" style={{ cursor: 'pointer' }}>
                      {' '}
                      File Upload
                    </label>
                    <input
                      onChange={handleFileUpload}
                      type="file"
                      id="fileButton"
                      style={{ display: 'none' }}
                    />
                  </form>
                </li>
                <li
                  style={{
                    cursor: 'pointer',
                    gap: '5px',
                    display: 'flex',
                    marginTop: '10px',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFolderOpen}
                    color={'grey'}
                    style={{ marginRight: '5px' }}
                  />
                  <label htmlFor="folderBtn" style={{ cursor: 'pointer' }}>
                    {' '}
                    Folder Upload
                  </label>
            
                </li>
              </ul>
            </div>
          </div>
        )}
        {folderStructure.map((data) => {
          return <Folder data={data} key={data.id} />;
        })}
      </div>
    );
  };
  export default SideBar;
  