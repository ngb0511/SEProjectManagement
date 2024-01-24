import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import * as projectServices from '../../../apiServices/projectServices'
import * as instructorServices from '../../../apiServices/instructorServices'
import * as studentServices from '../../../apiServices/studentServices'
import * as projectProgressServices from '../../../apiServices/projectProgressServices'
import * as topicRegisterServices from '../../../apiServices/topicRegisterServices'
import * as projectDetailServices from '../../../apiServices/projectDetailServices'
import * as projectResourceServices from '../../../apiServices/projectResourceServices'
import * as tagServices from '../../../apiServices/tagServices'
import dateFormat from 'dateformat'

import {
  CCardBody,
  CCard,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CBadge,
  CListGroup,
  CListGroupItem,
  CButton,
  CCollapse,
  CRow,
  CCol,
  CContainer,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
  CFormSelect,
  CModalFooter,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { cilCursor } from '@coreui/icons'

var mailData = {
  EmailToName: '',
  EmailSubject: '',
  EmailBody: '',
};

const CurrentProject = () => {
  const [item, setItem] = useState(null)
  const [instructor, setInstructor] = useState()
  const [instructorName, setInstructorName] = useState()
  //const [student, SetStudent] = useState()
  const [student1, SetStudent1] = useState()
  const [student2, SetStudent2] = useState()
  const [progress, SetProgress] = useState([])
  const [project, SetProject] = useState()
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState();
  const [projectDetail, SetProjectDetail] = useState([])
  const [tag, SetTag] = useState()
  const [selectedOption, setSelectedOption] = useState()
  const [visibleXL, setVisibleXL] = useState(false)
  const [visible, setVisible] = useState(false)
  const [activeKey, setActiveKey] = useState(1)
  const [selectedDate1, setSelectedDate1] = useState('')
  const [selectedDate2, setSelectedDate2] = useState('')
  const [toast, addToast] = useState(0)
  const [message, SetMessage] = useState()
  const [question, SetQuestion] = useState()
  const [semester, SetSemester] = useState()
  const toaster = useRef()

  var account = JSON.parse(sessionStorage.getItem('account'))
  const today = new Date().toISOString().split('T')[0];

  var updatedProject = {
    projectId: 0,
    projectName: '',
    request: '',
    description: '',
    point: 0,
    semester: 0,
    year: 0,
    student1Id: 0,
    student2Id: 0,
    instructorId: 0,
    subjectId: 0,
    status: ''
  }

  var projectProgress = {
    progressID: 0,
    projectId: 0,
    studentID: 0,
    progressName: '',
    startDate: '',
    endDate: '',
    status: '',
    quality: '',
    note: '',
  }

  var projectDetailInput = {
    detailId: 0,
    projectId: 0,
    tagID: 0,
    note: '',
  }

  var projectResource = {
    resourcesId: 0,
    projectId: 0,
    resourcesName: '',
    filePath:''
  };



  const addProgress = () => {

    if (!document.getElementById('sID').value || !document.getElementById('task').value || !selectedDate1 || !selectedDate2 ) {
        SetMessage("Please fill all the blank!")
        return;
    }

    projectProgress.projectId = project.projectId
    projectProgress.studentID = document.getElementById('sID').value
    projectProgress.progressName = document.getElementById('task').value
    projectProgress.startDate = selectedDate1
    projectProgress.endDate = selectedDate2
    

    const fetchApi = async () => {
      const progressResult = await projectProgressServices.createProjectProgress(projectProgress)
      const result4 = await projectProgressServices.GetProjectProgressByProjectID(project.projectId)
      SetProgress(result4)
      SetMessage("Add new progress successful!")

    }
    fetchApi()
    setVisibleXL(!visibleXL)
  }
  const UploadFile = async () => {
    //e.preventDefault()
    //var newId = Number(id);
    if (file == null) {
      SetMessage("Please input file!")
      return
    }
    else {
      const fileSizeInBytes = file.size;
      const fileSizeInKB = fileSizeInBytes / 1024;

      if (fileSizeInKB > 20480) {
        SetMessage("File size over 20MB")
        return
      }

      projectResource.projectId = project.projectId
      projectResource.resourcesName = file.name
      //console.log(file.name)

      const fetchApi = async () => {
        const result = await projectResourceServices.UploadFile(file)
        projectResource.resourcesName = result
        
        const fetchApi1 = async () => {
          const GetResources = async () => {
            const result2 = await projectResourceServices.DownloadFile(result)
            projectResource.filePath = result2
            setLink(result2)
            return projectResource;
          }
          var newProjectResource = await GetResources();
          const result1 = await projectResourceServices.createProjectResource(newProjectResource);
          SetMessage("Add file success!")
          const fetchApi2 = async () => {
            const result = await projectServices.GetCurrentProject(account.email)
            SetProject(result)
            const fetchApi3 = async () => {
              var fileArr = [];
              const fileResult = await projectResourceServices.getProjectResourcebyID(result.projectId);
              setFiles(fileResult);
              
              for (var i = 0; i < fileResult.length; i++) {
                fileArr.push(fileResult[i].resourcesName)
              }
              setLinks(fileArr);
            }
            fetchApi3()      
          }
          fetchApi2()
        }
        fetchApi1()      
      }
      fetchApi()
    }   
  }

  // const GetFile = async () => {
  //   const fetchApi = async () => {
  //     for (var i = 0; i < links.length; i++) {
  //       const result1 = await projectResourceServices.DownloadFile(links[i])
  //       //console.log(result1);
  //       setLink(result1)
  //     }    
  //   }
  //   fetchApi()
  // }

  const handleFileUpload = async (event) => {  
    setFile(event.target.files[0])
  }
  const handleDate1Change = (event) => {
    setSelectedDate1(event.target.value)
  }

  const handleDate2Change = (event) => {
    setSelectedDate2(event.target.value)
  }
  const addTag = () => {

    projectDetailInput.tagID = document.getElementById('tagID').value
    projectDetailInput.projectId = project.projectId
    
    const fetchApi = async () => {
      const result = await projectServices.GetCurrentProject(account.email)
      const projectDetailResult = await projectDetailServices.createProjectDetail(projectDetailInput)
      const result5 = await projectDetailServices.getTagByProjectID(result.projectId)
      //const result4 = await projectProgressServices.GetProjectProgressByProjectID(project.projectId)
      //SetProgress(result4)
      SetProjectDetail(result5)
    }
    fetchApi()
    SetMessage("Add new tag successful!")
    setVisible(!visible)
  }

  const EditDescription = () => {

    //projectDetailInput.tagID = document.getElementById('tagID').value
    //projectDetailInput.projectId = project.projectId

    updatedProject.projectId = project.projectId
    updatedProject.projectName = project.projectName
    updatedProject.request = project.request
    updatedProject.description = document.getElementById('description').value
    updatedProject.point = project.point
    updatedProject.semester = project.semester
    updatedProject.year = project.year
    updatedProject.student1Id = project.student1Id
    updatedProject.student2Id = project.student2Id
    updatedProject.instructorId = project.instructorId
    updatedProject.subjectId = project.subjectId
    updatedProject.status = project.status

    const fetchApi = async () => {
      const result = await projectServices.updateProject(updatedProject.projectId, updatedProject)
      // const projectDetailResult = await projectDetailServices.createProjectDetail(projectDetailInput)
      // const result5 = await projectDetailServices.getTagByProjectID(result.projectId)
      // //const result4 = await projectProgressServices.GetProjectProgressByProjectID(project.projectId)
      // //SetProgress(result4)
      // SetProjectDetail(result5)
      //console.log(result)
    }
    fetchApi()
    SetMessage("Edit description successful!")
    //setVisible(!visible)
  }

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  }

  const handleQuestion = (e) => {
    SetQuestion(e.target.value)
  }

  const askQuestion = async () => {
    if (!question) {
      SetMessage("Please fill the blank");      
    }
    else {
      const getStudent = async () => {
        //console.log(project)
        // if (project.semester === 1) {
        //   SetSemester('first')
        // }
        // else if (project.semester === 2) {
        //   SetSemester('second')
        // } else SetSemester('third')
        const result = await studentServices.getStudentbyID(account.email)
        return result;
        // SetStudent(result)
        // //console.log(result)
      }

      const getInstructor = async () => {
        //console.log(subject)
        const result = await instructorServices.getInstructorbyID(project.instructorId)
        return result;
      } 

      const student = await getStudent()
      const instructor = await getInstructor()

      //console.log(instructor) 

      getMailData(student.sName, student.studentId, project.semester, instructor.email, instructor.iName)
      //console.log(mailData)
      const fetchApi = async () => {
        const result = await topicRegisterServices.sendStatusMail(mailData)
        //console.log(result)
      }
      fetchApi()
      SetMessage("Ask questions via email successfully")
    }
  }

  const getMailData = (studentName, studentID, semester, iEmail, iName) => {
    //mailData.EmailToName = iEmail
    mailData.EmailToName = 'mrJ5112k2@gmail.com'
    mailData.EmailSubject = 'Question about Project ' + project.subjectId + ', semester ' + semester + ' of year ' + project.year;
    mailData.EmailBody = '<p> Dear instructor ' + iName + ',</p>' + 
                          '<p> This is a forwarded message about a question of student ' + studentName + ' (student code: ' + studentID + ') about project with the topic [' + project.projectName + '] in subject Project ' + project.subjectId + ', semester ' + semester + ' of year ' + project.year + '. Here is the question:</p>' + 
                          '<p>' + document.getElementById('question').value + '</p>' + 
                          '<p> Please reply to student&apos;s personal email (' + studentID + '@gm.uit.edu.vn) as soon as possible. Thank you so much.</p>' +
                          '<p> Sincerely,</p>' + 
                          '<b>SE Project Management Web.</b>'
  }

  useEffect(()=>{if(message){
    addToast(exampleToast);
  }}, [message])

  useEffect(() => { 
    const fetchApi = async () => {
      const check = await projectServices.CheckProjectExist(account.email)
      if (check === false) {
        return
      }
      else {
        const result = await projectServices.GetCurrentProject(account.email)
        SetProject(result)
        //console.log(result)
        const fetchApi1 = async () => {
          const result1 = await instructorServices.getInstructorbyID(result.instructorId)
          setInstructor(result1)
          setInstructorName(result1.iName)
          //console.log(instructor)

          const result2 = await studentServices.getStudentbyID(result.student1Id)
          SetStudent1(result2)

          if (result.student2Id != null) {
            const result3 = await studentServices.getStudentbyID(result.student2Id)
            SetStudent2(result3)
          }

          const result4 = await projectProgressServices.GetProjectProgressByProjectID(result.projectId)
          const result5 = await projectDetailServices.getTagByProjectID(result.projectId)
          const result6 = await tagServices.getTag()

          var fileArr = [];
          const fileResult = await projectResourceServices.getProjectResourcebyID(result.projectId);
          setFiles(fileResult);
        
          for (var i = 0; i < fileResult.length; i++) {
            fileArr.push(fileResult[i].resourcesName)
          }
          setLinks(fileArr);
          
          SetProgress(result4)
          SetProjectDetail(result5)
          SetTag(result6)
        }
        fetchApi1()      
        setItem(result)
      }
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
  const exampleToast  = (
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
                        <CCol xs="1" style={{ paddingLeft: 0 }}>
                          <CBadge color="success" style={{ fontSize: 14 }}>
                            Project {item.subjectId}
                          </CBadge>
                        </CCol>
                        <CCol xs="10">
                          <p>Lecturer: {instructorName}</p>
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
                    <p>Student 1: {student1.sName}</p>
                  </CCardBody>): (                  <CCardBody>
                    <p>Student 1: </p>
                  </CCardBody>)}

                </CCard>
              </CCol>
              <CCol xs={6} style={{ paddingRight: 0 }}>
                <CCard>
                {student2 ? (                  
                <CCardBody>
                    <p>Student 2: {student2.sName}</p>
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
                <CNavItem>
                  <CNavLink active={activeKey === 5} onClick={() => setActiveKey(5)}>
                    Question
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane visible={activeKey === 1}>
                    <CInputGroup className="mb-3">
                        <CFormTextarea  type="textArea" id="description" aria-describedby="basic-addon3" defaultValue={item.description} plainText/>
                    </CInputGroup>
                    <CButton onClick={EditDescription}>Save</CButton>
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
                  <br/>
                  <div className="gap-2 d-md-flex justify-content-md-start mb-2">
                    <CButton onClick={() => setVisibleXL(!visibleXL)}>Add progress</CButton>
                    <CModal
                        size="lg"
                        visible={visibleXL}
                        onClose={() => setVisibleXL(false)}
                        aria-labelledby="OptionalSizesExample1"
                    >
                        <CModalHeader>
                        <CModalTitle id="OptionalSizesExample1">Add progress</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="basic-addon3">Task</CInputGroupText>
                                <CFormInput  type="text" id="task" aria-describedby="basic-addon3"/>
                                <CInputGroupText id="basic-addon3">Participate</CInputGroupText>
                                <CFormSelect  onChange={handleChange} type="text" id="sID" aria-describedby="basic-addon3">
                                    <option value="">Please select</option>
                                    {student1 && !student2 ? (
                                        <option value={student1.studentId}>{student1.sName}</option>
                                    ) : 
                                    student2 ? (
                                        <><option value={student1.studentId}>{student1.sName}</option>
                                        <option value={student2.studentId}>{student2.sName}</option>
                                    </>

                                    ) : (123)}
                                </CFormSelect>
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="start">Start date</CInputGroupText>
                                <CFormInput type="date" id="startDate" value={selectedDate1} max={selectedDate2} onChange={handleDate1Change}/>
                                <CInputGroupText id="end">End date</CInputGroupText>
                                <CFormInput type="date" id="endDate" value={selectedDate2} min={selectedDate1} onChange={handleDate2Change}/>
                            </CInputGroup>
                        <div className="gap-2 d-md-flex justify-content-md-end">
                            <CButton color="info" onClick={() => addProgress()}>
                            Add
                            </CButton>
                        </div>
                        </CModalBody>
                    </CModal>
                  </div>
                </CTabPane>
                <CTabPane visible={activeKey === 3}>
                  <CListGroup accent="success" className="d-flex flex-row mt-2 p-1">
                    {projectDetail.map((item)=>(
                      <div className="d-flex flex-row m-1" key={item.tagId}>
                        <h5> <CBadge color={getBadge(item.tagName)}>{item.tagName}</CBadge></h5>
                      </div>
                    ))}
                    <div className="d-flex flex-row m-1">
                        <h5> <CBadge onClick={() => setVisible(!visible)} color={getBadge('button')}>+</CBadge></h5>
                        <CModal
                          alignment="center"
                          visible={visible}
                          onClose={() => setVisible(false)}
                          aria-labelledby="VerticallyCenteredExample"
                          >
                          <CModalHeader>
                              <CModalTitle id="VerticallyCenteredExample">Add tag</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <CFormSelect  onChange={handleChange} type="text" id="tagID" aria-describedby="basic-addon3">
                              <option value="">Please select</option>
                              {tag && tag.map((item)=>(
                                <option value={item.tagId} key={item.tagId}>{item.tagName}</option>
                              ))}
                            </CFormSelect>
                          </CModalBody>
                          <CModalFooter>
                              <CButton color="secondary" onClick={() => setVisible(false)}>
                              Close
                              </CButton>
                              <CButton color="primary" onClick={() => addTag()}>Add</CButton>
                          </CModalFooter>
                        </CModal>
                      </div>       
                  </CListGroup>
                </CTabPane>
                <CTabPane visible={activeKey === 4}>
                  <div className="gap-2 d-md-flex justify-content-md-start m-3">
                    <div className="d-flex w-100">
                      <CFormInput type="file" onChange={handleFileUpload} />
                      <CButton className="" color='light' onClick={UploadFile}>Add</CButton>
                      <CToaster ref={toaster} push={toast} placement="top-end" />
                    </div>    
    
                  </div>
                  <div className="d-flex w-100 m-3 ">
                    <a>Maximum size upload file: 20MB</a>  
                  </div>
                  <div className="d-flex w-100 m-3 ">
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
                <CTabPane visible={activeKey === 5}>
                  <div className="gap-2 d-md-flex justify-content-md-start m-3">
                    <div className="d-flex w-100">
                      <CFormTextarea id='question' type="textArea" onChange={handleQuestion} aria-describedby="basic-addon3" placeholder='Add a question' plainText/>
                    </div>             
                  </div>
                  <CButton className="" color='primary' onClick={askQuestion}>Make a question</CButton>
                    <CToaster ref={toaster} push={toast} placement="top-end" />   
                </CTabPane>
              </CTabContent>
            </CCardBody>
          </CCard>
        </div>
      ) : (
        <p>You have not registered the project yet</p>
      )}
    </div>
  )
}

export default CurrentProject
/*  */
