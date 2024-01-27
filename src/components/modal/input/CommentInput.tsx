function CommentInput() {
  return (
    <div className="flex flex-col gap-5 w-450 relative">
      <label className="font-Pretendard text-xl font-medium leading-normal">댓글</label>
      <textarea
        className="w-450 h-110 p-16 rounded-6 border-2 border-gray-D9D9 outline-none focus:border-violet placeholder:text-gray-9FA6 font-Pretendard text-base font-normal leading-normal resize-none"
        placeholder="댓글 작성하기"
        maxLength={180}></textarea>
      <div className="absolute bottom-15 right-15">
        <button
          className=" flex w-83 h-32 justify-center items-center gap-10 flex-shrink-0 rounded-4 border-2 border-gray-D9D9 text-violet text-center font-Pretendard text-lg font-bold"
          type="submit">
          입력
        </button>
      </div>
    </div>
  );
}

export default CommentInput;
