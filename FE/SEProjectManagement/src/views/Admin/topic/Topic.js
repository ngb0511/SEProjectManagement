import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CModalFooter, CSmartTable } from '@coreui/react-pro'
import readXlsxFile from 'read-excel-file'
import * as topicServices from '../../../apiServices/topicServices'
import * as topicDetailServices from '../../../apiServices/topicDetailServices'
import * as topicRegisterServices from '../../../apiServices/topicRegisterServices'

import {
  CCardBody,
  CButton,
  CCollapse,
  CRow,
  CCol,
  CContainer,
  CFormCheck,
  CFormInput,
  CModalTitle,
  CInputGroup,
  CFormLabel,
  CInputGroupText,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CBadge,
  CModal,
  CModalHeader,
  CModalBody,
} from '@coreui/react'

const Topic = () => {
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [id, setId] = useState()
  const [topics, setTopics] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [message, SetMessage] = useState()
  const [visible, setVisible] = useState(false)
  const [showMessage, setShowMessage] = useState()
  const [status, setStatus] = useState()
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const navigate = useNavigate()
  var account = JSON.parse(sessionStorage.getItem('account'))

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
  var topic = {
    topicId: 0,
    topicName: '',
    request: '',
    description: '',
    instructorId: 0,
    subjectId: 0
  }
  var topicDetail = {
    detailId: 0,
    tagId: 0,
    topicId: 0,
    note: ''
  }
  const columns = [
    // {
    //   key: 'topicId',
    //   label: 'Id',
    //   filter: false,
    //   _style: { width: '5%' },
    // },
    {
      key: 'topicName',
      _style: { width: '40%' },
    },
    {
      key: 'request',
      filter: false,
      sorter: false,
    },
    {
      key: 'instructorId',
      sorter: false,
      _style: { width: '10%' },
    },
    {
      key: 'subjectId',
      sorter: false,
      filter: false,
      _style: { width: '10%' },
    },
    {
      key: 'tagId',
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
  const deleteTopic = (index) => {
    //index.preventDefault();
    const fetchApi = async () => {
      const result1 = await topicDetailServices.deleteTopicDetail(index)
      const result2 = await topicRegisterServices.deleteTopicRegister(index)
      
      const fetchApi1 = async () => {
        const result3 = await topicServices.deleteTopic(index)
        const result4 = await topicServices.getTopic()
        setTopics(result4)
        setVisible(false)
        //setStatus('Success')
        //SetMessage("Delete topic successful!")

      }
      fetchApi1()
    }

    fetchApi()
    
  }
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const rows = await readXlsxFile(file)
    const headers = rows[0]
    const data = rows.slice(1).map((row) => {
      return headers.reduce((obj, header, index) => {
        obj[header] = row[index]
        return obj
      }, {})
    })
    setItems(data)
  }
  const addTopics = async () => {
    console.log(items)
    for (var i = 0; i < items.length; i++) {
      //console.log(items[i].topicName)
      topic.topicName = items[i].topicName
      topic.request = items[i].request
      topic.description = items[i].description
      topic.instructorId = items[i].instructorId
      topic.subjectId = items[i].subjectId

      // console.log(topic)

      const fetchApi1 = async () => {
        //console.log(subject)
        const result = await topicServices.createTopic(items[i])
        return result;
      } 
      //console.log(topicResult)
      var topicResult = await fetchApi1();
      //setTopics(topics)
      console.log(topicResult)
      topicDetail.topicId = topicResult.topicId
      topicDetail.tagId = items[i].tagId
     
      console.log(topicDetail)
      const fetchApi = async () => {
        const result = await topicDetailServices.createTopicDetail(topicDetail)
        const result2 = await topicServices.getTopic()
        setTopics(result2)
      }
      await fetchApi()

      setVisibleXL(false)
      setStatus('Success')
      SetMessage("Add topic successful!")
    }
  }
  const subjectFilter = (index) => {
    const fetchApi = async () => {
      const result = await topicServices.getTopicbySubject(index)
      setTopics(result)
    }
    getChecked(index)
    fetchApi()
  }
  const getChecked = (index) => {
    if (index === 1) {
      setIsChecked1(!isChecked1)
      setIsChecked2(isChecked1) // Set the second checkbox based on the first checkbox
    } else if (index === 2) {
      setIsChecked2(!isChecked2)
      setIsChecked1(isChecked2) // Set the first checkbox based on the second checkbox
    }
  }
  const checkDelete = (inputId) => {
    setId(inputId)
    setVisible(!visible)
    setShowMessage('Confirm delete?')
    setStatus('Notification')
  }
  useEffect(() => {
    if (account === null) {
      setShowMessage('You have been logged out, please login and try again!')
      setStatus('Error')
      navigate('/Login')
      return
    }
    const fetchApi = async () => {
      const result = await topicServices.getTopic()
      setTopics(result)
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

  return (
    <div>
      <CContainer className='mb-3'>
        <CRow>
          <CCol sm={8}>
            <CFormCheck
              button={{ color: 'success', variant: 'outline' }}
              type="radio"
              name="options-outlined"
              id="1"
              checked={isChecked1}
              autoComplete="off"
              label="Project 1"
              onChange={() => {
                subjectFilter(1)
              }}
            />
            <CFormCheck
              button={{ color: 'danger', variant: 'outline' }}
              type="radio"
              name="options-outlined"
              id="2"
              checked={isChecked2}
              autoComplete="off"
              label="Project 2"
              onChange={() => {
                subjectFilter(2)
              }}
            />
          </CCol>
          <CCol sm={4}>
            <div className="gap-2 d-md-flex justify-content-md-end">
              <CButton onClick={() => setVisibleXL(!visibleXL)}>Add from Excel</CButton>
              <CModal
                size="xl"
                visible={visibleXL}
                onClose={() => setVisibleXL(false)}
                aria-labelledby="OptionalSizesExample1"
              >
                <CModalHeader>
                  <CModalTitle id="OptionalSizesExample1">List of topics</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <div className="gap-2 d-md-flex justify-content-md-end">
                    <CRow>
                      <CCol sm={12}>
                        <CFormInput type="file" onChange={handleFileUpload} />
                      </CCol>
                    </CRow>
                  </div>
                  <CSmartTable
                    columns={columns}
                    columnFilter
                    columnSorter
                    items={items}
                    itemsPerPageSelect
                    onFilteredItemsChange={(items) => {}}
                    onSelectedItemsChange={(items) => {}}
                    
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
                  <div className="gap-2 d-md-flex justify-content-md-end m-1">
                    <CButton color="info" onClick={addTopics}>
                      Save
                    </CButton>
                  </div>
                </CModalBody>
              </CModal>
            </div>
          </CCol>
        </CRow>
      </CContainer>
      <CSmartTable
        columns={columns}
        columnFilter
        columnSorter
        items={topics}
        itemsPerPage={20}
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
                <CButton
                  size="sm"
                  color="danger"
                  className="ml-1"
                  onClick={() => {
                    checkDelete(item.topicId)
                  }}
                >
                  Delete
                </CButton>
                <CModal
                  alignment="center"
                  visible={visible}
                  onClose={() => setVisible(false)}
                  aria-labelledby="VerticallyCenteredExample"
                >
                  <CModalHeader>
                    <CBadge color={getBadge(status)} style={{ fontSize: 16 }}>
                      {status}
                    </CBadge>                            
                  </CModalHeader>
                  <CModalBody>
                    <h6>{showMessage}</h6>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      size="sm"
                      color="secondary"
                      className="ml-1 "
                      onClick={() => setVisible(false)}
                    >
                      No
                    </CButton>
                    <CButton
                      size="sm"
                      color="primary"
                      className="ml-1"
                      onClick={() => {
                        deleteTopic(id)
                      }}
                    >
                      Yes
                    </CButton>
                  </CModalFooter>
                </CModal>
              </td>
            )
          },
          details: (item) => {
            // return (

            //   <CCollapse visible={details.includes(item.topicId)}>
            //     <CCardBody className="p-3">
            //       <CFormLabel htmlFor="basic-url">Details</CFormLabel>
            //       <CInputGroup className="mb-3">
            //         <CInputGroupText id="basic-addon1">Tag</CInputGroupText>
            //         <CFormInput
            //           placeholder="Student 1"
            //           aria-label="Username"
            //           aria-describedby="basic-addon1"
            //           defaultValue={item.semester}
            //           readOnly
            //         />
                    
            //       </CInputGroup>

            //       <CFormLabel htmlFor="basic-url">Project</CFormLabel>
            //       <CInputGroup className="mb-3">
            //       <CButton
            //           size="sm"
            //           color="danger"
            //           className="ml-1"
            //           onClick={() => {
            //             deleteTopic(item.topicId)
            //           }}
            //         >
            //           Delete
            //         </CButton>
            //       </CInputGroup>
            //     </CCardBody>
            //   </CCollapse>
            // )
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

export default Topic
