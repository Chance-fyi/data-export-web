import {history, request} from "umi";
import {stringify} from "qs";
import {refreshToken} from "@/api/login";
import {message} from "antd";
import {Dispatch} from "react";
import {FormInstance} from "antd/lib/form/hooks/useForm";

const req = async (method: string, url: string, data: any, params: any): Promise<any> => {
  const res = await request(url, {
    method,
    data,
    params,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    paramsSerializer: (params: any) => stringify(params, {arrayFormat: 'brackets', encode: false}),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
  })

  const {code} = res
  if (code === 101 && url !== '/api/logout') {
    const r = await refreshToken()
    localStorage.setItem('token', r.data?.token as string)
    return await req(method, url, data, params)
  } else if (code === 100) {
    history.push('/user/login')
    return
  }

  return res
}

export const GetRequest = (url: string, params: any = null): any => {
  return req('GET', url, null, params)
}

export const PostRequest = (url: string, data: any): any => {
  return req('POST', url, data, null)
}

export const validateErrorStatus = (r: any) => {
  return r ? 'error' : ''
}

export const checkAdd = async (res: any, form: FormInstance, setErrorText: Dispatch<any>, reload: any) => {
  if (res.code) {
    if (res.data) {
      setErrorText(res.data)
    } else {
      message.error(res.message)
    }
    return false
  } else {
    reload()
    message.success(res.message)
    form.resetFields()
    return true;
  }
}

export const checkEdit = async (res: any, form: FormInstance, setErrorText: Dispatch<any>, reload: any) => {
  if (res.code) {
    if (res.data) {
      setErrorText(res.data)
    } else {
      message.error(res.message)
    }
    return false
  } else {
    reload()
    message.success(res.message)
    return true;
  }
}
