import { useDispatch, useSelector } from 'react-redux';
import styles from './Sidebar.module.css';
import { RootState } from '../../redux/store';
import remove from '../../assets/remove.png';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { setAllMetadata } from '../../redux/slices/sliceMetaData';
import Modal from '../modal/Modal';
import { useTimeModal } from '../../hooks/useTimeModal';

function Sidebar() {
 const {showModal,setShowModal,remainingTime} = useTimeModal()
  const dispatch = useDispatch();
  const uploadedMetadata = useSelector(
    (state: RootState) => state.metadata.uploadedMetadata
  );

  const setFileToDelete = async (item: { fullName: string } | null) => {
    const storage = getStorage();
    const fileRef = ref(storage, `uploads/${item?.fullName}`);
    try {
      await deleteObject(fileRef);

      const updatedMetadata = uploadedMetadata.filter(
        (metadata) => metadata.fullName !== item?.fullName
      );
      dispatch(setAllMetadata(updatedMetadata));
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  const handleDeleteFile = (item: { fullName: string; } | null) => {
    setFileToDelete(item);
    setShowModal(true);
  };
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.details}>Details</h3>
      {showModal && (
        <Modal remainingTime={remainingTime}/>
      )}
      {uploadedMetadata.map((item) => (
        <ul className={styles.list_item}>
          <li key={item.name} className={styles.item}>{item.name}</li>
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
