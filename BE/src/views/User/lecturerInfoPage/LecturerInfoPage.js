import React, { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import * as instructorServices from '../../../apiServices/instructorServices'
import * as projectServices from '../../../apiServices/projectServices'
import dateFormat from 'dateformat'

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
} from '@coreui/react'

var instructorInfo = {
  instructorId: 0,
  iName: '',
  gender: '',
  birth: '',
  homeTown: '',
  address: '',
  email: '',
  phoneNumber: 0,
  degree: '',
  accountId: 0
};

const LecturerInfoPage = () => {
  const [lecturer, setLecturer] = useState()
  const [project, setProject] = useState([])
  const [phoneNumber, setphoneNumber] = useState('')

  var account = JSON.parse(sessionStorage.getItem('account'));

  const updateInfo = (e) => {
    e.preventDefault();
    instructorInfo.instructorId = lecturer.instructorId
    instructorInfo.iName = lecturer.iName
    instructorInfo.gender = lecturer.gender
    instructorInfo.homeTown = lecturer.homeTown
    instructorInfo.birth = lecturer.birth
    instructorInfo.email = lecturer.email
    instructorInfo.degree = lecturer.degree
    instructorInfo.accountId = lecturer.accountId

    const fetchApi = async () => {
      instructorInfo.phoneNumber = await document.getElementById('phoneNumber').value
      instructorInfo.address = await document.getElementById('address').value
      const updateInstructor = await instructorServices.updateInstructor(lecturer.instructorId, instructorInfo)
      //addToast(exampleToast)
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
      const result = await instructorServices.GetInstructorByAccount(account.accountId)
      const fetchApi1 = async () => {
        const result1 = await projectServices.getProjectbyInstructor(result.instructorId)
        setProject(result1)
      }
      fetchApi1()
      // const pj = await projectServices.getProject()
      // const selectedItem = result.find((item) => item.studentId === parseInt())
      // const selectedPj = pj.find((item) => item.student1Id === parseInt(account.email))
      setLecturer(result)
      setphoneNumber(result.phoneNumber)
      console.log(account.accountId)
    }
    fetchApi()
  }, [])
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
  const handleChange1 = (e) => {
    const value = e.target.value
    // if (e.target.value)
    // Limiting to 10 characters in this example
    if (value.length <= 9) {
      setphoneNumber(value)
    }
  }

  return (
    <div>
      {lecturer ? (
        <CCard>
          <CCardHeader>Thông tin cá nhân</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Họ và tên
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="staticEmail" value={lecturer.iName} readOnly plainText />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="text" className="col-sm-2 col-form-label">
                  Giới tính
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="inputPassword" value={lecturer.gender} readOnly plainText />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Ngày sinh
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="birth" defaultValue = { dateFormat(lecturer.birth, 'dd/mm/yyyy') } readOnly plainText/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Địa chỉ
                </CFormLabel>
                <CCol sm={7}>
                  <CFormInput type="text" id="address" defaultValue={lecturer.address} />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Quê quán
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="inputPassword" value={lecturer.homeTown} readOnly plainText />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="inputPassword" value={lecturer.email} readOnly plainText />
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
              <CRow className="mb-3">
                <CFormLabel htmlFor="degree" className="col-sm-2 col-form-label">
                  Học vị
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="degree" value={lecturer.degree} readOnly plainText />
                </CCol>
              </CRow>

              <CButton color="primary" type="submit" onClick={updateInfo}>
                Lưu thông tin
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      ) : (
        <p>Loading...</p>
      )}
      <br />
      <h1 style={{ fontSize: 20 }}>Guide project</h1>
      <CSmartTable
        activePage={2}
        columns={columns}
        columnFilter
        columnSorter
        items={project}
        itemsPerPageSelect
        itemsPerPage={20}
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
        selectable
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

export default LecturerInfoPage
