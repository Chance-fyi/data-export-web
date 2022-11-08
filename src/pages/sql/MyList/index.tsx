import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {ProFormSelect, ProTable} from "@ant-design/pro-components";
import {useRef} from "react";
import {mySqlList} from "@/api/sql";
import {Space} from "antd";
import SetName from "./setName";
import {databaseSelectList} from "@/api/database";

type Item = {
  id: bigint,
  name: string,
  database_name: string,
  fields: string,
}

const columns: ProColumns<Item>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    search: false,
  },
  {
    title: '备注',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '数据库',
    dataIndex: 'database_name',
    key: 'database_id',
    renderFormItem: () => {
      return <ProFormSelect
        request={async () => {
          const {data} = await databaseSelectList()
          return data
        }}
      />
    }
  },
  {
    title: '字段',
    dataIndex: 'fields',
    key: 'fields',
  },
  {
    title: '操作',
    search: false,
    render: (text, record: Item, index, action) => {
      return <>
        <Space size={20}>
          <SetName id={record.id} action={action}/>
        </Space>
      </>
    }
  },
]

export default () => {
  const ref = useRef<ActionType>();
  return (
    <>
      <ProTable<Item>
        headerTitle="SQL列表"
        rowKey="id"
        columns={columns}
        actionRef={ref}
        request={async (params = {}) => {
          const res = await mySqlList(params)
          return res.data
        }}
      />
    </>
  );
};
