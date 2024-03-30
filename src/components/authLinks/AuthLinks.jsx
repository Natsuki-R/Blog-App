import styles from "./authLinks.module.css";
import Link from "next/link";

const AuthLinks = () => {

  const status = "not authenticated";

  return (
    <>
      {
        status === "not authenticated"
          ? <Link href="/login">login</Link>
          : <>
            <Link href="/write">write</Link>
            <span className={styles.link}>logout</span >
          </>
      }
    </>
  );
};

export default AuthLinks;
