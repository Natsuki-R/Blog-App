import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/culture.png" alt="" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            11.02.2023
          </span>
          -
          <span className={styles.category}>CULTURE</span>
        </div>
        <Link href="/">
          <h1>Title</h1>
        </Link>
        <p className={styles.desc}>
          オブザーバビリティについて語るNew Relic社との共催オンラインイベント✨
          登壇企業各社が抱える課題に対してどのように解決したかを聞くことができます。ご自身が抱える課題の解決策や業務改善のヒントをぜひ収集してください💁‍♂️オブザーバビリティを実施していく上でのポイントもお伝えするので初心者の方にもおススメです！
        </p>
        <Link href="/" className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
