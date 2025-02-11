import BlogListSection from "@/components/screens/blog/blogs";
import AdsBannerSection from "@/components/screens/home/app-ads";
import HeaderSection from "@/components/shared/header";
import Navbar from "@/components/shared/navbar";

const BlogPage = () => {
  return (
    <>
    <Navbar/>
      <HeaderSection title="Blog" links={["Home", "Blog"]} />
      <BlogListSection />
      <AdsBannerSection />
    </>
  );
};

export default BlogPage;
