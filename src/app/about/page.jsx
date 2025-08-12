import Image from "next/image";

export const metadata = {
  // title: "درباره ما",

  title: {
    absolute: "درباره ما",
  },
};


export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-secondary-0 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary-900 mb-8">
          درباره من
        </h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary-800 mb-4">
            من کی هستم؟
          </h2>
          <p className="text-lg text-secondary-600 leading-relaxed">
            من سودا مهدیزاده هستم و این وب‌سایت رو طراحی کردم تا فضایی ساده و کاربردی برای نوشتن و خواندن بلاگ فراهم کنم. شما می‌تونید بلاگ‌های خودتون رو در دسته‌بندی‌های مختلف ایجاد کنید، بلاگ‌های دیگران رو بخونید، لایک و ذخیره کنید یا نظرتون رو زیر هر پست ثبت کنید. همچنین هر کاربر یک صفحه شخصی داره که از طریق اون می‌تونه بلاگ‌ها و دسته‌بندی‌هاش رو مدیریت یا حذف کنه.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary-800 mb-4">
            ماموریت من
          </h2>
          <p className="text-lg text-secondary-600 leading-relaxed">
            ماموریت من اینه که تجربه‌ای لذت‌بخش و حرفه‌ای از وبلاگ‌نویسی بسازم؛ جایی که هر کسی بتونه راحت بنویسه، به اشتراک بذاره، و از نوشته‌های دیگران الهام بگیره. من به قدرت کلمات و تبادل تجربه‌ها باور دارم، و تلاش می‌کنم بستری امن، پویا و کاربرمحور برای همه‌ی علاقه‌مندان به نوشتن فراهم کنم.
          </p>
        </section>
      </div>

    </div>
  )
}