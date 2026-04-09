import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useSearchUIContext } from "search-ui/components/core/SearchUIContext";
import ClipboardCopy from '../ClipboardCopy';
import ModalOverComponent from '../ModalOverComponent';
import SearchResultsMeta from './SearchResultsMeta';
import log from 'xac-loglevel'

function SearchResults() {
  const [tableData, setTableData] = useState([])

  const { wasSearched, filters, setPageNumber, rawResponse, pageSize, setPageSize } = useSearchUIContext()

  const columns = [
    {
      title: 'SenNet ID',
      dataIndex: 'senotype.id',
      key: 'senotype.id',
      width: 250,
      render: (_, record) => <><a href={`/senotype/${record.senotype.id}`}>{record.senotype.id}</a><ClipboardCopy text={record.senotype.id} title={'Copy SenNet ID {text} to clipboard'} /></>,
    },
    {
      title: 'Title',
      dataIndex: 'senotype.name',
      key: 'senotype.name',
      width: 350,
      render: (_, record) => {
        return <div>{record.senotype.name}<br />
          <ModalOverComponent modalContent={record.senotype.definition} tag="small" maxLength={100}>
            <small>{record.senotype.definition.substr(0, 100)}</small>
          </ModalOverComponent>

        </div>
      },
    },
    {
      title: 'Assertions',
      dataIndex: 'assertions.objects.term',
      key: 'assertions.objects.term',
      render: (_, record) => {
        const terms = record.assertions.map((a) => a.objects?.map((o) => o.term))
        const content = terms.join(', ')
        return <div><ModalOverComponent maxLength={100} modalContent={content}>
          {content.substr(0, 100)}
        </ModalOverComponent></div>
      },
    }
  ]
  useEffect(() => {
    setTableData(rawResponse?.records?.senotypes)
    log.debug('SearchResults', rawResponse)
  }, [rawResponse])

  const handleTableChange = (pagination, filters, sorter) => {
    setPageNumber(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const getPageSizeOptions = () => {
    const total = rawResponse?.info?.senotypes?.total_result_count
    let num = 0
    const ops = []
    for (let i = 1; i <= 10; i += 2) {
      num = num + (i * 10)
      if (num < total) {
        ops.push(num)
      }
    }
    if (20 < total) {
      ops.splice(1, 0, 20)
    }
    return ops
  }

  const pageSizeOptions = getPageSizeOptions()

  return (
    <div>
      <SearchResultsMeta />
      <Table columns={columns} dataSource={tableData} rowKey={'id'} onChange={handleTableChange} pagination={{
        total: rawResponse?.info?.senotypes?.total_result_count, 
        pageSize: pageSize,
        showSizeChanger: pageSizeOptions.length > 0, 
        pageSizeOptions,
      }}
      />
    </div>
  )
}

export default SearchResults