import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {ProTable} from "@ant-design/pro-components";
import AddDatabase from "./add"
import EditDatabase from "./edit"
import {useRef} from "react";
import {databaseList} from "@/api/database";

type Item = {
  id: bigint,
  name: string,
}

const columns: ProColumns<Item>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    search: false,
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    search: false,
    render: (text, record: Item, index, action) => {
      return <EditDatabase id={record.id} action={action}/>
    }
  },
]

export default () => {
  const ref = useRef<ActionType>();
  return (
    <>
      <ProTable<Item>
        headerTitle="数据库列表"
        rowKey="id"
        columns={columns}
        actionRef={ref}
        toolBarRender={() => [
          <AddDatabase key="addDatabase" action={ref.current}/>,
        ]}
        request={async (params = {}) => {
          const res = await databaseList(params)
          return res.data
        }}
      />
    </>
  );
};
