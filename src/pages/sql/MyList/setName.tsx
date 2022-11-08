import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {Form} from "antd";
import {useState} from "react";
import {checkEdit, validateErrorStatus} from "../../../../utils/util";
import {EditOutlined} from "@ant-design/icons";
import {getUserSqlName, setUserSqlName} from "@/api/sql";

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
      title="设置备注"
      width="25%"
      form={form}
      trigger={
        <EditOutlined/>
      }
      autoFocusFirstInput
      request={async () => {
        const {data} = await getUserSqlName(r.id)
        return data
      }}
      onFinish={async (values) => {
        const res = await setUserSqlName(values)
        return await checkEdit(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormText name="name" label="备注" validateStatus={validateErrorStatus(errorText.name)} help={errorText.name}/>
    </ModalForm>
  )
}
