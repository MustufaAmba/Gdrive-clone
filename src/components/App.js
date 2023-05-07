import Head from 'next/head';
import styles from '../styles/Home.module.css';
import CreateFolder from './CreateFolder';
import SideBar from './SideBar';
import { useFolderContext } from '../context/FolderContext';
import FolderDisplay from './FolderDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
const App = () => {
  const { handleCloseFolderModal, openFolderModal } = useFolderContext();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <header>
        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '10px',
            background: 'lightgray',
          }}
        >
          <FontAwesomeIcon icon={faGoogleDrive} />
          <h4 style={{ margin: 0, marginLeft: '10px' }}>Drive</h4>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '20px' }}>
        <SideBar />
        <FolderDisplay />
      </div>
      <CreateFolder
        open={openFolderModal}
        handleClose={handleCloseFolderModal}
      />
    </div>
  );
};
export default App;
