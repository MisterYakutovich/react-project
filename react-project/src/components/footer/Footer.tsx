import github from '../../assets/github.png';
import styles from './Footer.module.css';
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.github_links}>
          <div className={styles.developers}>
            <a href="https://github.com/MisterYakutovich" target="_blank">
              <img src={github} alt="ToDo" width={40} height={40} />
            </a>
          </div>
        </div>
        <div className={styles.year}>
          <span>2024</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
