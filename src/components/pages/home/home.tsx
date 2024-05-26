import styles from './home.module.css';
import bgImage from '@/public/assets/images/home_bg.webp';
import { HomeContent } from './homeContent';
import { Image } from '@/components/ui/image';

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={bgImage} className={styles.image} alt='' fill priority />
      </div>
      <HomeContent />
    </div>
  );
};
