import {ModalForm, ProFormText, ProFormTreeSelect} from "@ant-design/pro-components";
import {Form, message} from "antd";
import {editMenu, GetMenu, menuSelectTree} from "@/api/menu";
import {useState} from "react";
import {validateErrorStatus} from "../../../../utils/util";
import {EditOutlined} from "@ant-design/icons";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      name: "",
      path: "",
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

        if (res.code) {
          if (res.data) {
            setErrorText(res.data)
          } else {
            message.error(res.message)
          }
          return false
        } else {
          r.action.reload()
          message.success(res.message)
          return true;
        }
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormText name="name" label="名称" validateStatus={validateErrorStatus(errorText.name)} help={errorText.name}/>
      <ProFormText name="path" label="Path" validateStatus={validateErrorStatus(errorText.path)} help={errorText.path}/>
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
