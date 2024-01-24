import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CInputGroup,
  CFormLabel,
  CInputGroupText,
} from '@coreui/react'

const Topic = () => {
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [topics, setTopics] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)

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
    {
      key: 'topicId',
      label: 'Id',
      filter: false,
      _style: { width: '5%' },
    },
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
    const fetchApi = async () => {
      const result1 = await topicDetailServices.deleteTopicDetail(index)
      const result2 = await topicRegisterServices.deleteTopicRegister(index)
      
      const fetchApi1 = async () => {
        const result3 = await topicServices.deleteTopic(index)
        const result4 = await topicServices.getTopic()
        setTopics(result4)
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
      }
      await fetchApi()
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
  useEffect(() => {
    const fetchApi = async () => {
      const result = await topicServices.getTopic()
      setTopics(result)
    }
    fetchApi()
  }, [])
  return (
    <div>
      <CContainer>
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
                              <h4>{item.topicName}</h4>
                              <p className="text-muted">User since: ${item.topicName}</p>
                              <CButton size="sm" color="info">
                                User Settings
                              </CButton>
                              <CButton size="sm" color="danger" className="ml-1">
                                Delete
                              </CButton>
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
                  <div className="gap-2 d-md-flex justify-content-md-end">
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
        activePage={2}
        columns={columns}
        columnFilter
        columnSorter
        items={topics}
        itemsPerPageSelect
        itemsPerPage={50}
        pagination
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
                        deleteTopic(item.topicId)
                      }}
                    >
                      Delete
                    </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              // <CCollapse visible={details.includes(item.topicId)}>
              //   <CCardBody className="p-3">
              //     <h4>{item.topicName}</h4>
              //     <div className="gap-2 d-md-flex justify-content-md-end">
              //       <CButton size="sm" color="info">
              //         Topic Settings
              //       </CButton>
              //       <CButton
              //         size="sm"
              //         color="danger"
              //         className="ml-1"
              //         onClick={() => {
              //           deleteTopic(item.topicId)
              //         }}
              //       >
              //         Delete
              //       </CButton>
              //     </div>
              //   </CCardBody>
              // </CCollapse>
              <CCollapse visible={details.includes(item.topicId)}>
                <CCardBody className="p-3">
                  <CFormLabel htmlFor="basic-url">Details</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">Tag</CInputGroupText>
                    <CFormInput
                      placeholder="Student 1"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      defaultValue={item.semester}
                      readOnly
                    />
                    
                  </CInputGroup>

                  <CFormLabel htmlFor="basic-url">Project</CFormLabel>
                  <CInputGroup className="mb-3">
                  <CButton
                      size="sm"
                      color="danger"
                      className="ml-1"
                      onClick={() => {
                        deleteTopic(item.topicId)
                      }}
                    >
                      Delete
                    </CButton>
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
          striped: true,
        }}
        tableBodyProps={{
          className: 'align-middle',
        }}
      />
    </div>
  )
}

export default Topic
