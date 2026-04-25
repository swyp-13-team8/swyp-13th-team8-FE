import CButton from '../common/CButton';
import CImg from '../common/CImg';

const Header = () => {
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-center md:justify-between border-b p-4 border-gray-scale-20 bg-white">
      <button className="absolute left-4 mr-4 md:hidden ">🍔</button>
      <CImg className="" alt="로고이미지" />
      <CButton className="hidden md:inline-flex rounded-full padding px-4 py-3" variant="primary" children="로그인/회원가입" />
    </header>
  );
};

export default Header;
