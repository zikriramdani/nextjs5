import styles from '../../styles/Home.module.css';
import Heads from '../../components/Heads';
import Footer from '../../components/Footer';
import LoginForm from './components/loginForm';

const Index = () => {
  return (
    <>
      <div className={styles.container}>
        <Heads />

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="/">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started Login
          </p>

          <LoginForm />
        
        </main>

        <Footer />
      </div>
    </>
  )
}
  
  export default Index;