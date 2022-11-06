import {useRef} from "react";
import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {ProTable} from "@ant-design/pro-components";
import AddRole from "./add";
import {roleList} from "@/api/role";
import EditRole from "./edit";

type Item = {
  id: bigint
  name: string
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
      return <EditRole id={record.id} action={action}/>
    }
  },
]

export default () => {
  const ref = useRef<ActionType>();
  return (
    <>
      <ProTable<Item>
        headerTitle="角色列表"
        rowKey="id"
        columns={columns}
        actionRef={ref}
        toolBarRender={() => [
          <AddRole key="addUser" action={ref.current}/>,
        ]}
        request={async (params = {}) => {
          const res = await roleList(params)
          return res.data
        }}
      />
    </>
  )
}
