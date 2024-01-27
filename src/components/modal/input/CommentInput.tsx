function CommentInput() {
  return (
    <>
      <div className="flex flex-col gap-3 w-450 text-wrap">
        <label className="font-Pretendard text-xl font-medium leading-normal">댓글</label>
        <input
          className="w-450 h-110 p-16 rounded-6 border-2 border-gray-D9D9 outline-none focus:border-violet placeholder:text-gray-9FA6 font-Pretendard text-base font-normal leading-normal"
          placeholder="댓글 작성하기"
        />
        <button></button>
      </div>
    </>
  );
}

export default CommentInput;
