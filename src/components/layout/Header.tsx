import { useState } from 'react';
import { a, sideMenu } from '../../assets';
import CButton from '../common/CButton';
import CImg from '../common/CImg';
import { NavLink } from 'react-router';

const Header = () => {
  // 로그인 처리 하면 로직 생성
  const [login, setLogin] = useState<boolean>(true);
  return (
    <header className="flex w-full h-17 shrink-0 items-center justify-center border-b p-4 border-gray-scale-20 bg-white md:justify-between">
      <button className="absolute left-4 mr-4 md:hidden cursor-pointer ">
        <CImg src={sideMenu} alt="메뉴" />
      </button>
      {/* 로고이미지 나올 시 src 에 기입 */}
      <NavLink key={'/home'} to={'/home'}>
        <CImg className="" src="" alt="로고이미지" />
      </NavLink>
      {/* 로그인 했을 시 나올 프로필 */}
      {login ? (
        <div className="hidden w-42 h-11 md:flex gap-3 items-center justify-center">
          <div className="w-24.5 h-8 flex gap-2 items-center">
            {/* 백엔드 API 연결 후 유저 이름, 프로필 사진 받으면 변경 */}
            <CImg src={''} alt="프로필" className="w-8 h-8 rounded-full" />
            {/* 유저 이름 */}
            <p className="text-gray-scale-50 text-body-s-r truncate">{'선우용녀'} </p>
            <span className="text-gray-scale-50 text-body-s-r">님</span>
          </div>
          <CButton className="py-1.5 text-[11px] md:rounded-sm border cursor-pointer border-gray-scale-20 text-gray-scale-50 " children="로그아웃" />
        </div>
      ) : (
        <CButton className="hidden md:inline-flex px-4 py-3" variant="primary" children="로그인/회원가입" />
      )}
    </header>
  );
};

export default Header;
