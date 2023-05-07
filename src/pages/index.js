import FolderProvider from '../context/FolderContext';
import App from '../components/App.js';
export default function Home() {
  return (
    <FolderProvider>
      <App />
    </FolderProvider>
  );
}
