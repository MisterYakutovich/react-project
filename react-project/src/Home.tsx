import { useEffect } from 'react';
import styles from './Home.module.css';
import Form from './components/Form/Form';
import Sidebar from './components/sidebar/Sidebar';
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
} from 'firebase/storage';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setAllMetadata } from './redux/slices/sliceMetaData';

function Home() {
  const uploadedMetadata = useSelector(
    (state: RootState) => state.metadata.uploadedMetadata
  );
  console.log(uploadedMetadata);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFiles = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'uploads/');

      try {
        const res = await listAll(listRef);
        const metadataPromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);

          return {
            name: metadata.customMetadata?.name || '',
            fullName: metadata?.name || '',
            description: metadata.customMetadata?.description || '',
            url,
          };
        });

        const allMetadata = await Promise.all(metadataPromises);

        dispatch(setAllMetadata(allMetadata));
      } catch (error) {
        console.error('Error fetching files: ', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main_content}>
        <Form />
        <div id="item-table" className={styles.content_wrapper}>
          <div className={styles.content_wrapper_name}>
            <h2>Name</h2>
            {uploadedMetadata.map((item) => (
              <h3 className="">{item.name}</h3>
            ))}
          </div>
          <div className={styles.content_wrapper_link}>
            <h2>Link</h2>
            {uploadedMetadata.map((item) => (
              <Link target="_blank" to={item.url}>
                <h3>Link</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
