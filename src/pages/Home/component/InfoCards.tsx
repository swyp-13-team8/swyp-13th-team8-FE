/**
 * 오른쪽 Info 카드 박스
 *
 */
const InfoCards = () => {
  return (
    <div className="flex flex-col gap-5 max-w-96.25">
      <div className="w-78.75 h-48.75 rounded-3xl bg-gray-scale-30 p-8">
        <p className="text-title-h4">내 보험 바로가기</p>
      </div>
      <div className="w-78.75 h-48.75  rounded-3xl bg-gray-scale-30 p-8">
        <p className="text-title-h4">저장된 히스토리</p>
      </div>
    </div>
  );
};

export default InfoCards;
