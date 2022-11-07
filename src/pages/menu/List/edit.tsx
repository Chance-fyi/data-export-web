import {ModalForm, ProFormText, ProFormTreeSelect} from "@ant-design/pro-components";
import {Form} from "antd";
import {editMenu, GetMenu, menuSelectTree} from "@/api/menu";
import {useState} from "react";
import {checkEdit, validateErrorStatus} from "../../../../utils/util";
import {EditOutlined} from "@ant-design/icons";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      name: "",
      path: "",
      icon: "",
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="编辑菜单"
      width="25%"
      form={form}
      trigger={
        <EditOutlined/>
      }
      autoFocusFirstInput
      request={async () => {
        const {data} = await GetMenu(r.id)
        data.parent_id = data.parent_id ? data.parent_id : null
        return data
      }}
      onFinish={async (values) => {
        setErrorText(initErrorText)
        const res = await editMenu(values)
        return await checkEdit(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormText name="name" label="名称" validateStatus={validateErrorStatus(errorText.name)} help={errorText.name}/>
      <ProFormText name="path" label="Path" validateStatus={validateErrorStatus(errorText.path)} help={errorText.path}/>
      <ProFormText name="icon" label="图标" validateStatus={validateErrorStatus(errorText.icon)} help={errorText.icon}/>
      <ProFormTreeSelect
        name="parent_id"
        label="父级"
        request={async () => {
          const {data} = await menuSelectTree()
          return data
        }}
      />
    </ModalForm>
  )
}
