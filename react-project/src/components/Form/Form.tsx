import { ChangeEvent, useState } from 'react';
import styles from './Form.module.scss';

import { useDispatch } from 'react-redux';
import { setUploadedMetadata } from '../../redux/slices/sliceMetaData';
import { useAddFileMutation } from '../../redux/services/api';

function Form() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [addFile] = useAddFileMutation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        const snapshot = await addFile({
          file: selectedFile,
          name,
          fullName: selectedFile?.name,
        }).unwrap();

        if (snapshot) {
          const fileData = {
            name: name,
            fullName: selectedFile?.name || '',
            url: snapshot?.url,
          };
          dispatch(setUploadedMetadata(fileData));
          alert('Успешно сохранено в базу данных');
        }
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
      } finally {
        setSelectedFile(null);
        setName('');
      }
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
