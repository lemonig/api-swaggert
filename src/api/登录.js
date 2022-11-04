
  import request from '@/utils/request' 
  const basePath='undefined'
  // 单点注销 
  export function logout(data) {  
    return request({    
      url:`/api/sso/logout`,    
      method:'post',    
      data  
    })
  }
  // 根据票据获取TOKEN 
  export function doLoginByTicket(data) {  
    return request({    
      url:`/api/sso/doLoginByTicket`,    
      method:'post',    
      data  
    })
  }
  // 获取单点登录跳转地址 
  export function getSsoAuthUrl(data) {  
    return request({    
      url:`/api/sso/getSsoAuthUrl`,    
      method:'post',    
      data  
    })
  }
  // 获取当前用户信息 
  export function owner(data) {  
    return request({    
      url:`/api/user/owner`,    
      method:'post',    
      data  
    })
  }