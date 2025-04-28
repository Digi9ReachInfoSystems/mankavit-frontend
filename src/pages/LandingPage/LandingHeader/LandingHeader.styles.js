import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Poppins', sans-serif;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 8px 40px;
  font-size: 14px;
  color: #333;

    @media (max-width: 576px) {
    padding: 10px 0px;
  }
`;

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 13px 40px;
  font-size: 18px;
  color: #333;
  width: 79%;
  margin: 0 auto;

  @media (max-width: 1320px) {
    padding: 5px 30px;
  }

  @media (max-width: 1024px) {
    width: 90%;    
  }

    @media (max-width: 576px) {
    padding: 0px;
  }
`;

export const Headline = styled.div`
  font-size: 24px;

  span {
    color: red;
    margin-left: 5px;
  }

  @media (max-width: 1636px) {
    font-size: 16px;
  }

  @media (max-width: 1320px) {
    font-size: 12px;
  }

  @media (max-width: 576px) {
    font-size: 9px;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 1320px) {
    gap: 20px;
  }

  @media (max-width: 576px) {
    gap: 8px;
  }
`;

export const Image = styled.img`
  width: 36px;
  height: 30px;

  @media (max-width: 1636px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 1320px) {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 576px) {
    width: 12px;
    height: 12px;
  }
`;

export const NavbarMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  margin-top: 20px;
`;

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
  background: transparent;
  width: 86%;
  margin: 0 auto;

  .menu-container{
    display: flex;
    align-items: center;
    gap:30px;
    width:74%;

    @media (max-width: 1024px) {
      gap: 15px;
    }
    
  }

  @media (max-width: 1320px) {
    padding: 10px 30px;
  }


  @media (max-width: 1024px) {
    width: 100%;
    padding: 10px 30px;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    width: 80%;
  }


`;

export const Logo = styled.div`
  font-size: 36px;
  font-weight: 400;
  color: #252525;

  @media (max-width: 1636px) {
    font-size: 25px;
  }

  @media (max-width: 1320px) {
    font-size: 20px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 5.5pc;
  align-items: center;

  @media (max-width: 1757px) {
    gap: 3pc;
  }

  @media (max-width: 1636px) {
    gap: 2pc;
  }

  @media (max-width: 768px) {
    display: none;
flex-direction: column;
        gap: 20px;
        background-color: white;
        padding: 20px;
        position: absolute;
        top: 0;
        /* left: 0; */
        right: 0;
        z-index: 999;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        width: 30%;
        height: 100%;
        align-items: flex-start;


    &.open {
      display: flex;
    }
  }
`;

export const NavLinkItem = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 24px;
  color: #252525;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #0072ff70;
  }

  &:active {
    color: #0072ff;
  }

  &.active {
    color: #0072ff;
    font-weight: 500;
  }

  @media (max-width: 1636px) {
    font-size: 16px;
  }

  @media (max-width: 1320px) {
    font-size: 14px;
  }
`;


export const Dropdown = styled.div`
  position: absolute;
  top: 28px;
  left: 0;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;


export const DropdownItem = styled.div`
  padding: 8px 20px;
  white-space: nowrap;
  color: #252525;
  cursor: pointer;

  &:hover {
    color: #0072ff70;
    background-color: #f5f5f5;
  }

  &:active {
    color: #0072ff;
  }
`;


export const SignInButton = styled.button`
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: #F5F5F5;
  border: none;
  padding: 27px 32px;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    opacity: 0.9;
  }

    @media (max-width: 1636px) {
    font-size: 16px;
    padding: 16px 24px;
  }

  @media (max-width: 1320px) {
    font-size: 14px;
    padding: 12px 18px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 10px 15px;
    
  }
`;

export const NavbarContent  = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 50px;
  align-items: center;
  padding: 18px 0px 18px 40px;
  background: transparent;
  width: 80%;

  @media (max-width: 1636px) {
    gap: 30px;
    width: 90%;
  }

  @media (max-width: 1320px) {
    padding: 10px 0px 10px 20px;
}

  .dashboard-container{
    display: flex;
    align-items: center;
    gap: 40px;

    @media (max-width: 1024px) {
      gap: 20px;
    }
  }

  .notification-icon {
    font-size: 24px;
    color: #252525;
    cursor: pointer;

    @media (max-width: 1636px) {
      font-size: 20px;
    }

    @media (max-width: 1320px) {
      font-size: 16px;
    }
  }
`;

export const DashboardButton = styled.button`
  background: transparent;
  color: #0072ff;
  border: 1px solid #0072ff;
  padding: 20px 32px;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 1636px) {
    font-size: 16px;
    padding: 16px 24px;
  }

  @media (max-width: 1320px) {
    font-size: 14px;
    padding: 10px 18px;
  }

  .profile-icon{
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 1636px) {
    width: 20px;
    height: 20px;
  }
  }
`;

export const Hamburger = styled.div`
  display: none;
  font-size: 28px;
  margin-left: 15px;
  color: #252525;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 576px) {
    font-size: 24px;
    margin-left: 0;
  }
`;

