import { useEffect } from 'react';
import styles from './Home.module.scss';
import Form from './components/Form/Form';
import Sidebar from './components/sidebar/Sidebar';
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
} from 'firebase/storage';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setAllMetadata } from './redux/slices/sliceMetaData';

function Home() {
  const uploadedMetadata = useSelector(
    (state: RootState) => state.metadata.uploadedMetadata
  );

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
          <div className={styles.wrapper_title}>
            <h2 className={styles.title_name}>Name</h2>
            <h2 className={styles.title_link}>Link</h2>
          </div>
          {uploadedMetadata.map((item) => (
            <div className={styles.content_wrapper_name}>
              <h3 key={item.name} className={styles.item_name}>
                {item.name}
              </h3>
              <a target="_blank" href={item.url}>
                <h3 className={styles.item_link} key={item.url}>
                  Link
                </h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
