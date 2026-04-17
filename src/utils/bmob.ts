// Bmob 后端云配置
// 注意：实际使用时需要在环境变量中配置 APP_ID 和 REST_KEY

const BmobConfig = {
  appId: import.meta.env.VITE_BMOB_APP_ID || 'YOUR_BMOB_APP_ID',
  restKey: import.meta.env.VITE_BMOB_REST_KEY || 'YOUR_BMOB_REST_KEY',
  apiUrl: 'https://api2.bmob.cn/1',
}

// Bmob API 基础请求函数
export async function bmobRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> {
  const url = `${BmobConfig.apiUrl}${endpoint}`
  
  const headers = {
    'X-Bmob-Application-Id': BmobConfig.appId,
    'X-Bmob-REST-API-Key': BmobConfig.restKey,
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Bmob API error: ${response.status}`)
    }

    const result = await response.json()
    return result as T
  } catch (error) {
    console.error('Bmob request failed:', error)
    throw error
  }
}

// Bmob 云函数调用
export async function bmobCloudFunction<T>(
  functionName: string,
  params?: any
): Promise<T> {
  return bmobRequest<T>(`/functions/${functionName}`, 'POST', params)
}

// Bmob 文件上传
export async function bmobUploadFile(
  filePath: string,
  fileName: string
): Promise<{ file: { url: string; name: string } }> {
  const formData = new FormData()
  formData.append('file', {
    uri: filePath,
    name: fileName,
    type: 'image/jpeg',
  } as any)

  const url = `${BmobConfig.apiUrl}/files/${fileName}`
  
  const headers = {
    'X-Bmob-Application-Id': BmobConfig.appId,
    'X-Bmob-REST-API-Key': BmobConfig.restKey,
    // 注意：文件上传时不要设置 Content-Type，浏览器会自动设置
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error(`File upload failed: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Bmob file upload failed:', error)
    throw error
  }
}

export default {
  request: bmobRequest,
  cloudFunction: bmobCloudFunction,
  uploadFile: bmobUploadFile,
  config: BmobConfig,
}
