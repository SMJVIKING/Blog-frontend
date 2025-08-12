"use server";

import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import { getAllUsersApi } from "./authService";
import { getAllCommentsApi } from "./commentService";
import { getPosts } from "./postServices";

export async function fetchCardData() {
    const cookieStore = cookies();
    const options = setCookieOnReq(cookieStore);
  
    let usersData = [];
    let postsData = [];
    let commentsData = [];
  
    try {
      usersData = await getAllUsersApi(options);
    } catch (error) {
      console.error("خطا در گرفتن کاربران:", error);
    }
  
    try {
      postsData = await getPosts();
    } catch (error) {
      console.error("خطا در گرفتن پست‌ها:", error);
    }
  
    try {
      commentsData = await getAllCommentsApi(options);
    } catch (error) {
      console.error("خطا در گرفتن کامنت‌ها:", error);
    }

    const numberOfUsers = usersData.users?.length ?? 0;
    const numberOfPosts = postsData.posts.length ?? 0;
    const numberOfComments = commentsData.commentsCount ?? 0;

    return {
      numberOfPosts,
      numberOfUsers,
      numberOfComments,
    };
  }
  