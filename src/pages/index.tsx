import Comments from "@/components/modal/Comments";
import AddImageInput from "@/components/modal/input/AddImageInput";
import CommentInput from "@/components/modal/input/CommentInput";

export default function Landing() {
  return (
    <>
      <CommentInput />
      <Comments />
      <AddImageInput />
      <div>Landing</div>
    </>
  );
}
