import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {Form} from "antd";
import {useState} from "react";
import {checkEdit, validateErrorStatus} from "../../../../utils/util";
import {EditOutlined} from "@ant-design/icons";
import {editDatabase, getDatabase} from "@/api/database";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      name: "",
      hostname: "",
      port: "",
      username: "",
      password: "",
      database: "",
      charset: "",
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="编辑数据库"
      width="25%"
      form={form}
      trigger={
        <EditOutlined/>
      }
      autoFocusFirstInput
      request={async () => {
        const {data} = await getDatabase(r.id)
        return data
      }}
      onFinish={async (values) => {
        setErrorText(initErrorText)
        const res = await editDatabase(values)
        return await checkEdit(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormText name="name" label="名称" validateStatus={validateErrorStatus(errorText.name)} help={errorText.name}/>
      <ProFormText name="hostname" label="数据库链接" validateStatus={validateErrorStatus(errorText.hostname)}
                   help={errorText.hostname}/>
      <ProFormText name="port" label="端口" validateStatus={validateErrorStatus(errorText.port)} help={errorText.port}/>
      <ProFormText name="username" label="用户名" validateStatus={validateErrorStatus(errorText.username)}
                   help={errorText.username}/>
      <ProFormText name="password" label="密码" validateStatus={validateErrorStatus(errorText.password)}
                   help={errorText.password}/>
      <ProFormText name="database" label="数据库名" validateStatus={validateErrorStatus(errorText.database)}
                   help={errorText.database}/>
      <ProFormText name="charset" label="字符集" validateStatus={validateErrorStatus(errorText.charset)}
                   help={errorText.charset}/>
    </ModalForm>
  )
}
