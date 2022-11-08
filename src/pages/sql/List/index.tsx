import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {ProTable} from "@ant-design/pro-components";
import AddSql from "./add"
import EditSql from "./edit"
import SetUser from "./setUser"
import {useRef} from "react";
import {sqlList} from "@/api/sql";
import {Space} from "antd";

type Item = {
  id: bigint,
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
          <EditSql id={record.id} action={action}/>
          <SetUser id={record.id} action={action}/>
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
        toolBarRender={() => [
          <AddSql key="addSql" action={ref.current}/>,
        ]}
        request={async (params = {}) => {
          const res = await sqlList(params)
          return res.data
        }}
      />
    </>
  );
};
