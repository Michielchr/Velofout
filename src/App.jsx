import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import DiagnosePage from "./pages/DiagnosePage.jsx";
import EbikePage from "./pages/EbikePage.jsx";
import BlogListPage from "./pages/BlogListPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  };
  return { path, navigate };
}

export default function App() {
  const { path, navigate } = useRoute();
  const blogMatch = path.match(/^\/blog\/(.+)$/);
  
  let content;
  if (path === "/admin") {
    content = <AdminPage navigate={navigate} />;
  } else if (path === "/ebike") {
    content = <EbikePage navigate={navigate} />;
  } else if (blogMatch) {
    content = <BlogPostPage slug={blogMatch[1]} navigate={navigate} />;
  } else if (path === "/blog") {
    content = <BlogListPage navigate={navigate} />;
  } else {
    content = <DiagnosePage navigate={navigate} />;
  }
  
  return (
    <>
      {content}
      <Analytics />
    </>
  );
}
