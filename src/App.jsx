import { useState, useEffect } from "react";
import DiagnosePage from "./pages/DiagnosePage.jsx";
import BlogListPage from "./pages/BlogListPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";

// Simpele client-side router zonder extra library
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

  // Blog post route: /blog/slug
  const blogMatch = path.match(/^\/blog\/(.+)$/);

  if (blogMatch) return <BlogPostPage slug={blogMatch[1]} navigate={navigate} />;
  if (path === "/blog") return <BlogListPage navigate={navigate} />;
  return <DiagnosePage navigate={navigate} />;
}
