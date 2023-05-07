import { useState } from 'react';
import { useFolderContext } from '../context/FolderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCaretDown,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
const Folder = ({ data }) => {
  const { setCurrentFolderData, currentFolder } = useFolderContext();
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          paddingLeft: '20px',
          margin: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '10px 20px 10px 0px',
            width: '200px',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            color: currentFolder?.id === data.id ? '#3375F6' : 'black',
            backgroundColor:
              currentFolder?.id === data.id ? '#EAF1FE' : 'transparent',
          }}
        >
          {data.childs.length ? (
            <FontAwesomeIcon
              icon={toggle ? faCaretDown : faCaretRight}
              onClick={() => setToggle((state) => !state)}
              color="black"
            />
          ) : null}
          <FontAwesomeIcon icon={faFolder} color="black" />
          <li
            style={{
              cursor: 'pointer',
            }}
            onClick={(e) => setCurrentFolderData(data)}
          >
            {data.name}
          </li>
        </div>
        {toggle
          ? data.childs.map((child) => <Folder data={child} key={data.id} />)
          : null}
      </ul>
    </div>
  );
};
export default Folder;
