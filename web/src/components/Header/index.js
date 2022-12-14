import styles from './Header.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { FaBars, FaTimes } from 'react-icons/fa';
import { BsFillArrowRightSquareFill } from "react-icons/bs";

import { removeItem } from '../../utils/cookies';

import Link from 'next/link';
import useProfile from '../../Hooks/useProfile';

export default function Header({ page }) {
  const [sidebar, setSidebar] = useState(false);

  const {setProfile, setLinks} = useProfile()

  const router = useRouter();

  const handleShowSiderbar = () => {
    setSidebar(true)
    document.body.style.overflow = 'hidden'
  } 

  const handleCloseSidebar = () => {
    if (sidebar) {
        setSidebar(false)
        document.body.style.overflow = ''
    }
  }

  const handleLogout = () => {
    removeItem('token')
    removeItem('userId')
    removeItem('username')
    setProfile({})
    setLinks([])
    router.push('/sign-in')
  }

  return (
    <header className={styles.header}>
      <div className={styles.contentLogo}>
        <h1>Chama.<span>bio</span></h1>
      </div>
      <nav className={sidebar ? styles.sideBar : styles.nav}>
        <ul className={styles.ul}>
          <Link href='/' onClick={() => { document.body.style.overflow = '' }}>
            <li className={page === 'home' ? styles.liActive : styles.li}>
              Meus links
            </li>
          </Link>
        </ul>
        <ul className={styles.ul}>
          <Link href='/preview' onClick={() => { document.body.style.overflow = '' }}>
            <li className={page === 'preview' ? styles.liActive : styles.li}>
            Personalização
            </li>
          </Link>
        </ul>
        <div className={styles.closeSideBar}>
          <FaTimes
            onClick={handleCloseSidebar}
          />
        </div>
        <div className={styles.logout} onClick={handleLogout}>
         <BsFillArrowRightSquareFill 
          fontSize='18px'
          onClick={handleLogout}
         />
         Sair
        </div>
      </nav>
      <div className={styles.menu}>
        <FaBars
          color='black'
          fontSize='24px'
          onClick={handleShowSiderbar}
        />
      </div>
    </header>
  )
}