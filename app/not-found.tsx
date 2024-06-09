import Image from 'next/image';
import notFoundPic from './notfound.png'
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
        <div className={styles.content}>
        <h1 className={styles.title}>Oups, cette page n'existe pas.</h1>
        <p className={styles.message}>
        Le lien sur lequel vous avez cliqué est peut-être cassé ou la page a été supprimée. Vous pouvez essayer à nouveau la boîte de recherche ou retourner à la <a href="/">page d'accueil</a>.
        </p>
        <div className={styles.illustration}>
        <Image src={notFoundPic} alt="Illustration d'une personne frappant 404" width={400} />
        </div>
        </div>
    </div>
 );
}

export default NotFound;
