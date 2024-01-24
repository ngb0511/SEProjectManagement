import React, { useState, useEffect, useRef } from 'react'
import * as registerCalendarServices from '../../../apiServices/registerCalendarServices'
import * as topicRegisterServices from '../../../apiServices/topicRegisterServices'
// import moment from "moment";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CInputGroup,
  CFormLabel,
  CFormInput,
  CButton,
  CRow,
  CCol,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'

const Setting = () => {
  const [semester, setSemester] = useState('')
  const [year, setYear] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedDate1, setSelectedDate1] = useState('')
  const [selectedDate2, setSelectedDate2] = useState('')
  const [message, SetMessage] = useState()
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  var registerCalendar = {
    rcid: 0,
    startDate: '',
    endDate: '',
    semester: 0,
    ryear: 0
  }

  useEffect(() => { 
    const fetchApi = async () => {
        const day = new Date();
        setYear(day.getFullYear())

        if (day.getMonth() < 8 && day.getMonth() > 6) {
            setSemester('1')
        }
        else if (day.getMonth() >= 0 && day.getMonth() <= 2 ) {
            setSemester('2')
        } 
        else setSemester('3')
    }
    
    fetchApi()
  }, [])  

  const exampleToast = (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto">Notifications</div>
      </CToastHeader>
      <CToastBody>
        {message}
      </CToastBody>
    </CToast>
  )
  useEffect(()=>{if(message){
    addToast(exampleToast);
  }}, [message])
  const handleDate1Change = (event) => {
    setSelectedDate1(event.target.value)
  }

  const handleDate2Change = (event) => {
    setSelectedDate2(event.target.value)
  }

  const createTime = () => {
    if (!selectedDate1 || !selectedDate2) {
      SetMessage("Please fill all the blank!")
    }
    else{
      registerCalendar.startDate = selectedDate1
      registerCalendar.endDate = selectedDate2
      registerCalendar.semester = semester
      registerCalendar.ryear = year
      SetMessage("Create time successful!")
      const fetchApi = async () => {
        const result = await registerCalendarServices.createRegisterCalendar(registerCalendar)
        const result1 = await topicRegisterServices.deleteAllTopicRegister()
        console.log(result)
        
      }
  
      fetchApi()
      
    }
    
    
  }

  return (
    <div>
        <CCard>
          <CCardHeader>Project operating time</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Start date
                </CFormLabel>
                <CCol sm={3}>
                    <CFormInput type="date" id="startDate" value={selectedDate1} max={selectedDate2} onChange={handleDate1Change}/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  End date
                </CFormLabel>
                <CCol sm={3}>
                    <CFormInput type="date" id="endDate" value={selectedDate2} min={selectedDate1} onChange={handleDate2Change}/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Semester
                </CFormLabel>
                <CCol sm={2}>
                  <CFormInput type="text" id="address" defaultValue={semester} readOnly plainText/>
                </CCol>
              </CRow>  
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Year
                </CFormLabel>
                <CCol sm={2}>
                  <CFormInput type="text" id="address" defaultValue={year} readOnly plainText/>
                </CCol>
              </CRow>            
              <CButton color="primary" type="submit" onClick={createTime}>
                Create
              </CButton>
              <CToaster ref={toaster} push={toast} placement="top-end" />
            </CForm>
          </CCardBody>
        </CCard>
    </div>
  )
}

export default Setting
