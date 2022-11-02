import {ProTable} from "@ant-design/pro-components";
import AddMenu from "./add"

export default () => {
  return (
    <>
      <ProTable
        headerTitle="菜单列表"
        toolBarRender={() => [
          <AddMenu key="addMenu" />,
        ]}/>
    </>
  );
};
