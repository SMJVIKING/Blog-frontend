import vazirFont from "@/constants/localFont";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/styles/globals.css";

export const metadata = {
  title: {
    template: " %s | بلاگ اپ",
    default: "بلاگ اپ",
  },
  description: "وب اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const mode = localStorage.getItem("isDarkMoode");
                  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  const isDark = mode === null ? prefersDark : JSON.parse(mode);
                  document.documentElement.classList.add(isDark ? "dark-mode" : "light-mode");
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${vazirFont.variable} font-sans min-h-screen`}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}