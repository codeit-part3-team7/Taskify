import React, { ChangeEvent, useState } from "react";
import Comments from "../Comments";
import Button from "@/components/common/Button";

function CommentInput() {
  const [comment, setComment] = useState("");
  const [submitComment, setSubmitComment] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() !== "") {
      setSubmitComment([...submitComment, comment]);
      setComment("");
    }
  };

  const handleDelete = (index: number) => {
    const updatedComments = [...submitComment];
    updatedComments.splice(index, 1);
    setSubmitComment(updatedComments);
  };

  return (
    <>
      <div className="flex flex-col gap-5 w-287 tablet:w-450 relative">
        <label className="font-Pretendard text-xl font-medium leading-normal">댓글</label>
        <textarea
          className="w-287 tablet:w-450 h-70 tablet:h-110 p-16 rounded-6 border-2 border-gray-D9D9 outline-none focus:border-violet placeholder:text-gray-9FA6 font-Pretendard text-base font-normal leading-normal resize-none"
          placeholder="댓글 작성하기"
          maxLength={180}
          value={comment}
          onChange={handleChange}
        />
        <div className="absolute bottom-15 right-15">
          <Button variant="input" onClick={handleSubmit}>
            입력
          </Button>
        </div>
      </div>
      <div>
        {submitComment.map((comment, index) => (
          <Comments key={index} submitComment={comment} onDelete={() => handleDelete(index)} />
        ))}
      </div>
    </>
  );
}

export default CommentInput;
