import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {ProTable} from "@ant-design/pro-components";
import {userList} from "@/api/user";
import {useRef} from "react";
import AddUser from "./add"
import EditUser from "./edit";
import {Tag} from "antd";

type Item = {
  id: bigint,
  username: string,
  role: []
}

const columns: ProColumns<Item>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    search: false,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '角色',
    search: false,
    render: (text, record: Item) => {
      if (record.role) {
        return record.role.map((roleName: string) => <Tag key={roleName} color="success">{roleName}</Tag>)
      }
      return ""
    }
  },
  {
    title: '操作',
    search: false,
    render: (text, record: Item, index, action) => {
      return <EditUser id={record.id} action={action}/>
    }
  },
]

export default () => {
  const ref = useRef<ActionType>();
  return (
    <>
      <ProTable<Item>
        headerTitle="用户列表"
        rowKey="id"
        columns={columns}
        actionRef={ref}
        toolBarRender={() => [
          <AddUser key="addUser" action={ref.current}/>,
        ]}
        request={async (params = {}) => {
          const res = await userList(params)
          return res.data
        }}
      />
    </>
  )
}
