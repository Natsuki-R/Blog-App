"use client";

import { useRouter, useState } from "react";
import Image from "next/image";
import "react-quill/dist/quill.bubble.css"; // required 
import ReactQuill from "react-quill";
import styles from "./writePage.module.css";
import { useSession } from "next-auth/react";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = () => { };


  if (status === "loading") {
    return <div className={styles.loading}>loading...</div>
  };

  if (status === "authenticated") {
    router.push("/")
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.inputTitle}
      />

      <select className={styles.select}>
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>

      <div className={styles.editor}>

        <button
          className={styles.button}
          onClick={() => setOpen(!open)}
        >
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>

        {open && (
          <div className={styles.add}>
            <button className={styles.addButton}>
              <Image src="/image.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}

        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>

      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
