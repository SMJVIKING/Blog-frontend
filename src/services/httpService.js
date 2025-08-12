const { default: axios } = require("axios");

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// use access token/refresh token :
app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err)
);

app.interceptors.response.use(
  (res) => res,

  async (err) => {
    //this proccess for: if we haven't access token but have refresh token => create access token:

    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry)
      // send request ONCE not too much:
      originalConfig._retry = true;
    try {
      // to send accessToken based the refreshToken we have :
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
        {
          withCredentials: true,
        }
      );
      // send request again:
      if (data) return app(originalConfig);
    } catch (error) {
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

const http = {
  get: app.get,
  patch: app.patch,
  put: app.put,
  delete: app.delete,
  post: app.post,
};


export default http;

// جمع‌بندی عملکرد کد :
// اگر پاسخ موفق باشد، همان را برمی‌گرداند.
// اگر خطای 401 (Unauthorized) دریافت شد :
// اگر هنوز تلاش مجدد نشده، یک درخواست جدید برای refresh token ارسال می‌کند.
// اگر توکن جدید دریافت شد، درخواست اصلی را دوباره ارسال می‌کند.
// اگر شکست خورد، خطا را رد می‌کند.
// سایر خطاها بدون تغییر رد (reject) می‌شوند.

