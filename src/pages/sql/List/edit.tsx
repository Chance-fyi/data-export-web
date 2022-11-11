import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import {Form} from "antd";
import {useState} from "react";
import {checkEdit, validateErrorStatus} from "../../../../utils/util";
import {EditOutlined} from "@ant-design/icons";
import {editSql, GetSql} from "@/api/sql";
import {databaseSelectList} from "@/api/database";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      database_id: "",
      name: "",
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
        return data
      }}
      onFinish={async (values) => {
        setErrorText(initErrorText)
        const res = await editSql(values)
        return await checkEdit(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormSelect
        name="database_id"
        label="数据库"
        validateStatus={validateErrorStatus(errorText.database_id)} help={errorText.database_id}
        request={async () => {
          const {data} = await databaseSelectList()
          return data
        }}
      />
      <ProFormText name="name" label="备注" validateStatus={validateErrorStatus(errorText.name)} help={errorText.name}/>
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
