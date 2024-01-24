import React, { useState, useEffect, useRef } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import * as studentServices from '../../../apiServices/studentServices'
import * as projectServices from '../../../apiServices/projectServices'
import dateFormat from 'dateformat'
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

var studentInfo = {
  studentId: 0,
  sName: '',
  gender: '',
  birth: '',
  homeTown: '',
  address: '',
  email: '',
  phoneNumber: 0,
  termId: 0,
  accountId: 0
};

const PersonalInfoPage = () => {
  const [student, setStudent] = useState()
  const [project, setProject] = useState([])
  const [phoneNumber, setphoneNumber] = useState('')
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  var account = JSON.parse(sessionStorage.getItem('account'));

  const updateInfo = (e) => {
    e.preventDefault();
    studentInfo.studentId = account.email
    studentInfo.sName = student.sName
    studentInfo.gender = student.gender
    studentInfo.homeTown = student.homeTown
    studentInfo.birth = student.birth
    studentInfo.email = student.email
    studentInfo.termId = student.termId
    studentInfo.accountId = student.accountId

    const fetchApi = async () => {
      studentInfo.phoneNumber = await document.getElementById('phoneNumber').value
      studentInfo.address = await document.getElementById('address').value
      const updateStudent = await studentServices.updateStudent(account.email, studentInfo)
      addToast(exampleToast)
      //alert('Cập nhật thành công')
      // const progressResult = await projectProgressServices.createProjectProgress(projectProgress)
      // const result4 = await projectProgressServices.GetProjectProgressByProjectID(project.projectId)
      // SetProgress(result4)
    }
    fetchApi()
    //setVisibleXL(!visibleXL)
  }

  useEffect(() => {
    const fetchApi = async () => {
      const result = await studentServices.getStudentbyID(account.email)
      const pj = await projectServices.getProjectbyStudent(account.email)
      result.birth = result.birth.substring(0,10)
      // const selectedItem = result.find((item) => item.studentId === parseInt())
      // const selectedPj = pj.find((item) => item.student1Id === parseInt(account.email))
      console.log(result)
      setphoneNumber(result.phoneNumber)
      setStudent(result)
      setProject(pj)
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
        Cập nhật thành công!
      </CToastBody>
    </CToast>
  )

  const handleChange1 = (e) => {
    const value = e.target.value
    // if (e.target.value)
    // Limiting to 10 characters in this example
    if (value.length <= 9) {
      setphoneNumber(value)
    }
  }

  const columns = [
    {
      key: 'projectId',
      label: 'Id',
      filter: false,
      sorter: false,
      _style: { width: '5%' },
    },
    {
      key: 'projectName',
      label: 'Project Name',
      _style: { width: '40%' },
    },
    {
      key: 'request',
      label: 'Request',
      filter: false,
      sorter: false,
    },
    {
      key: 'iName',
      label: 'Instructor',
      filter: false,
      sorter: false,
    },
    {
      key: 'student1Id',
      label: 'Student 1',
      filter: false,
      sorter: false,
    },
    {
      key: 'student2Id',
      label: 'Student 2',
      sorter: false,
      filter: false,
    },
    {
      key: 'subjectName',
      label: 'Subject',
      sorter: false,
      filter: false,
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]
  return (
    <div>
      {student ? (
        <CCard>
          <CCardHeader>Thông tin cá nhân</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Student&apos;s code
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="studentID" value={student.studentId} readOnly plainText/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Họ và tên
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="sName" value={student.sName} readOnly plainText/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="text" className="col-sm-2 col-form-label">
                  Giới tính
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="gender" value={student.gender} readOnly plainText/>
                </CCol>
              </CRow>
  
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Ngày sinh
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="birth" defaultValue = { dateFormat(student.birth, 'dd/mm/yyyy') } readOnly plainText/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Địa chỉ
                </CFormLabel>
                <CCol sm={7}>
                  <CFormInput type="text" id="address" defaultValue={student.address} />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Quê quán
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="homeTown" value={student.homeTown} readOnly plainText/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="email" value={student.email} readOnly plainText/>
                </CCol>
              </CRow>
  
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Số điện thoại
                </CFormLabel>
                <CCol sm={2}>
                <div className="d-flex flex-row w-100">
                  <div className="d-flex flex-row m-1">(+84)</div>
                  <div className="d-flex flex-row w-100">
                      <CFormInput type="text" id="phoneNumber" value={phoneNumber} onChange = {handleChange1}/>
                  </div>
                </div>
                </CCol>
              </CRow>
  
              <CButton color="primary" type="submit" onClick={updateInfo}>
                Lưu thông tin
              </CButton>
              <CToaster ref={toaster} push={toast} placement="top-end" />
            </CForm>
          </CCardBody>
        </CCard>
      ) : (
        <p>Loading...</p>
      )}
      <br />
      <h1 style={{ fontSize: 20 }}>Past project</h1>
      <CSmartTable
        columns={columns}
        columnFilter
        columnSorter
        items={project}
        itemsPerPageSelect
        pagination
        onFilteredItemsChange={(items) => {
          console.log(items)
        }}
        onSelectedItemsChange={(items) => {
          console.log(items)
        }}
        scopedColumns={{
          name: (item) => <td style={{ fontWeight: 'bold' }}>{item.name}</td>,
          show_details: (item) => {
            return (
              <td className="py-2">
                <CInputGroup className="mb-3">
                  <Link to={`/projectDetail/${item.projectId}`}>
                    <CButton color="primary">More</CButton>
                  </Link>
                </CInputGroup>
              </td>
            )
          },
        }}
        sorterValue={{ column: 'status', state: 'asc' }}
        tableProps={{
          className: 'add-this-class',
          responsive: true,
          striped: true,
        }}
        tableBodyProps={{
          className: 'align-middle',
        }}
      />
    </div>
  )
}

export default PersonalInfoPage
