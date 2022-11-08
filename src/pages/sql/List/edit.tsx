import {ModalForm, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import {Form} from "antd";
import {useState} from "react";
import {checkEdit, validateErrorStatus} from "../../../../utils/util";
import {EditOutlined} from "@ant-design/icons";
import {editSql, GetSql} from "@/api/sql";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      sql: "",
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="编辑SQL"
      width="30%"
      form={form}
      trigger={
        <EditOutlined/>
      }
      autoFocusFirstInput
      request={async () => {
        const {data} = await GetSql(r.id)
        data.parent_id = data.parent_id ? data.parent_id : null
        return data
      }}
      onFinish={async (values) => {
        setErrorText(initErrorText)
        const res = await editSql(values)
        return await checkEdit(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormTextArea
        name="sql"
        label="SQL"
        validateStatus={validateErrorStatus(errorText.sql)} help={errorText.sql}
        fieldProps={{
          style: {height: 500}
        }}
      />
    </ModalForm>
  )
}
