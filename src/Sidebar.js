import React from 'react'
import { SideBarContainer,Icon,CloseIcon,SidebarWrapper,SidebarMenu,SidebarLinks,SideBtnWrap,SidebarRoute } from './side'
const Sidebar=({isOpen,toggle})=> {
  return (
    <SideBarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLinks to="home" onClick={toggle}>
                    Home
                </SidebarLinks>
                <SidebarLinks to="signup" onClick={toggle}>
                    signup
                </SidebarLinks>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to="/signin">Sign In</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
    </SideBarContainer>
  )
}

export default Sidebar