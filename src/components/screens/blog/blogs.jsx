"use client";
import { blogs } from "@/data/blogs.data";
import { motion } from "framer-motion";
import BlogCard from "./blog";

const BlogListSection = () => {
  return (
    <section className="py-16 xl:py-32">
      <div className="container_fluid">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5 + index * 0.1,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogListSection;
