
  import request from '@/utils/request' 
  const basePath='undefined'
  // 项目树形列表 
  export function tree(data) {  
    return request({    
      url:`/api/project/tree`,    
      method:'post',    
      data  
    })
  }
  // 项目列表 
  export function list(data) {  
    return request({    
      url:`/api/project/list`,    
      method:'post',    
      data  
    })
  }
  // 项目删除 
  export function delete(data) {  
    return request({    
      url:`/api/project/delete`,    
      method:'post',    
      data  
    })
  }
  // 项目添加 
  export function add(data) {  
    return request({    
      url:`/api/project/add`,    
      method:'post',    
      data  
    })
  }
  // 项目修改 
  export function update(data) {  
    return request({    
      url:`/api/project/update`,    
      method:'post',    
      data  
    })
  }