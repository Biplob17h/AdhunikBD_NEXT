import BlogListSection from "@/components/screens/blog/blogs";
import AdsBannerSection from "@/components/screens/home/app-ads";
import HeaderSection from "@/components/shared/header";

const BlogPage = () => {
  return (
    <>
      <HeaderSection title="Blog" links={["Home", "Blog"]} />
      <BlogListSection />
      <AdsBannerSection />
    </>
  );
};

export default BlogPage;
