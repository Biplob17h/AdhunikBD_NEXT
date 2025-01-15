import { BookmarkIcon, CommentIcon } from "@/components/ui/svgs";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  const { id, image, title, description, category, comments } = blog;
  return (
    <Link
      href={`/blog/${id}`}
      className="group relative block space-y-4 rounded-2xl border border-black/[0.04] bg-white p-6 drop-shadow-sm"
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="w-full rounded-2xl object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="max-w-[339px] space-y-4">
        <h3 className="line-clamp-1 text-2xl font-bold text-black/75 transition-all duration-300 ease-in-out group-hover:text-primary xl:text-[26px] xl:leading-none">
          {title}
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <BookmarkIcon />
            <span className="font-semibold">{category}</span>
          </div>
          <div className="flex items-center gap-2">
            <CommentIcon />
            <span className="font-semibold">{comments} Comments</span>
          </div>
        </div>
        <p className="text-base leading-[30px] text-black/60">{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
