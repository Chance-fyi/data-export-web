import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {ProTable} from "@ant-design/pro-components";
import AddMenu from "./add"
import EditMenu from "./edit"
import {menuList} from "@/api/menu";
import {useRef} from "react";

type Item = {
  id: bigint,
  name: string,
  path: string,
  icon: string,
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
    title: 'Path',
    dataIndex: 'path',
    key: 'path',
    search: false,
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    search: false,
  },
  {
    title: '操作',
    search: false,
    render: (text, record: Item, index, action) => {
      return <EditMenu id={record.id} action={action}/>
    }
  },
]

export default () => {
  const ref = useRef<ActionType>();
  return (
    <>
      <ProTable<Item>
        headerTitle="菜单列表"
        rowKey="id"
        columns={columns}
        actionRef={ref}
        toolBarRender={() => [
          <AddMenu key="addMenu" action={ref.current}/>,
        ]}
        request={async (params = {}) => {
          const res = await menuList(params)
          return res.data
        }}
      />
    </>
  );
};
