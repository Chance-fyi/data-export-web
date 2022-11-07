import {ModalForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {Button, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import {checkAdd, validateErrorStatus} from "../../../../utils/util";
import {createUser} from "@/api/user";
import {userRoleList} from "@/api/role";

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
      title="新建用户"
      width="25%"
      form={form}
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          新建
        </Button>
      }
      autoFocusFirstInput
      onFinish={async (values) => {
        setErrorText(initErrorText)
        const res = await createUser(values)
        return await checkAdd(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="username" label="用户名" validateStatus={validateErrorStatus(errorText.username)}
                   help={errorText.username}/>
      <ProFormText name="password" label="密码" validateStatus={validateErrorStatus(errorText.password)}
                   help={errorText.password}/>
      <ProFormText name="confirm_password" label="确认密码"
                   validateStatus={validateErrorStatus(errorText.confirm_password)} help={errorText.confirm_password}/>
      <ProFormSelect
        name="role_ids"
        label="角色"
        fieldProps={{
          mode: "multiple"
        }}
        request={async () => {
          const {data} = await userRoleList()
          return data
        }}
      />
    </ModalForm>
  )
}
