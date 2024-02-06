import { useState } from "react";
import { CommentServiceDto } from "@/lib/services/comments/schema";
import { formatDate } from "@/lib/util/formatDate";
import { comment } from "@/lib/services/comments";
import { useTrigger } from "../contexts/TriggerContext";
import Avatar from "../common/Avatar";

interface CommentsProps {
  comment?: CommentServiceDto;
}

function Comments({ comment: commentData }: CommentsProps) {
  const [editingComment, setEditingComment] = useState(commentData?.content || "");
  const [isEditing, setIsEditing] = useState(false);
  const author = commentData?.author;

  const { toggleTrigger } = useTrigger();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditingComment(commentData?.content || "");
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await comment("put", commentData?.id as number, { content: editingComment });
      toggleTrigger();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await comment("delete", commentData?.id as number);
      toggleTrigger();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-10 mt-20 w-320 tablet:w-450">
      <Avatar {...author} />
      <div className="flex flex-col">
        <div className="flex items-center gap-8">
          <span className="font-bold text-black font-Pretendard text-14">{commentData?.author.nickname}</span>
          <span className="font-normal text-gray-9FA6 font-Pretendard text-12">
            {formatDate(commentData?.createdAt as string, true)}
          </span>
        </div>
        {isEditing ? (
          <textarea
            className="p-16 mt-6 font-normal leading-normal outline-none resize-none text-12 tablet:text-14 border-1 w-270 tablet:w-400 h-70 tablet:h-110 rounded-6 border-gray-D9D9 focus:border-violet placeholder:text-gray-9FA6 font-Pretendard"
            value={editingComment}
            onChange={(e) => setEditingComment(e.target.value)}
          />
        ) : (
          <div className="mt-6 font-normal text-black w-270 tablet:w-400 font-Pretendard text-12 tablet:text-14">
            {commentData?.content}
          </div>
        )}
        <div className="flex gap-12 mt-12">
          {isEditing ? (
            <>
              <button className="font-normal underline text-gray-9FA6 font-Pretendard text-12" onClick={handleSave}>
                저장
              </button>
              <button className="font-normal underline text-gray-9FA6 font-Pretendard text-12" onClick={handleCancel}>
                취소
              </button>
            </>
          ) : (
            <>
              <button className="font-normal underline text-gray-9FA6 font-Pretendard text-12" onClick={handleEdit}>
                수정
              </button>
              <button className="font-normal underline text-gray-9FA6 font-Pretendard text-12" onClick={handleDelete}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
