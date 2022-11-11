import {ModalForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {Form} from "antd";
import {useState} from "react";
import {checkEdit} from "../../../../utils/util";
import {UsergroupAddOutlined} from "@ant-design/icons";
import {getUserSql, setUserSql} from "@/api/sql";
import {userSelectList} from "@/api/user";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      user_ids: "",
    }
  }
  const [, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="设置用户"
      width="25%"
      form={form}
      trigger={
        <UsergroupAddOutlined/>
      }
      autoFocusFirstInput
      request={async () => {
        form.setFieldValue("name", r.name)
        const {data} = await getUserSql(r.id)
        return data
      }}
      onFinish={async (values) => {
        const res = await setUserSql(values)
        return await checkEdit(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormText name="name" hidden/>
      <ProFormSelect
        name="user_ids"
        label="用户"
        fieldProps={{
          mode: "multiple"
        }}
        request={async () => {
          const {data} = await userSelectList()
          return data
        }}
      />
    </ModalForm>
  )
}
