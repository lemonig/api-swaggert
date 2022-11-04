
  import request from '@/utils/request' 
  const basePath='undefined'
  // 数据分页列表 
  export function page(data) {  
    return request({    
      url:`/api/data/page`,    
      method:'post',    
      data  
    })
  }
  // 运行日志 
  export function log(data) {  
    return request({    
      url:`/api/data/log`,    
      method:'post',    
      data  
    })
  }
  // 实时列表 
  export function onboard(data) {  
    return request({    
      url:`/api/data/onboard`,    
      method:'post',    
      data  
    })
  }