import {
  ModalForm,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormTimePicker
} from "@ant-design/pro-components";
import {Form} from "antd";
import {useState} from "react";
import {checkEdit, validateErrorStatus} from "../../../../utils/util";
import {DownloadOutlined} from "@ant-design/icons";
import {getDownloadSql} from "@/api/sql";
import moment from "moment";
import {createExport} from "@/api/export";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      filename: ""
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)
  const [formItem, setFormItem] = useState([])
  const [sql, setSql] = useState("")

  const fields = (items: any) => {
    if (!items) {
      return
    }
    return items.map((item: any) => {
      switch (item.type) {
        case "date":
          return <ProFormDatePicker key={item.name} name={item.name} label={item.name} placeholder={item.name}
                                    rules={[{required: true}]}/>
        case "datetime":
          return <ProFormDateTimePicker key={item.name} name={item.name} label={item.name} placeholder={item.name}
                                        rules={[{required: true}]}/>
        case "time":
          return <ProFormTimePicker key={item.name} name={item.name} label={item.name} placeholder={item.name}
                                    rules={[{required: true}]}/>
        case "text":
          return <ProFormText key={item.name} name={item.name} label={item.name} placeholder={item.name}
                              rules={[{required: true}]}/>
        default:
          return <ProFormText key={item.name} name={item.name} label={item.name} placeholder={item.name}
                              rules={[{required: true}]}/>
      }
    })
  }

  const onChange = () => {
    const values = form.getFieldsValue()
    let s = sql
    for (const {name, type} of formItem) {
      let value = values[name]
      if (value == undefined) {
        continue
      }
      switch (type) {
        case "date":
          value = moment.isMoment(value) ? moment(value).format("YYYY-MM-DD") : value
          break
        case "datetime":
          value = moment.isMoment(value) ? moment(value).format("YYYY-MM-DD HH:mm:ss") : value
          break
        case "time":
          value = moment.isMoment(value) ? moment(value).format("HH:mm:ss") : value
          break
        case "text":
        default:
          break
      }
      s = s.replaceAll("{" + name + "}", value)
    }
    form.setFieldValue("sql", s)
  }

  return (
    <ModalForm
      title="下载"
      width="30%"
      form={form}
      onValuesChange={onChange}
      trigger={
        <DownloadOutlined/>
      }
      autoFocusFirstInput
      request={async () => {
        const {data} = await getDownloadSql(r.sql_id)
        setFormItem(data.fields)
        setSql(data.sql)
        form.setFieldValue("id", r.id)
        return data
      }}
      onFinish={async (values) => {
        setErrorText(initErrorText)
        const res = await createExport(values)
        return await checkEdit(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="id" hidden/>
      <ProFormText name="filename" label="文件名" validateStatus={validateErrorStatus(errorText.filename)}
                   help={errorText.filename}/>
      <ProFormTextArea
        name="sql"
        label="SQL"
        fieldProps={{
          style: {height: 500}
        }}
      />
      {fields(formItem)}
    </ModalForm>
  )
}
