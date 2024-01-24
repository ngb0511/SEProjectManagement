import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
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
} from '@coreui/react'
import { Link } from 'react-router-dom'
import readXlsxFile from 'read-excel-file'
import * as studentServices from '../../../apiServices/studentServices'

const Student = () => {
  const [details, setDetails] = useState([])
  const [student, setStudent] = useState([])
  const [items, setItems] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const columns = [
    {
      key: 'studentId',
      label: 'ID',
      filter: false,
      sorter: true,
      _style: { width: '10%' },
    },
    {
      key: 'sName',
      label: 'Name',
      _style: { width: '20%' },
      sorter: false,
    },
    {
      key: 'gender',
      _style: { width: '8%' },
      filter: false,
    },
    {
      key: 'email',
      _style: { width: '15%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'phoneNumber',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'termId',
      _style: { width: '8%' },
    },
    {
      key: 'accountId',
      _style: { width: '10%' },
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
  useEffect(() => {
    const fetchApi = async () => {
      const result = await studentServices.getStudent();
      setStudent(result)
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
        items={student}
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
          show_details: (item) => {
            return (
              <td className="py-2">
                <Link to={`/studentDetail/${item.studentId}`}>
                  {/* Use the CoreUI button component */}
                  <CButton color="primary">Detail</CButton>
                </Link>
              </td>
            )
          },
        }}
        sorterValue={{ column: 'status', state: 'asc' }}
        tableProps={{
          className: 'add-this-class',
          responsive: true,
          striped: true,
          hover: true,
        }}
        tableBodyProps={{
          className: 'align-middle',
        }}
      />
    </div>
  )
}

export default Student
