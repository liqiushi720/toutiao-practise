import { request } from '@/utils/request'

export const loginAPI = data => request({
  url: '/v1_0/authorizations',
  method: 'post',
  data
})

export const sendAPI = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`
})
