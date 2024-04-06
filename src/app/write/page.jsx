"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "react-quill/dist/quill.bubble.css"; // required 
import ReactQuill from "react-quill";
import styles from "./writePage.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";

const storage = getStorage(app); // firebase storage instance

const options = ["style", "fashion", "food", "culture", "travel", "coding", "music"];

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  // post data
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("style");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState(null);
  const [desc, setDesc] = useState("");

  // transfer the Title to slug(db)
  // such as : How To Blew Dandelions => how-to-blew-dandelions
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
        img: media,
        slug: slugify(title),
        catSlug,
      })
    })
  };

  useEffect(() => {
    const upload = () => {
      const fileName = new Date().getDate() + file.name; // for unique file name
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => { },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>loading...</div>
  };

  if (status === "unauthenticated") {
    router.push("/")
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.inputTitle}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select className={styles.select} value={catSlug} onChange={e => setCatSlug(e.target.value)}>
        {options.map((v, idx) => <option key={idx} value={v}>{v}</option>)}
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
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              {/* set htmlFor, bind with input of id="image" */}
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
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
          value={desc}
          onChange={setDesc}
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
