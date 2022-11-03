import type {ProColumns} from "@ant-design/pro-components";
import {ProTable} from "@ant-design/pro-components";
import AddMenu from "./add"
import {menuList} from "@/api/menu";

type Item = {
  id: bigint,
  name: string,
  path: string,
  icon: string
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
]

export default () => {
  return (
    <>
      <ProTable<Item>
        headerTitle="菜单列表"
        rowKey="id"
        columns={columns}
        toolBarRender={() => [
          <AddMenu key="addMenu"/>,
        ]}
        request={async (params = {}) => {
          const res = await menuList(params)
          return res.data
        }}
      />
    </>
  );
};
