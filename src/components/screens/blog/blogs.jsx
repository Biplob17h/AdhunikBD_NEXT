import { blogs } from "@/data/blogs.data";
import BlogCard from "./blog";

const BlogListSection = () => {
  return (
    <section className="py-16 xl:py-32">
      <div className="container_fluid">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogListSection;
