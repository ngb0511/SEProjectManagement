import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCol, CSmartTable } from '@coreui/react-pro'
import * as topicRegisterServices from '../../../apiServices/topicRegisterServices'
import * as topicServices from '../../../apiServices/topicServices'
import * as tagServices from '../../../apiServices/tagServices'
import * as topicDetailServices from '../../../apiServices/topicDetailServices'
import * as studentServices from '../../../apiServices/studentServices'
import * as projectServices from '../../../apiServices/projectServices'
import * as projectDetailServices from '../../../apiServices/projectDetailServices'
import * as registerCalendarServices from '../../../apiServices/registerCalendarServices'
import dateFormat from 'dateformat'

import {
  CCardBody,
  CButton,
  CCollapse,
  CInputGroup,
  CFormLabel,
  CFormInput,
  CInputGroupText,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CBadge,
  CRow,
  CFormSelect,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
} from '@coreui/react'

var topicRegister = {
  registerId: '0',
  topicId: '',
  student1Id: '',
  student2Id: '',
  status: '',
};

var project = {
  projectId: 0,
  projectName: '',
  request: '',
  description: '',
  point: '',
  semester: '',
  year: '',
  student1Id: '',
  student2Id: '',
  instructorId: '',
  subjectId: '',
  status: ''
}

var projectDetail = {
  detailId: 0,
  projectId: 0,
  tagId: 0,
  note: ''
}

var mailData = {
  EmailToName: '',
  EmailSubject: '',
  EmailBody: '',
};

var object = {
  subjectID: 0,
  tagId: 0
}

const Project = () => {
  const [details, setDetails] = useState([])
  const [topic, setTopic] = useState([])
  const [subject, setSubject] = useState()
  const [checkTopic, setCheckTopic] = useState()
  const [selectedOption, setSelectedOption] = useState()
  const [code1, setInputValue1] = useState('')
  const [tag, SetTag] = useState()
  const [code2, setInputValue2] = useState('')
  const [message, SetMessage] = useState()
  const [status, setStatus] = useState()
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const navigate = useNavigate()

  const getBadge = (status) => {
    switch (status) {
      case 'Warning':
        return 'warning'
      case 'Error':
        return 'danger'
      case 'Notification':
        return 'info'
      default:
        return 'success'
    }
  }

  var account = JSON.parse(sessionStorage.getItem('account'))
  //var isLogin = JSON.parse(sessionStorage.getItem('isLogin'))

  const addTopicRegister = async (topicID, topicName, request, description, instructorId, subjectId) => {
    
    topicRegister.student1Id = document.getElementById('studentCode1').value
    topicRegister.topicId = topicID

    project.projectName = topicName
    project.request = request
    project.description = description
    project.point = 0
    project.student1Id = document.getElementById('studentCode1').value 
    project.instructorId = instructorId
    project.subjectId = subjectId
    project.status = 'In progress'
    const day = new Date();
    project.year = day.getFullYear()

    if (day.getMonth() < 8 && day.getMonth() > 6) {
      project.semester = '1'
    }
    else if (day.getMonth() >= 0 && day.getMonth() <= 2 ) {
      project.semester = '2'
    } 
    else project.semester = '3'
    

    //console.log(topicID)
    const fetchApi = async () => {
      if (document.getElementById('studentCode2').value === '') {
        topicRegister.student2Id = null
        project.student2Id = null
      } else {
        const checkStudent2 = await studentServices.CheckStudentID(document.getElementById('studentCode2').value)

        if (checkStudent2 === false) {
          setStatus('Warning')
          SetMessage("Student 2 doesn't exist")
          return;
        }
        else {
          const checkStudent3 = await studentServices.GetCurrentSubject(document.getElementById('studentCode2').value)

          if (checkStudent3 != subject) {
            setStatus('Warning')
            SetMessage("Student 2 didn't assign this subject!")

            return;
          }
        }
        const checkStudent4 = await topicRegisterServices.CheckRegisteredStudent(document.getElementById('studentCode2').value)

          if (checkStudent4 === true) {
            setStatus('Warning')
            SetMessage("Student 2 have registered another topic!")
            return;
          }

      topicRegister.student2Id = document.getElementById('studentCode2').value
      project.student2Id = document.getElementById('studentCode2').value
      }

      topicRegister.status = await topicRegisterServices.GetTopicStatus(topicID)
      console.log(topicRegister)
      const result = await topicRegisterServices.createTopicRegister(topicRegister)
      // console.log(result)

      getMailData(topicName, topicRegister.student1Id, topicRegister.status);
      console.log(mailData)
      const result1 = await topicRegisterServices.sendStatusMail(mailData)
      console.log(result1)

      if (document.getElementById('studentCode2').value != '') {
        getMailData(topicName, topicRegister.student2Id, topicRegister.status);
        console.log(mailData)
        const result2 = await topicRegisterServices.sendStatusMail(mailData)
        console.log(result2)
      }

      if (topicRegister.status === 'approved')
      {
        console.log(project)

        const fetchApi2 = async () => {
          //console.log(subject)
          const result = await projectServices.createProject(project)
          return result;
        } 
        //console.log(topicResult)
        var projectResult = await fetchApi2();

        const fetchApi1 = async () => {
          //console.log(subject)
          const result = await topicDetailServices.getTopicDetailbyID(topicID)
          return result;
        } 
        //console.log(topicResult)
        var topicDetailResult = await fetchApi1();
        //console.log(topicDetailResult)
        console.log(projectResult)
        projectDetail.projectId = projectResult.projectId
        projectDetail.tagId = topicDetailResult[0].tagId
        console.log(projectDetail)
        const addProjectDetail = async () => {
          const result = await projectDetailServices.createProjectDetail(projectDetail)
        }
        await addProjectDetail()
        
        SetMessage("The project has been successfully registered. Please switch to the current project page!")
        setStatus('Success')
        window.location.reload();
      }
      else {
        SetMessage("This topic had been registered by other accounts, please try another topic!")
        setStatus('Error')
        window.location.reload();
      }
    }
    fetchApi()

    
  }

  const getMailData = (topicName, studentID, status) => {
    mailData.EmailToName = studentID + '@gm.uit.edu.vn'
    mailData.EmailSubject = 'Topic registrant ' + status + '!';
    mailData.EmailBody = '<b>Your registrant to topic [ ' + topicName + ' ] has been ' + status + '!</b>';
  }

  const columns = [
    {
      key: 'topicId',
      label: 'Id',
      filter: false,
      _style: { width: '5%' },
    },
    {
      key: 'topicName',
      label: 'Topic Name',
      _style: { width: '40%' },
    },
    {
      key: 'iName',
      label: 'Instructor',
      sorter: false,
      _style: { width: '20%' },
    },
    {
      key: 'request',
      label: 'Request',
      filter: false,
      sorter: false,
    },
    {
      key: 'subjectName',
      label: 'Subject',
      sorter: false,
      filter: false,
      _style: { width: '10%' },
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  useEffect(() => {
    const fetchApi = async () => {
      const checkRegisted = async () => {

        const day = dateFormat(new Date(), 'dd/mm/yyyy') ;
        
        const CheckTime = await registerCalendarServices.GetNewestRegisterCalendar()
        console.log(CheckTime)

        if ((day >= dateFormat(CheckTime.startDate, 'dd/mm/yyyy') && day <= dateFormat(CheckTime.endDate, 'dd/mm/yyyy'))) {
          const CheckRegisteredStudent = await topicRegisterServices.CheckRegisteredStudent(account.email)
          if (CheckRegisteredStudent === true) {
            SetMessage("You have registered for the project. Please switch to the current project page!")
            setStatus('Success')
          }
          else {
            const result = await studentServices.GetCurrentSubject(account.email);
            console.log(result)
            setSubject(result)
            const fetchApi1 = async () => {
            //console.log(subject)
              const result1 = await topicServices.getTopicbySubject(result)
              return result1;
            } 
            var newProjectResource = await fetchApi1();
            var fileArr = [];
            const fetchApi2 = async () => {
              console.log(newProjectResource)
              const result6 = await tagServices.getTag()
              SetTag(result6)
              for (var i = 0; i < newProjectResource.length; i++) {
                const result1 = await topicRegisterServices.CheckTopic(newProjectResource[i].topicId)
                if (result1 === false) {
                  fileArr.push(newProjectResource[i])
                }
              }
              setTopic(fileArr)
            }
            fetchApi2()
          }       
        }
        else {
          SetMessage("Project registration has not been opened yet, please come back later.")
          setStatus('Warning')
        }

      }
      checkRegisted()     
    }
    fetchApi()

    
  }, [])


  const exampleToast = (
    <CToast>
      <CToastHeader closeButton>
        <div className="fw-bold me-auto">
          <CBadge color={getBadge(status)} style={{ fontSize: 16 }}>
            {status}
          </CBadge>  
        </div>
      </CToastHeader>
      <CToastBody>
        {message}
      </CToastBody>
    </CToast>
  )

  useEffect(()=>{if(message){
    addToast(exampleToast);
  }}, [message])

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
    
    const fetchApi = async () => {
      const fetchApi1 = async () => {
        console.log(selectedOption)
        if (e.target.value === '-1') {
          const result1 = await topicServices.getTopicbySubject(subject)
          return result1;
        }
        else {
          object.subjectID = subject
          object.tagId = e.target.value
          console.log(object)
          const result1 = await topicServices.getTopicbySubjectAndTag(object)
          return result1;
        }
        //console.log(subject)
          
        } 
        var newProjectResource = await fetchApi1();
        var fileArr = [];
        const fetchApi2 = async () => {
          console.log(newProjectResource)
          const result6 = await tagServices.getTag()
          SetTag(result6)
          for (var i = 0; i < newProjectResource.length; i++) {
            const result1 = await topicRegisterServices.CheckTopic(newProjectResource[i].topicId)
            if (result1 === false) {
              fileArr.push(newProjectResource[i])
            }
          }
          setTopic(fileArr)
        }
        fetchApi2()
    }
    fetchApi()
  }

  // Quy định số chữ số của Student's code
  const handleChange1 = (e) => {
    const value = e.target.value
    // Limiting to 10 characters in this example
    if (value.length <= 8) {
      setInputValue1(value)
    }
  }
  const handleChange2 = (e) => {
    const value = e.target.value
    // Limiting to 10 characters in this example
    if (value.length <= 8) {
      setInputValue2(value)
    }
  }
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
  return (
    <div>
      <div className="gap-2 d-md-flex justify-content-md-end">
        <CRow>
          <CCol sm={12}>          
          <CInputGroup className="mb-3 ">
            <CFormSelect  onChange={handleSelect} type="text" id="tagID" aria-describedby="basic-addon3">
                              <option value="-1">Select All</option>
                              {tag && tag.map((item)=>(
                                <option value={item.tagId} key={item.tagId}>{item.tagName}</option>
                              ))}
            </CFormSelect>
          </CInputGroup>
          </CCol>
        </CRow>
      </div>
      <CSmartTable
        activePage={2}
        columns={columns}
        columnFilter
        columnSorter
        items={topic}
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
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item.topicId)
                  }}
                >
                  {details.includes(item.topicId) ? 'Hide' : 'Show'}
                </CButton>
              </td>             
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.topicId)}>
                <CCardBody className="p-3">
                  <CFormLabel htmlFor="basic-url">Student&apos;s informations</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">Student&apos;s code 1:</CInputGroupText>
                    <CFormInput
                      placeholder="Student 1"
                      type="number"
                      //value={code1}
                      onChange={handleChange1}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="studentCode1"
                      value = {account.email}
                      disabled = {true}
                    />
                    <CInputGroupText id="basic-addon1">Student&apos;s code 2:</CInputGroupText>
                    <CFormInput
                      placeholder="Student 2"
                      type="number"
                      value={code2}
                      onChange={handleChange2}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="studentCode2"
                    />
                  </CInputGroup>
                  <div className="gap-2 d-md-flex justify-content-md-end">
                    <CButton size="sm" color="info" onClick={() => addTopicRegister(item.topicId, item.topicName, item.request, item.description, item.instructorId, item.subjectId)}>
                      Register
                    </CButton>
                  </div>
                </CCardBody>
              </CCollapse>
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
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  )
}

export default Project
