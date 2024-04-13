import { ApiService } from './baseApi'

const path = import.meta.env.VITE_APP_DELIVERY_API_PATH
let headers = {}

export const DeliveryApi = (_headers) => {

    ApiService.init()
    if(headers) headers = _headers
    
    const query = (_params) => {
        return ApiService.query(path,{
            params: _params,
            headers: headers
        }).then((res) => {
            if(res.status >= 200 && res.status < 300)
            {
                return res.data
            }
            throw new Error(`status error: ${res.status}}`)
        })
    }
    return {
        query: query
    }
    
}