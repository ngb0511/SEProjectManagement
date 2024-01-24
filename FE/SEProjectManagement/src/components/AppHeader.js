import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  var account = JSON.parse(sessionStorage.getItem('account'));

  return (
    account.accountTypeId == 1 ? (
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">     
            <CNavItem>
              <CNavLink to="/topic" component={NavLink}>
                Topic
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/lecturer" component={NavLink}>
                Instructor
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/student" component={NavLink}>
                Student
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/projectRegistered" component={NavLink}>
                Project
              </CNavLink>
            </CNavItem>            
            <CNavItem>
              <CNavLink to="/tag" component={NavLink}>
                Tag
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/setting" component={NavLink}>
                Schedule registration
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
      </CHeader>
    ) : 
    account.accountTypeId == 2 ? (
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto"> 
            <CNavItem>
              <CNavLink to="/currentProjectForInstructor" component={NavLink}>
                Current Project
              </CNavLink>
            </CNavItem>                           
            <CNavItem>
              <CNavLink to="/lecturerInfoPage" component={NavLink}>
                Personal Info
              </CNavLink>
            </CNavItem>                    
          </CHeaderNav>
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
    ) : 
    account.accountTypeId == 3 ? (
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">  
            <CNavItem>
              <CNavLink to="/project" component={NavLink}>
                Project
              </CNavLink>
            </CNavItem>              
            <CNavItem>
              <CNavLink to="/personalInfoPage" component={NavLink}>
                Personal Info
              </CNavLink>
            </CNavItem> 
            <CNavItem>
              <CNavLink to="/currentProject" component={NavLink}>
                Current Project
              </CNavLink>
            </CNavItem>          
            <CNavItem>
              <CNavLink to="/projectList" component={NavLink}>
                Project List
              </CNavLink>
            </CNavItem>          
          </CHeaderNav>
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
    ) : (
      <></>
    )

  )
}

export default AppHeader