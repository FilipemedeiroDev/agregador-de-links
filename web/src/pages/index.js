import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import useProfile from '../Hooks/useProfile';

import Header from '../components/Header';
import Button from '../components/Button';
import FormLink from '../components/FormLink';

import ContentLink from '../components/ContentLink';

export default function Home() {
  const { links, getLinks, setIsLoading } =  useProfile()
  const [showFormNewLink, setShowFormNewLink] = useState(false);


  useEffect(() => {
    getLinks()
    setIsLoading(false)
  },[])

  return (
    <div className={styles.container}>
        <Header 
          page='home'
        />
        <div className={styles.content}>
          <Button 
            text='Criar novo link +'
            style={{
              maxWidth: '350px',
              height: '50px'
            }}
            handle={() => setShowFormNewLink(true)}
          >
            Criar novo link +
          </Button>
          {
            showFormNewLink &&
            <FormLink 
              setShowFormNewLink={setShowFormNewLink}
            />
          }
          <div className={styles.divider}>
          </div>
          {
            links.map(link => (
              <div className={styles.myLink} key={link._id}>
                <ContentLink 
                  link={link}              
                />
              </div>
            ))
          }
        </div>   
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { cookies } = ctx.req
    
    if(!cookies.token) {
        return {
          redirect: {
            destination: '/sign-in',
            permanent: false
          }
        }
      }
      
    return { props: {} }
}