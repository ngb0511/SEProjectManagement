import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CSmartTable } from '@coreui/react-pro'
import * as projectServices from '../../../apiServices/projectServices'
import * as instructorServices from '../../../apiServices/instructorServices'
import * as projectResourceServices from '../../../apiServices/projectResourceServices'
import * as studentServices from '../../../apiServices/studentServices'
import * as projectProgressServices from '../../../apiServices/projectProgressServices'
import * as projectDetailServices from '../../../apiServices/projectDetailServices'
import dateFormat from 'dateformat'

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
  CBadge,
  CListGroup,
  CListGroupItem,
  CInputGroup,
  CFormTextarea,
} from '@coreui/react'
import { useParams } from 'react-router-dom'

const ProjectDetail = () => {
  const { id } = useParams()
  const [item, setItem] = useState()
  const [files, setFiles] = useState([])
  const [links, setLinks] = useState([])
  const [student1, SetStudent1] = useState()
  const [student2, SetStudent2] = useState(null)
  const [activeKey, setActiveKey] = useState(1)
  const [progress, SetProgress] = useState([])
  const [projectDetail, SetProjectDetail] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await projectServices.getProjectbyID(id)
      const fetchApi1 = async () => {
        const result2 = await studentServices.getStudentbyID(result[0].student1Id)
        if (result[0].student2Id != null) {
          const result3 = await studentServices.getStudentbyID(result[0].student2Id)
          SetStudent2(result3)
        }
        var fileArr = [];
        const fileResult = await projectResourceServices.getProjectResourcebyID(result[0].projectId);
        setFiles(fileResult);
        
        for (var i = 0; i < fileResult.length; i++) {
          fileArr.push(fileResult[i].resourcesName)
        }
        setLinks(fileArr);
        const result4 = await projectProgressServices.GetProjectProgressByProjectID(result[0].projectId)
        const result5 = await projectDetailServices.getTagByProjectID(result[0].projectId)
        SetStudent1(result2)
        SetProgress(result4)
        SetProjectDetail(result5)
      }
      fetchApi1()
      setItem(result[0])
    }
    fetchApi()
  }, [])
  const getBadge = (status) => {
    switch (status) {
      case 'Web':
        return 'success'
      case 'Mobile App':
        return 'dark'
      case 'Desktop App':
        return 'warning'
      case 'Game':
        return 'info'
      case 'Tech Research':
        return 'danger'
      case 'button':
        return 'light'
      default:
        return 'info'
    }
  }

  return (
    <div>
      {item ? (
        <div>
          <CCard>
            <CRow>
              <CCol sm="10">
                <CCardBody>
                  <h1 style={{ fontSize: 24 }}>{item.projectName}</h1>
                  <CContainer>
                    <CRow>
                      <CCol xs="2" style={{ paddingLeft: 0 }}>
                        <CBadge color="success" style={{ fontSize: 14 }}>
                          Project {item.subjectId}
                        </CBadge>
                      </CCol>
                      <CCol xs="10">
                        <p>Lecturer: {item.iName}</p>
                      </CCol>
                    </CRow>
                  </CContainer>
                </CCardBody>
              </CCol>
              <CCol sm="2">            
                <CCardBody>
                  <p style={{ textAlign:'center' }}>Point: </p>
                  <p style={{ fontSize: 18, textAlign:'center' }}><strong>{item.point}</strong></p>
                </CCardBody>
              </CCol>
            </CRow>
          </CCard>
          <br />
          <h1 style={{ fontSize: 20 }}>Students participate</h1>
          <CContainer style={{ fontSize: 18 }}>
            <CRow>
              <CCol xs={6} style={{ paddingLeft: 0 }}>
                <CCard>
                    {student1 ? (                  <CCardBody>
                    <p>Student 1: <Link to={`/studentDetail/${student1.studentId}`}>{student1.sName}</Link></p>
                  </CCardBody>): (                  <CCardBody>
                    <p>Student 1: </p>
                  </CCardBody>)}

                </CCard>
              </CCol>
              <CCol xs={6} style={{ paddingRight: 0 }}>
                <CCard>
                {student2 ? (                  
                <CCardBody>
                    <p>Student 2: <Link to={`/studentDetail/${student2.studentId}`}>{student2.sName}</Link></p>
                  </CCardBody>): 
                  (                  
                  <CCardBody>
                    <p>Student 2: </p>
                  </CCardBody>)}
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
          <br />
          <CCard>
            <CCardBody>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                    Description
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
                    Progress Task
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
                    Technology
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
                    File
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane visible={activeKey === 1}>
                  <CInputGroup className="mb-3">
                    <CFormTextarea  type="textArea" id="basic-addonurl" aria-describedby="basic-addon3" defaultValue={item.description} readOnly plainText/>
                  </CInputGroup>
                </CTabPane>
                <CTabPane visible={activeKey === 2}>
                  <CListGroup accent="success">
                    {progress.map((item)=>(
                        <CListGroupItem key={item.progressId}>
                        <div className="d-flex flex-row">

                            <div>{item.studentId} - {item.progressName}</div>

                        </div>
                            <div className="d-flex flex-row">
                            <small>{dateFormat(item.startDate, 'dd/mm/yyyy')} - {dateFormat(item.endDate, 'dd/mm/yyyy')}</small>
                        </div>
                    </CListGroupItem>
                    ))}  
                  </CListGroup>
                </CTabPane>
                <CTabPane visible={activeKey === 3}>
                <CListGroup accent="success" className="d-flex flex-row mt-2 p-1">
                    {projectDetail.map((item)=>(
                      <div className="d-flex flex-row m-1" key={item.tagId}>
                        <h5> <CBadge color={getBadge(item.tagName)}>{item.tagName}</CBadge></h5>
                      </div>
                    ))}     
                  </CListGroup>
                </CTabPane>
                <CTabPane visible={activeKey === 4}>
                  <div className="d-flex w-100 m-3">
                    <CListGroup accent="success">
                      {files.map((item)=>(
                          <CListGroupItem key={item.resourcesId}>
                            <div className="d-flex flex-row">
                              <a href={item.filePath}>{item.resourcesName}</a>
                            </div>
                        </CListGroupItem>
                      ))}       
                    </CListGroup>
                  </div>
                </CTabPane>
              </CTabContent>
            </CCardBody>
          </CCard>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProjectDetail
/*  */
