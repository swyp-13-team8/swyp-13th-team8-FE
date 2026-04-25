import { NavLink } from 'react-router';
import CButton from '../common/CButton';

const SideBarItems = [
  { label: '홈', path: '/home' },
  { label: '약관 분석', path: '/analysis' },
  { label: '환급금 계산기', path: '/calculator' },
  { label: '마이페이지', path: '/mypage' },
];

const Sidebar = () => {
  return (
    <aside className="hidden border-r border-gray-scale-20 bg-white md:flex md:w-[73px] xl:w-[260px] flex-col">
      <nav className="px-4 py-6 flex flex-col gap-2  ">
        {SideBarItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <CButton
                className={`w-full text-left px-2 py-4 ${isActive ? 'text-blue-200 text-button-l-sb' : 'text-gray-800'}`}
                variant={isActive ? 'tertiary' : undefined}
                size="md"
              >
                {item.label}
              </CButton>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
