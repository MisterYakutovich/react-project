import { useState } from 'react';
import styles from './ModalUpdate.module.css';
import { getStorage, ref, updateMetadata } from 'firebase/storage';
import { setAllMetadata } from '../../redux/slices/sliceMetaData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import close from '../../assets/close.png';

interface ModalUpdateProps {
  item: { fullName: string };
  onClose: () => void;
}
function ModalUpdate({ item, onClose }: ModalUpdateProps) {
  const [newName, setNewName] = useState<string>('');
  const dispatch = useDispatch();
  const uploadedMetadata = useSelector(
    (state: RootState) => state.metadata.uploadedMetadata
  );
  const updateFileMetadata = async (item: { fullName: string }) => {
    const storage = getStorage();
    const fileRef = ref(storage, `uploads/${item.fullName}`);
    const newMetadata = {
      customMetadata: {
        name: newName,
      },
    };

    try {
      await updateMetadata(fileRef, newMetadata);

      const updatedMetadata = uploadedMetadata.map((metadata) =>
        metadata.fullName === item.fullName
          ? { ...metadata, name: newName }
          : metadata
      );
      dispatch(setAllMetadata(updatedMetadata));
     
      setNewName('');
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className={styles.hystmodal}>
      <div className={styles.hystmodal_window}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
        />
        <div className={styles.wrapper}>
          <button
            className={styles.update}
            onClick={() => updateFileMetadata(item)}
          >
            Update
          </button>
          <img
            src={close}
            alt="update"
            width={35}
            height={35}
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}
export default ModalUpdate;
