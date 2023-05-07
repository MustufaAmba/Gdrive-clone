import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { tempFolderData } from '../utils/mockData.js';
export const initialState = {
  folderStructure: tempFolderData,
  currentFolder: null,
  setCurrentFolderData: null,
};

export const FolderContext = createContext(initialState);

FolderContext.displayName = 'FolderContext';

export const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (!context)
    throw new Error('useFolderContext must be use inside FolderContext');
  return context;
};

const FolderProvider = ({ children }) => {
  const [localData, setLocalData] = useLocalStorage(
    'folder-structure',
    tempFolderData
  );
  useEffect(() => {
    setFolderStructure(localData);
  }, []);
  const [folderStructure, setFolderStructure] = useState(localData);
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);

  const setCurrentFolderData = (data) => {
    setCurrentFolder(data);
  };

  const handleCloseFolderModal = () => {
    setOpenFolderModal(false);
  };
  const handleOpenFolderModal = () => {
    setOpenFolderModal(true);
  };

  const createFolder = (folderName) => {
    const newFolderData = {
      name: folderName,
      id: Math.floor(Math.random() * 1000),
      contents: [],
      childs: [],
    };

    const newFolderStructure = folderStructure.map((obj) => {
      recursiveFunction(obj, currentFolder?.id ?? 0, newFolderData, 'folder');
      return obj;
    });
    console.log({ newFolderStructure });
    setFolderStructure(newFolderStructure);
    setLocalData(newFolderStructure);
    setCurrentFolderData(null);
    handleCloseFolderModal();
  };

  const uploadFile = (fileDetails) => {
    const newFolderStructure = folderStructure.map((obj) => {
      recursiveFunction(obj, currentFolder?.id ?? 0, fileDetails, 'file');
      return obj;
    });
    console.log({ newFolderStructure });
    setFolderStructure(newFolderStructure);
    setLocalData(newFolderStructure);
  };

  const recursiveFunction = (currentfolder, parentId, newData, type) => {
    if (currentfolder['id'] === parentId) {
      if (type === 'folder') {
        console.log({ currentFolder });
        currentfolder['childs'] = [
          ...currentfolder['childs'],
          { ...newData, path: `${currentFolder?.path}/${newData.name}` },
        ];
        return currentfolder;
      }
      currentfolder['contents'] = [...currentfolder['contents'], newData];
      return currentfolder;
    } else {
      let temp = currentFolder;
      currentfolder['childs'].forEach((obj) => {
        temp = recursiveFunction(obj, parentId, newData, type);
      });
      return temp;
    }
  };

  const value = useMemo(
    () => ({
      folderStructure,
      currentFolder,
      setCurrentFolderData,
      setFolderStructure,
      createFolder,
      openFolderModal,
      handleCloseFolderModal,
      handleOpenFolderModal,
      uploadFile,
    }),
    [
      folderStructure,
      currentFolder,
      setCurrentFolderData,
      setFolderStructure,
      createFolder,
      openFolderModal,
      handleCloseFolderModal,
      handleOpenFolderModal,
      uploadFile,
    ]
  );
  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};

export default FolderProvider;
