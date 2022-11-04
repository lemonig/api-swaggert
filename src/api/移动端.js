
  import request from '@/utils/request' 
  const basePath='undefined'
  // 提交检查 
  export function submit(data) {  
    return request({    
      url:`/api/check/record/submit`,    
      method:'post',    
      data  
    })
  }
  // 登陆 
  export function login(data) {  
    return request({    
      url:`/api/login`,    
      method:'post',    
      data  
    })
  }
  // 检查详情 
  export function detail(data) {  
    return request({    
      url:`/api/check/record/detail`,    
      method:'post',    
      data  
    })
  }
  // 站点目录 
  export function list(data) {  
    return request({    
      url:`/api/station/list`,    
      method:'post',    
      data  
    })
  }
  // 新建检查校验 
  export function validator(data) {  
    return request({    
      url:`/api/check/record/validator`,    
      method:'post',    
      data  
    })
  }
  // 文件上传 
  export function image(data) {  
    return request({    
      url:`/api/upload/image`,    
      method:'post',    
      data  
    })
  }
  // 问题保存 
  export function save(data) {  
    return request({    
      url:`/api/check/record/question/save`,    
      method:'post',    
      data  
    })
  }