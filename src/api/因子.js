
  import request from '@/utils/request' 
  const basePath='undefined'
  // 因子修改 
  export function update(data) {  
    return request({    
      url:`/api/factor/update`,    
      method:'post',    
      data  
    })
  }
  // 因子模版列表 
  export function list(data) {  
    return request({    
      url:`/api/factor/template/list`,    
      method:'post',    
      data  
    })
  }
  // 因子模版添加 
  export function add(data) {  
    return request({    
      url:`/api/factor/template/add`,    
      method:'post',    
      data  
    })
  }
  // 因子模版删除 
  export function delete(data) {  
    return request({    
      url:`/api/factor/template/delete`,    
      method:'post',    
      data  
    })
  }
  // 因子模版修改 
  export function update(data) {  
    return request({    
      url:`/api/factor/template/update`,    
      method:'post',    
      data  
    })
  }
  // 因子列表 
  export function list(data) {  
    return request({    
      url:`/api/factor/list`,    
      method:'post',    
      data  
    })
  }