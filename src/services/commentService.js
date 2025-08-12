import http from "./httpService";

export async function createCommentApi(data, options = {}) { 
  return http.post(`/comment/add`, data, options).then(({ data }) => data);
}

export async function getAllCommentsApi( options = {} ) {
  return http.get("/comment/list", options).then(({ data }) => data.data);
}

export async function deleteCommentApi({id,options}) {
  return http
  .delete(`/comment/remove/${id}`, options)
  .then(({ data }) => data.data);
}

export async function updateCommentApi({id,options}) {
  return http
  .patch(`/comment/update/${id}`, options)
  .then(({ data }) => data.data);
}
