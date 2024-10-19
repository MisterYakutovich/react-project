import { useEffect, useState } from 'react';
import './Home.css';
import Form from './components/Form/Form';
import Sidebar from './components/sidebar/Sidebar';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import { Link } from 'react-router-dom';

function Home() {
  const [fileURLs, setFileURLs] = useState<string[]>([]);
  useEffect(() => {
    const fetchFiles = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'uploads/');

      try {
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return url;
          })
        );

        setFileURLs(urls);
      } catch (error) {
        console.error('Error fetching files: ', error);
      }
    };

    fetchFiles();
  }, []);
  console.log(fileURLs[0]);
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Form />
        <table id="item-table">
          <thead>
            <tr>
              <th>name</th>

              <th>Link</th>
            </tr>
          </thead>
          {fileURLs.map((item) => (
            <Link to={item}>
              <tbody>{item}</tbody>
            </Link>
          ))}
        </table>
      </div>
    </div>
  );
}
export default Home;
