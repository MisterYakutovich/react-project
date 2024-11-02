import { ChangeEvent, useState } from 'react';
import styles from './Form.module.scss';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import { setUploadedMetadata } from '../../redux/slices/sliceMetaData';

function Form() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = async (file: File) => {
    //selectedFile
    if (!file) return;
    const storageRef = ref(storage, `uploads/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file, {
        customMetadata: {
          name: name,
        },
      });
      console.log('File uploaded successfully!');
      setName(snapshot.metadata.customMetadata?.name || '');
      return storageRef;
    } catch (error) {
      console.error('Error uploading file: ', error);

      return null;
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (selectedFile) {
      const storage = await handleFileUpload(selectedFile);
      if (storage) {
        // const [url, updatedMetadata] = await Promise.all([
        //  getDownloadURL(storage),
        //  updateMetadata(storage, {
        //   customMetadata: {
        //    name: name,
        //   },
        //  }),
        //  ]);
        const url = await getDownloadURL(storage);
        const fileData = {
          name: name,
          fullName: selectedFile?.name || '',
          url,
        };
        dispatch(setUploadedMetadata(fileData));
        alert('Успешно сохранено в базу данных');
      }
      setSelectedFile(null);

      setName('');
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
