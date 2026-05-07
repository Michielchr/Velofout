import { useState, useEffect } from "react";
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
  if (path === "/admin") return <AdminPage navigate={navigate} />;
  if (path === "/ebike") return <EbikePage navigate={navigate} />;
  if (blogMatch) return <BlogPostPage slug={blogMatch[1]} navigate={navigate} />;
  if (path === "/blog") return <BlogListPage navigate={navigate} />;
  return <DiagnosePage navigate={navigate} />;
}
