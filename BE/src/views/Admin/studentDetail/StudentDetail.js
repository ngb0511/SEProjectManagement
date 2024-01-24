import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import {
  CCardBody,
  CCard,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CContainer,
  CCol,
  CRow,
  CButton,
  CCollapse,
  CInputGroup,
  CFormLabel,
  CFormInput,
  CInputGroupText,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as studentServices from '../../../apiServices/studentServices'
import * as projectServices from '../../../apiServices/projectServices'
import dateFormat from 'dateformat'

const StudentDetail = () => {
  const { id } = useParams()
  const [details, setDetails] = useState([])
  const [student, setStudent] = useState(null)
  const [project, setProject] = useState(null)
  const [activeKey, setActiveKey] = useState(1)
  const columns = [
    {
      key: 'projectName',
      _style: { width: '40%', fontSize: 17 },
      filter: false,
      sorter: false,
    },
    {
      key: 'student1Id',
      _style: { fontSize: 17 },
      filter: false,
      sorter: false,
    },
    {
      key: 'student2Id',
      _style: { fontSize: 17 },
      filter: false,
      sorter: false,
    },
    {
      key: 'subjectId',
      _style: { fontSize: 17 },
      filter: false,
      sorter: false,
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  useEffect(() => {
    // Find the item in the array based on the ID
    const fetchApi = async () => {
      const result = await studentServices.getStudentbyID(id)
      const result1 = await projectServices.getProjectbyStudent(id)
      setStudent(result)
      setProject(result1)
    }
    fetchApi()
  }, [id])

  return (
    <div>
      {student ? (
        <div>
          <br />
          <h1 style={{ fontSize: 20 }}>Student profile</h1>
          <CContainer style={{ fontSize: 18 }}>
            <CRow>
              <CCol xs={3} style={{ paddingLeft: 0 }}>
                <CCard>
                  <CCardBody>
                    <p>{student.sName}</p>
                    <p>
                      <strong>Student&apos;s code: </strong>
                      {student.studentId}
                    </p>
                    <p>
                      <strong>Term: </strong>
                      {student.termId}
                    </p>
                    <p>
                      <strong>Gender: </strong>
                      {student.gender}
                    </p>
                    <p>
                      <strong>Birthday: </strong>
                      {dateFormat(student.birth, 'dd/mm/yyyy')}
                    </p>
                    <p>
                      <strong>Hometown: </strong>
                      {student.hometown}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {student.address}
                    </p>
                    <p>
                      <strong>Phone Number: </strong>
                      {student.phonenumber}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {student.email}
                    </p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={9}>
                <CCard>
                  <CCardBody>
                    <CNav variant="tabs">
                      <CNavItem>
                        <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                          Past Projects
                        </CNavLink>
                      </CNavItem>
                    </CNav>
                    <CTabContent>
                      <CTabPane visible={activeKey === 1}>
                        <CSmartTable
                          columns={columns}
                          items={project}
                          scopedColumns={{
                            show_details: (item) => {
                              return (
                                <td className="py-2">
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => {
                                      toggleDetails(item.projectId)
                                    }}
                                  >
                                    {details.includes(item.projectId) ? 'Hide' : 'Show'}
                                  </CButton>
                                </td>
                              )
                            },
                            details: (item) => {
                              return (
                                <CCollapse visible={details.includes(item.projectId)}>
                                  <CCardBody className="p-3">
                                    <CFormLabel htmlFor="basic-url">Details</CFormLabel>
                                    <CInputGroup className="mb-3">
                                      <CInputGroupText id="basic-addon1">Semester</CInputGroupText>
                                      <CFormInput
                                        placeholder="Student 1"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={item.semester}
                                        readOnly
                                      />
                                      <CInputGroupText id="basic-addon1">Year</CInputGroupText>
                                      <CFormInput
                                        placeholder="Student 2"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={item.year}
                                        readOnly
                                      />
                                      <CInputGroupText id="basic-addon1">Point</CInputGroupText>
                                      <CFormInput
                                        placeholder="Student 2"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={item.point}
                                        readOnly
                                      />
                                    </CInputGroup>
                                    <CFormLabel htmlFor="basic-url">Project</CFormLabel>
                                    <CInputGroup className="mb-3">
                                      <Link to={`/projectDetail/${item.projectId}`}>
                                        {/* Use the CoreUI button component */}
                                        <CButton color="primary">More detail</CButton>
                                      </Link>
                                    </CInputGroup>
                                  </CCardBody>
                                </CCollapse>
                              )
                            },
                          }}
                          sorterValue={{ column: 'status', state: 'asc' }}
                          tableProps={{
                            className: 'add-this-class',
                            responsive: true,
                          }}
                          tableBodyProps={{
                            className: 'align-middle',
                          }}
                        />
                      </CTabPane>
                    </CTabContent>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default StudentDetail
/*  */
