import {ModalForm, ProFormText, ProFormTreeSelect} from "@ant-design/pro-components";
import {Form} from "antd";
import {menuSelectTree} from "@/api/menu";
import {useState} from "react";
import {checkEdit, validateErrorStatus} from "../../../../utils/util";
import {EditOutlined} from "@ant-design/icons";
import {editRole, getRole} from "@/api/role";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      name: "",
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="编辑角色"
      width="25%"
      form={form}
      trigger={
        <EditOutlined/>
      }
      autoFocusFirstInput
      request={async () => {
        const {data} = await getRole(r.id)
        return data
      }}
      onFinish={async (values) => {
        setErrorText(initErrorText)
        const res = await editRole(values)
        return await checkEdit(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormText name="name" label="名称" validateStatus={validateErrorStatus(errorText.name)} help={errorText.name}/>
      <ProFormTreeSelect
        name="menu_ids"
        label="菜单"
        fieldProps={{
          multiple: true,
          treeDefaultExpandAll: true,
        }}
        request={async () => {
          const {data} = await menuSelectTree()
          return data
        }}
      />
    </ModalForm>
  )
}
