import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  var account = JSON.parse(sessionStorage.getItem('account'));
  const navigate = useNavigate()

  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem('account')))
    if (JSON.parse(sessionStorage.getItem('account')) === null) {
      navigate('/#')
      return
    }
  }, [])

  return (
  <div>
  {account ? ( <div>
    {account.accountTypeId == 1 ? (<AppSidebar />):(<></>)}   
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>) : (<></>)}
  </div>
  )
}

export default DefaultLayout
