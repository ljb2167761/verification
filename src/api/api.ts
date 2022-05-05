import { get } from '../utils/request'

export function getQqInfo(params:any) {
  return get('/api/qq.info', { qq: params })
}