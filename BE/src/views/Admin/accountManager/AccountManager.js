import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import readXlsxFile from 'read-excel-file'
import * as accountServices from '../../../apiServices/accountServices'
import {
  CCardBody,
  CButton,
  CCollapse,
  CRow,
  CCol,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CInputGroup,
  CInputGroupText,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
} from '@coreui/react'

const AccountManager = () => {
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [account, setAccount] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const columns = [
    {
      key: 'accountId',
      label: 'Id',
      filter: false,
      _style: { width: '5%' },
    },
    {
      key: 'email',
      _style: { width: '40%' },
    },
    {
      key: 'pwd',
      label: 'Password',
      filter: false,
      sorter: false,
    },
    {
      key: 'accountTypeId',
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
  // const deleteTopic = (index) => {
  //   const fetchApi = async () => {
  //     const result = await topicServices.deleteTopic(index)
  //     const result1 = await topicServices.getTopic()
  //     setTopic(result1)
  //   }
  //   fetchApi()
  // }
  // const handleItemClick = (value) => {
  //   setSelectedValue(value)
  // }
  // const handleFileUpload = async (event) => {
  //   const file = event.target.files[0]
  //   const rows = await readXlsxFile(file)
  //   const headers = rows[0]
  //   const data = rows.slice(1).map((row) => {
  //     return headers.reduce((obj, header, index) => {
  //       obj[header] = row[index]
  //       return obj
  //     }, {})
  //   })
  //   setItems(data)
  // }
  // const addTopics = () => {
  //   const fetchApi = async () => {
  //     var promises = []
  //     for (var i = 0; i < items.length; i++) {
  //       const result = await topicServices.createTopic(items[i])
  //       const result1 = await topicServices.getTopic()
  //       promises.push(result)
  //       setTopic(result1)
  //     }
  //     setItems(null)
  //     Promise.all(promises)
  //   }
  //   fetchApi()
  // }
  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountServices.getAccount()
      setAccount(result)
    }
    fetchApi()
  }, [])
  return (
    <div>
      {/* <div className="gap-2 d-md-flex justify-content-md-end">
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
                          toggleDetails(item.accountId)
                        }}
                      >
                        {details.includes(item.accountId) ? 'Hide' : 'Show'}
                      </CButton>
                    </td>
                  )
                },
                details: (item) => {
                  return (
                    <CCollapse visible={details.includes(item.accountId)}>
                      <CCardBody className="p-3">
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
            <div className="gap-2 d-md-flex justify-content-md-end">
              <CButton color="info" onClick={addTopics}>
                Add
              </CButton>
            </div>
          </CModalBody>
        </CModal>
        <CButton onClick={() => setVisibleSm(!visibleSm)}>Add an account</CButton>
        <CModal
          size="sm"
          visible={visibleSm}
          onClose={() => setVisibleSm(false)}
          aria-labelledby="OptionalSizesExample1"
        >
          <CModalHeader>
            <CModalTitle id="OptionalSizesExample1">Account Information</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CInputGroup className="mb-3">
              <CInputGroupText id="addon-wrapping">Email</CInputGroupText>
              <CFormInput
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText id="addon-wrapping">Password</CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CDropdown>
                <CDropdownToggle color="info">Type</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => handleItemClick('1')}>Lecturer</CDropdownItem>
                  <CDropdownItem onClick={() => handleItemClick('2')}>Student</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CFormInput aria-label="Text input with dropdown button" value={selectedValue} />
            </CInputGroup>
            <div className="gap-2 d-md-flex justify-content-md-end">
              <CButton color="info" onClick={addTopics}>
                Add
              </CButton>
            </div>
          </CModalBody>
        </CModal>
      </div> */}
      <CSmartTable
        activePage={2}
        columns={columns}
        columnFilter
        columnSorter
        items={account}
        itemsPerPageSelect
        itemsPerPage={50}
        pagination
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
                    toggleDetails(item.accountId)
                  }}
                >
                  {details.includes(item.accountId) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.accountId)}>
                <CCardBody className="p-3">
                  <div className="gap-2 d-md-flex justify-content-md-end">
                    <CButton size="sm" color="info">
                      Topic Settings
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      className="ml-1"
                      onClick={() => {
                        // deleteTopic(item.topicId)
                      }}
                    >
                      Delete
                    </CButton>
                  </div>
                </CCardBody>
              </CCollapse>
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

export default AccountManager
