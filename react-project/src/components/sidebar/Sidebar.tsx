import { useDispatch, useSelector } from 'react-redux';
import styles from './Sidebar.module.css';
import { RootState } from '../../redux/store';
import remove from '../../assets/remove.png';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { setAllMetadata } from '../../redux/slices/sliceMetaData';

function Sidebar() {
  const dispatch = useDispatch();
  const uploadedMetadata = useSelector(
    (state: RootState) => state.metadata.uploadedMetadata
  );

  const handleDeleteFile = async (item: { fullName: string }) => {
    const storage = getStorage();
    const fileRef = ref(storage, `uploads/${item.fullName}`);
    try {
      await deleteObject(fileRef);

      const updatedMetadata = uploadedMetadata.filter(
        (metadata) => metadata.fullName !== item.fullName
      );
      dispatch(setAllMetadata(updatedMetadata));
      alert('File deleted successfully!');
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.details}>Details</h3>
      {uploadedMetadata.map((item) => (
        <ul className={styles.list_item}>
          <li className={styles.item}>{item.name}</li>
          <img
            src={remove}
            alt="ReMove"
            width={30}
            height={30}
            style={{ cursor: 'pointer' }}
            onClick={() => handleDeleteFile(item)}
          />
        </ul>
      ))}
    </div>
  );
}
export default Sidebar;
