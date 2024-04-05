"use client";

import { useState } from "react";
import styles from "./authLinks.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {

  const [open, setOpen] = useState(false)
  const { status } = useSession();

  return (
    <>
      {
        status === "unauthenticated"
          ? <Link href="/login" className={styles.link}>login</Link>
          : <>
            <Link href="/write">write</Link>
            <span className={styles.link} onClick={() => signOut()}>logout</span >
          </>
      }
      <div className={styles.burger} onClick={() => setOpen(p => !p)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {
        open && (
          <div className={styles.responsiveMenu}>
            <Link href="/" className={styles.link}>Homepage</Link>
            <Link href="/" className={styles.link}>Contact</Link>
            <Link href="/" className={styles.link}>About</Link>
            {
              status === "unauthenticated"
                ? <Link href="/login" className={styles.link} >login</Link>
                : <>
                  <Link href="/write">write</Link>
                  <span className={styles.link} onClick={() => signOut()}>logout</span >
                </>
            }
          </div>
        )
      }
    </>
  );
};

export default AuthLinks;
