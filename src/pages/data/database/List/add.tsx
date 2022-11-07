import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {Button, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import {checkAdd, validateErrorStatus} from "../../../../../utils/util";
import {createDatabase} from "@/api/database";

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
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="新建数据库"
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
        const res = await createDatabase(values)
        return await checkAdd(res, form, setErrorText, r.action.reload)
      }}
    >
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
    </ModalForm>
  )
}
