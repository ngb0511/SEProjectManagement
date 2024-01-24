import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import {
  CCardBody,
  CButton,
  CCollapse,
  CRow,
  CCol,
  CContainer,
  CFormCheck,
  CInputGroup,
  CFormLabel,
  CFormInput,
  CInputGroupText,
} from '@coreui/react'
import * as projectServices from '../../../apiServices/projectServices'
import { Link } from 'react-router-dom'

const ProjectRegistered = () => {
  const [details, setDetails] = useState([])
  const [project, SetProject] = useState()

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
    const fetchApi = async () => {
        const result = await projectServices.getProject()
        SetProject(result)
    }
    fetchApi()
  }, [])
  return (
    <div>
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
          striped: true,
        }}
        tableBodyProps={{
          className: 'align-middle',
        }}
      />
    </div>
  )
}

export default ProjectRegistered
