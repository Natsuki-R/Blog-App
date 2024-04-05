"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";

// SWR（Stale-While-Revalidate）是一种用于数据获取的客户端数据获取库，通常用于构建基于React的前端应用程序。它的主要目的是在提供最新数据的同时，尽可能快速地返回缓存数据，以提高性能和用户体验。SWR 允许您指定数据获取的时间间隔，并在后台自动更新数据，同时确保页面仍然能够快速响应用户操作。

// SWR 的 mutate 方法用于手动触发数据的重新获取。这在需要手动更新数据时非常有用，比如在用户进行某些操作后需要刷新数据。使用 mutate 方法可以立即更新数据，并且如果指定了 revalidate 参数，SWR 会在后台再次尝试获取最新数据，以确保数据的实时性。

// 简而言之，SWR 提供了一种在前端应用程序中有效管理数据的方法，而 mutate 方法允许您手动触发数据的重新获取，以确保数据的最新性和一致性。

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  };
  return data;
}

const Comments = ({ postSlug }) => {
  const { status } = useSession();
  const { data, mutate, isLoading } = useSWR(`http://localhost:3000/api/comments?postSlug=${postSlug}`, fetcher)
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? "loading"
          : data?.map((item) => (
            // WARING : Each child in a list should have a unique "key" prop.
            // no WARING when set key={item.user.name} ? 
            <div className={styles.comment} key={item.id}>
              <div className={styles.user}>
                {item?.user?.image && (
                  <Image
                    src={item.user.image}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.image}
                  />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.username}>{item.user.name}</span>
                  <span className={styles.date}>{item.createdAt}</span>
                </div>
              </div>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
