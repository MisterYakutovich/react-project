import styles from './Welcome.module.scss';

function Welcome() {
  return (
    <main className={styles.main_container}>
      <section className={styles.project_description_container}>
        <h2 className={styles.welcome}>Welcome</h2>
        <span className={styles.highlighted_text}>About this app</span>
        <p className={styles.project_description}>
        In this project you can upload files in the format:
        image/*,.pdf,.doc,.docx,.xml,application/msword into the firebase/storage database.
        The files can be delete and also change the file name. 
        You can view files in a separate browser tab.
        </p>
      </section>

      <section className={styles.about}>
        <div className={styles.about_section_title}>
          <p className={styles.about_title}>
            This project was developed by
             <span>
               an aspiring web developer diving into the world of React
            </span>
          </p>
          <p className={styles.about_description_text}>PAVEL YAKUTOVICH</p>
        </div>
      </section>
    </main>
  );
}
export default Welcome;
