import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import readXlsxFile from 'read-excel-file'
import * as tagServices from '../../../apiServices/tagServices'
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
  CInputGroupText,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
} from '@coreui/react'

const tagInput = {
  tagId: 0,
  tagName: '',
  description: ''
}

const Tag = () => {
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [tag, setTag] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  const columns = [
    {
      key: 'tagId',
      label: 'Id',
      filter: false,
      _style: { width: '5%' },
    },
    {
      key: 'tagName',
      _style: { width: '40%' },
      filter: true,
    },
    {
      key: 'description',
      filter: false,
      sorter: false,
    },
    // {
    //   key: 'show_details',
    //   label: '',
    //   _style: { width: '1%' },
    //   filter: false,
    //   sorter: false,
    // },
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

  const deleteTag = (index) => {
    const fetchApi = async () => {
      const result = await tagServices.deleteTag(index)
      const result1 = await tagServices.getTag()
      setTag(result1)
    }
    fetchApi()
  }

  const addTag = () => {
    tagInput.tagName = document.getElementById('tagNameInput').value
    tagInput.description = document.getElementById('descriptionInput').value

    console.log(tagInput)
    const fetchApi = async () => {
      const result = await tagServices.createTag(tagInput)
      const result1 = await tagServices.getTag()
      setTag(result1)
    }
    fetchApi()
  }

  useEffect(() => {
    const fetchApi = async () => {
      const result = await tagServices.getTag()
      setTag(result)
    }
    fetchApi()
  }, [])
  return (
    <div>
      <div className="gap-2 d-md-flex justify-content-md-end mb-2">
        <CButton onClick={() => setVisibleSm(!visibleSm)}>Add a tag</CButton>
        <CModal
          size="sm"
          visible={visibleSm}
          onClose={() => setVisibleSm(false)}
          aria-labelledby="OptionalSizesExample1"
        >
          <CModalHeader>
            <CModalTitle id="OptionalSizesExample1">Tag</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CInputGroup className="mb-3">
              <CInputGroupText id="addon-wrapping">Tag Name</CInputGroupText>
              <CFormInput
              id='tagNameInput'
                placeholder="Web"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText id="addon-wrapping">Description</CInputGroupText>
              <CFormInput
              id='descriptionInput'
                placeholder="Ứng dụng website"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </CInputGroup>
            <div className="gap-2 d-md-flex justify-content-md-end">
              <CButton color="info" onClick={addTag}>
                Add
              </CButton>
            </div>
          </CModalBody>
        </CModal>
      </div>
      <CSmartTable
        activePage={2}
        columns={columns}
        columnFilter
        columnSorter
        items={tag}
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
                    toggleDetails(item.tagId)
                  }}
                >
                  {details.includes(item.tagId) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.tagId)}>
                <CCardBody className="p-3">
                  <h4>{item.tagName}</h4>
                  <div className="gap-2 d-md-flex justify-content-md-end">
                    <CButton size="sm" color="info">
                      Topic Settings
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      className="ml-1"
                      onClick={() => {
                        deleteTag(item.tagId)
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

export default Tag
