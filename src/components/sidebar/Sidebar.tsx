'use client';

import { useGlobalState } from '@/context/globalProvider';
import Image from 'next/image';
import styled from 'styled-components';

import menu from '@/utils/menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const { theme } = useGlobalState();

  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image
            className="rounded-full"
            width={70}
            height={70}
            src="/profile-pic.png"
            alt="profile"
          />
        </div>
        <h1>
          <span>No</span>
          <span>Face</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          return (
            <li>
              {item.icon} <Link href={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </SidebarStyled>
  );
};

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border-right: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
`;

export default Sidebar;
