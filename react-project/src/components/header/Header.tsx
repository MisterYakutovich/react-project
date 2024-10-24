import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import todo from '../../assets/todo.png';
import { NavLink } from 'react-router-dom';

function Header() {
  const [sticky, setSticky] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const currentScroll = document.documentElement.scrollTop;
      if (currentScroll > 60) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  });

  return (
    <header
      className={styles.header}
      id={sticky ? styles.sticky : styles.normal}
    >
      <div className={styles.wrapper}>
        <div className={styles.header_nav_welcome}>
          <NavLink to="/">
            <ul>
              <img src={todo} alt="ToDo" width={40} height={40} />
            </ul>
          </NavLink>
        </div>
        <div className={styles.wrapper_button}>
          <NavLink to="/home">
            <button className={styles.button}>MAIN</button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
export default Header;
