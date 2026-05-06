import { close, check } from '../../../../assets';
import CImg from '../../../../components/common/CImg';

const UserInfoModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 ">
      <div className="w-[520px] bg-white rounded-[32px] p-10 relative shadow-2xl">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-8 right-8">
          <CImg src={close} alt="닫기" className="w-6 h-6 opacity-40 hover:opacity-100" />
        </button>

        <h3 className="text-center text-[20px] font-bold mb-8">유저 정보</h3>

        {/* 프로필 편집 영역 */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-scale-10">
              <div className="w-full h-full bg-gray-100" />
            </div>
            <button className="absolute bottom-0 right-0 bg-gray-scale-80 p-1.5 rounded-full border-2 border-white">
              {/* 카메라 아이콘 자리 */}
              <div className="w-4 h-4 bg-white rounded-sm" />
            </button>
          </div>
          <button className="text-primary-50 text-[12px] font-medium mt-3  border-primary-50 leading-tight">기본 이미지로 설정</button>
          <div className="mt-4 text-[22px] font-bold">실손핏 님</div>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-6">
          <div>
            <label className="block text-title-h5 font-bold mb-5">
              닉네임 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue="실손핏"
                className="w-full h-[56px] border border-gray-scale-10 rounded-xl px-5 text-[16px] focus:border-primary-50 outline-none"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-scale-40 text-body-s-m">3/10</span>
            </div>
            <div className="flex gap-2">
              <img src={check} className="w-[20px] h-[20px] mt-2 opacity-60 " />
              <p className="text-body-s-m text-gray-scale-50 mt-2 flex items-center gap-1">이모티콘 및 특수기호, 띄어쓰기 사용이 불가합니다.</p>
            </div>
          </div>

          <div>
            <label className="block text-title-h5 font-bold mb-5">회원 정보</label>
            <div className="space-y-3">
              <div className="flex gap-20 text-[15px]">
                <span className="text-gray-scale-40">이름</span>
                <span className="text-gray-scale-90 font-medium">실*핏</span>
              </div>
              <div className="flex gap-15 text-[15px]">
                <span className="text-gray-scale-40">이메일</span>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px]">K</div>
                  <span className="text-gray-scale-90 font-medium">SilsonFit@kakao.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-3 mt-12 ">
          <button
            onClick={onClose}
            className="flex-1 h-[60px] bg-gray-scale-5 text-gray-scale-60 font-bold rounded-2xl hover:bg-gray-scale-10 cursor-pointer"
          >
            취소
          </button>
          <button className="flex-1 h-[60px] bg-primary-50 text-white font-bold rounded-2xl shadow-lg shadow-primary-50/20 cursor-pointer">
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
