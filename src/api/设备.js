
  import request from '@/utils/request' 
  const basePath='undefined'
  // 设备分页列表 
  export function page(data) {  
    return request({    
      url:`/api/device/page`,    
      method:'post',    
      data  
    })
  }
  // 设备删除 
  export function delete(data) {  
    return request({    
      url:`/api/device/delete`,    
      method:'post',    
      data  
    })
  }
  // 设备修改 
  export function update(data) {  
    return request({    
      url:`/api/device/update`,    
      method:'post',    
      data  
    })
  }
  // 设备全部列表 
  export function list(data) {  
    return request({    
      url:`/api/device/list`,    
      method:'post',    
      data  
    })
  }
  // 设备添加 
  export function add(data) {  
    return request({    
      url:`/api/device/add`,    
      method:'post',    
      data  
    })
  }