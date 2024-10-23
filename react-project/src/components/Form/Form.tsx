import { ChangeEvent, useState } from 'react';
import styles from './Form.module.scss';
import {
  getDownloadURL,
  getStorage,
  ref,
  updateMetadata,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import { setUploadedMetadata } from '../../redux/slices/sliceMetaData';

function Form() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [, setUploadedName] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    const storageRef = ref(storage, `uploads/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      console.log('File uploaded successfully!');
      return storageRef;
    } catch (error) {
      console.error('Error uploading file: ', error);

      return null;
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (selectedFile) {
      await handleFileUpload(selectedFile);

      const updatedMetadata = await updateFileMetadata();

      if (updatedMetadata) {
        setUploadedName(updatedMetadata.customMetadata?.name || '');
      }
      setSelectedFile(null);
      setName('');
    }
  };

  const updateFileMetadata = async () => {
    const filePath = 'uploads/' + selectedFile?.name;
    const storage = getStorage();
    const fileRef = ref(storage, filePath);
    const newMetadata = {
      customMetadata: {
        name: name,
      },
    };
    try {
      const updatedMetadata = await updateMetadata(fileRef, newMetadata);
      const url = await getDownloadURL(fileRef);
      const fileData = {
        name: updatedMetadata.customMetadata?.name || '',
        fullName: selectedFile?.name || '',
        url,
      };
      dispatch(setUploadedMetadata(fileData));
      alert('Успешно сохранено в базу данных');
      return updatedMetadata;
    } catch (error) {
      console.error('Error updating metadata: ', error);
      return null;
    }
  };

  return (
    <div id="form-container" className={styles.form_container}>
      <form id="item-form" onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Сustom file name"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            accept="image/*,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className={styles.add_button}>
          Save
        </button>
      </form>
    </div>
  );
}

export default Form;
