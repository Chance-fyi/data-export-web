import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {Form} from "antd";
import {useState} from "react";
import {checkEdit, validateErrorStatus} from "../../../../utils/util";
import {EditOutlined} from "@ant-design/icons";
import {editUser, getUser} from "@/api/user";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      username: "",
      password: "",
      confirm_password: "",
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="编辑用户"
      width="25%"
      form={form}
      trigger={
        <EditOutlined/>
      }
      autoFocusFirstInput
      request={async () => {
        const {data} = await getUser(r.id)
        data.parent_id = data.parent_id ? data.parent_id : null
        return data
      }}
      onFinish={async (values) => {
        setErrorText(initErrorText)
        const res = await editUser(values)
        return await checkEdit(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormText name="username" label="用户名" validateStatus={validateErrorStatus(errorText.username)}
                   help={errorText.username}/>
      <ProFormText name="password" label="密码" validateStatus={validateErrorStatus(errorText.password)}
                   help={errorText.password}/>
      <ProFormText name="confirm_password" label="确认密码"
                   validateStatus={validateErrorStatus(errorText.confirm_password)} help={errorText.confirm_password}/>
    </ModalForm>
  )
}
