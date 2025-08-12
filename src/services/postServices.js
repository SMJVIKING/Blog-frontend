import http from "./httpService";

export async function getPostBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${slug}`
  );
  // const {
  //   data: { post },
  // } = await res.json();
  const { data } = await res.json();
  const { post } = data || {};
  return post;
}

export async function getPosts(queries, options) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?${queries}`,
    options
  );
  const { data } = await res.json();
  const { posts } = data || {};
  return { posts };
}

export async function likePostApi(id) {
  return http.post(`/post/like/${id}`).then(({ data }) => data.data);
}

export async function bookmarkPostApi(id) {
  return http.post(`/post/bookmark/${id}`).then(({ data }) => data.data);
}

export async function createPostApi(data) {
  return http.post(`/post/create`, data).then(({ data }) => data.data);
}

export async function editPostApi({ id, data }) {
  return http.patch(`/post/update/${id}`, data).then(({ data }) => data.data);
}

export async function getPostById(id) {
  return http.get(`/post/${id}`).then(({ data }) => data.data);
}

// اگه مدال از نوع کلاینت طراحی بشه نیازی ب اپشن ها نیس نمیخاد کوکی بفرستیم
// => ولی سرور اکشن باشه نیازه => اینجا خودمون اپشن رو فرستادیم
export async function deletePostApi({ id, options }) {
  return http
    .delete(`/post/remove/${id}`, options)
    .then(({ data }) => data.data);
}
