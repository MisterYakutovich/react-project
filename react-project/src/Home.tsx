import { useEffect } from 'react';
import styles from './Home.module.scss';
import Form from './components/Form/Form';
import Sidebar from './components/sidebar/Sidebar';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setAllMetadata } from './redux/slices/sliceMetaData';
import { useFetchFileQuery } from './redux/services/api';
import Loader from './components/loading/Loading';

function Home() {
  const dispatch = useDispatch();
  const uploadedMetadata = useSelector(
    (state: RootState) => state.metadata.uploadedMetadata
  );

  const { data: files, isLoading } = useFetchFileQuery(undefined);

  useEffect(() => {
    if (files) {
      dispatch(setAllMetadata(files));
      console.log(files);
    }
  }, [files, dispatch]);
  if (isLoading) {
    return <Loader />;
  }
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
