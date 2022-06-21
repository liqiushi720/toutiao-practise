import { request } from '@/utils/request'

export const getUserInfo = () => request({
  url: '/v1_0/user'

})
