# 襄行摩友小程序 - Mock与Bmob API 对接指南

## 目录

1. [前期开发：Mock 模式](#前期开发mock-模式)
2. [API 规范设计](#api-规范设计)
3. [数据类型定义](#数据类型定义)
4. [Bmob 数据库设计](#bmob-数据库设计)
5. [后期对接：切换到真实 Bmob](#后期对接切换到真实-bmob)

---

## 前期开发：Mock 模式

### 1.1 当前状态

✅ **前期开发完全使用 Mock，无需配置 Bmob Key**

- Mock 数据已内置在代码中
- 直接运行 `pnpm dev:mp-weixin` 即可开发
- 无需任何后端配置

### 1.2 Mock 数据位置

| 文件 | 说明 |
|------|------|
| [src/api/services/homeService.ts](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/api/services/homeService.ts) | 首页数据 API 服务 |
| [src/composables/useHomeData.ts](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/composables/useHomeData.ts) | 首页数据管理 |

### 1.3 添加新页面的 Mock 数据

```typescript
// 示例：新增一个服务文件 src/api/services/xxxService.ts
export class XxxService {
  static async getXxxData(): Promise<XxxData[]> {
    try {
      // 模拟数据（前期使用）
      return [
        { id: '1', name: '数据1' },
        { id: '2', name: '数据2' },
      ]
      
      // 后期取消下面注释，启用 Bmob API
      // const result = await bmob.request<XxxData[]>('/classes/XxxTable')
      // return result.results
    } catch (error) {
      return []
    }
  }
}
```

---

## API 规范设计

### 2.1 首页 API

#### 2.1.1 获取轮播图列表

**接口地址：** `GET /classes/Banner`

**请求参数：** 无

**响应数据：**
```typescript
{
  results: BannerData[]
}
```

**Mock 数据：** [homeService.ts#getBanners](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/api/services/homeService.ts#L8-L50)

---

#### 2.1.2 获取快捷入口列表

**接口地址：** `GET /classes/QuickEntry`

**请求参数：** 无

**响应数据：**
```typescript
{
  results: QuickEntry[]
}
```

**Mock 数据：** [homeService.ts#getQuickEntries](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/api/services/homeService.ts#L53-L113)

---

#### 2.1.3 获取骑行数据

**接口地址：** `GET /classes/RideData/{objectId}`

**请求参数：** 无

**响应数据：**
```typescript
{
  totalDistance: number
  totalDays: number
  totalRoutes: number
}
```

**Mock 数据：** [homeService.ts#getRideData](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/api/services/homeService.ts#L116-L137)

---

#### 2.1.4 获取活动列表

**接口地址：** `GET /classes/Activity`

**请求参数：**
```typescript
{
  limit: number,  // 分页条数，默认10
  skip: number,   // 跳过条数，默认0
  order: '-createdAt'  // 排序，默认按创建时间倒序
}
```

**响应数据：**
```typescript
{
  results: ActivityItem[]
}
```

**Mock 数据：** [homeService.ts#getActivities](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/api/services/homeService.ts#L140-L195)

---

#### 2.1.5 切换城市

**接口地址：** `POST /classes/UserPreference`

**请求参数：**
```typescript
{
  city: string
}
```

**响应数据：**
```typescript
{
  objectId: string
  createdAt: string
}
```

**Mock 数据：** [homeService.ts#switchCity](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/api/services/homeService.ts#L198-L207)

---

## 数据类型定义

### 3.1 Banner 数据类型

**文件位置：** [src/types/banner/index.ts](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/types/banner/index.ts)

```typescript
export interface BannerData {
  id: string              // Bmob objectId
  title: string           // 标题
  desc: string            // 描述
  tag?: string            // 标签（可选）
  url?: string            // 跳转链接（可选）
  // Bmob 自动字段
  createdAt?: string
  updatedAt?: string
}
```

### 3.2 快捷入口数据类型

**文件位置：** [src/types/rideData/index.ts](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/types/rideData/index.ts)

```typescript
export interface QuickEntry {
  id: string              // Bmob objectId
  name: string            // 入口名称
  subname: string         // 副标题
  icon: string            // 图标
  highlight?: boolean     // 是否高亮（可选）
  badge?: string          // 角标文字（可选）
  path: string            // 跳转路径
  isTab?: boolean         // 是否是 TabBar 页面（可选）
  sort?: number           // 排序序号
  // Bmob 自动字段
  createdAt?: string
  updatedAt?: string
}
```

### 3.3 骑行数据类型

**文件位置：** [src/types/rideData/index.ts](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/types/rideData/index.ts)

```typescript
export interface RideData {
  id?: string             // Bmob objectId
  totalDistance: number   // 总里程（公里）
  totalDays: number       // 骑行天数
  totalRoutes: number     // 路线数量
  // Bmob 自动字段
  createdAt?: string
  updatedAt?: string
}
```

### 3.4 活动数据类型

**文件位置：** [src/types/activity/index.ts](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/types/activity/index.ts)

```typescript
export interface ActivityItem {
  id: string              // Bmob objectId
  title: string           // 活动标题
  date: string            // 活动日期
  time: string            // 活动时间
  info: string            // 活动详情
  tags: string[]          // 标签数组
  image: string           // 活动图片
  isUpcoming: boolean     // 是否即将开始
  countdownText?: string  // 倒计时文字（可选）
  maxParticipants?: number // 最大参与人数（可选）
  currentParticipants?: number // 当前参与人数（可选）
  location?: string       // 活动地点（可选）
  // Bmob 自动字段
  createdAt?: string
  updatedAt?: string
}
```

---

## Bmob 数据库设计

### 4.1 Bmob 功能说明

**Bmob 后端云内置功能：**

| 功能 | 说明 |
|------|------|
| 数据存储 | NoSQL 数据库，支持增删改查 |
| 用户系统 | 内置用户注册、登录、第三方登录 |
| 文件存储 | 图片、视频等文件上传 |
| 云函数 | 自定义后端逻辑 |
| 实时数据 | WebSocket 实时推送 |
| 数据安全 | 权限控制、数据验证 |

### 4.2 数据表设计

#### 表 1：Banner（轮播图）

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | String | ✅ | 标题 |
| desc | String | ✅ | 描述 |
| tag | String | ❌ | 标签 |
| url | String | ❌ | 跳转链接 |
| sort | Number | ❌ | 排序序号 |
| status | Boolean | ❌ | 是否显示 |

**Bmob 控制台创建步骤：**
1. 登录 Bmob 控制台
2. 创建应用，获取 AppID 和 REST Key
3. 进入「数据」→「添加表」
4. 表名输入：`Banner`
5. 添加上述字段

---

#### 表 2：QuickEntry（快捷入口）

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | ✅ | 入口名称 |
| subname | String | ✅ | 副标题 |
| icon | String | ✅ | 图标 |
| highlight | Boolean | ❌ | 是否高亮 |
| badge | String | ❌ | 角标文字 |
| path | String | ✅ | 跳转路径 |
| isTab | Boolean | ❌ | 是否是 TabBar 页面 |
| sort | Number | ❌ | 排序序号 |
| status | Boolean | ❌ | 是否显示 |

**Bmob 控制台创建步骤：**
1. 进入「数据」→「添加表」
2. 表名输入：`QuickEntry`
3. 添加上述字段

---

#### 表 3：RideData（骑行数据）

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| totalDistance | Number | ✅ | 总里程（公里） |
| totalDays | Number | ✅ | 骑行天数 |
| totalRoutes | Number | ✅ | 路线数量 |
| userId | Pointer | ❌ | 关联用户（可选） |

**Bmob 控制台创建步骤：**
1. 进入「数据」→「添加表」
2. 表名输入：`RideData`
3. 添加上述字段

---

#### 表 4：Activity（活动）

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | String | ✅ | 活动标题 |
| date | String | ✅ | 活动日期 |
| time | String | ✅ | 活动时间 |
| info | String | ✅ | 活动详情 |
| tags | Array | ✅ | 标签数组 |
| image | String | ✅ | 活动图片 |
| isUpcoming | Boolean | ✅ | 是否即将开始 |
| countdownText | String | ❌ | 倒计时文字 |
| maxParticipants | Number | ❌ | 最大参与人数 |
| currentParticipants | Number | ❌ | 当前参与人数 |
| location | String | ❌ | 活动地点 |
| status | Boolean | ❌ | 是否显示 |

**Bmob 控制台创建步骤：**
1. 进入「数据」→「添加表」
2. 表名输入：`Activity`
3. 添加上述字段

---

#### 表 5：UserPreference（用户偏好）

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| city | String | ✅ | 当前城市 |
| userId | Pointer | ❌ | 关联用户（可选） |

**Bmob 控制台创建步骤：**
1. 进入「数据」→「添加表」
2. 表名输入：`UserPreference`
3. 添加上述字段

---

### 4.3 初始化数据

**在 Bmob 控制台手动添加初始数据：**

#### Banner 初始数据

| title | desc | tag | url | sort |
|-------|------|-----|-----|------|
| 唐城追焦夜骑 | 每周六晚 唐城城墙下 骑行&摄影活动 | 热门 | /pages/activity/activity | 1 |
| 古城环线晨骑 | 襄阳古城墙环线，全程约25公里 | 周末 | /pages/activity/activity | 2 |
| 汉江沿岸骑行 | 沿汉江绿道，尽享江风拂面 | 推荐 | /pages/map/map | 3 |
| 隆中至武当山 | 襄阳至武当山摩旅路线，约180公里 | 长途 | /pages/map/map | 4 |

#### QuickEntry 初始数据

| name | subname | icon | highlight | path | isTab | sort |
|------|---------|------|-----------|------|-------|------|
| 骑行地图 | 襄阳本地路线 | carbon:map | true | /pages/map/map | true | 1 |
| 骑行数据 | 我的骑行轨迹 | chart | true | /pages/data/data | true | 2 |
| 活动接龙 | 本地活动报名 | calendar | false | /pages/activity/activity | true | 3 |
| 天气查询 | 出行天气参考 | carbon:cloud | false | /pages/weather/weather | false | 4 |
| 禁摩限行 | 安全出行指南 | warning | false | /pages/traffic/traffic | false | 5 |
| 口碑店铺 | 摩友推荐商家 | shop | false | /pages/shop/shop | false | 6 |

#### RideData 初始数据

| totalDistance | totalDays | totalRoutes |
|---------------|-----------|-------------|
| 1286 | 45 | 12 |

---

## 后期对接：切换到真实 Bmob

### 5.1 准备工作

#### 步骤 1：注册 Bmob 账号
1. 访问 https://www.bmob.cn/
2. 注册账号并登录
3. 创建新应用，选择「小程序」类型

#### 步骤 2：获取 Bmob 密钥
1. 进入应用设置
2. 复制以下信息：
   - **Application ID**（应用 ID）
   - **REST API Key**（REST 密钥）

#### 步骤 3：创建数据表
按照 [4.2 数据表设计](#42-数据表设计) 在 Bmob 控制台创建所有数据表并添加初始数据

---

### 5.2 配置环境变量

编辑项目根目录下的环境变量文件：

#### 开发环境：`.env.development`
```env
# Bmob 配置
VITE_BMOB_APP_ID=你的ApplicationID
VITE_BMOB_REST_KEY=你的RESTAPIKey
```

#### 生产环境：`.env.production`
```env
# Bmob 配置
VITE_BMOB_APP_ID=你的ApplicationID
VITE_BMOB_REST_KEY=你的RESTAPIKey
```

---

### 5.3 使用 Alova 优化 API 请求

#### Alova 是什么？

**Alova 是一个智能的 API 请求管家**，帮你处理：
- 统一的请求管理
- 自动的状态管理（loading、error、data）
- 内置的缓存策略
- 统一的错误处理
- 请求优化（防抖、节流）

#### 步骤 1：配置 Alova 实例

**文件位置：** [src/api/core/instance.ts](file:///Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/api/core/instance.ts)

```typescript
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import vueHook from 'alova/vue'

// 配置 Bmob API 基础 URL
const BMOB_API_URL = 'https://api2.bmob.cn/1'

export const alovaInstance = createAlova({
  baseURL: BMOB_API_URL,
  ...AdapterUniapp(),
  statesHook: vueHook,
  beforeRequest: (method) => {
    // 添加 Bmob 认证头
    method.config.headers['X-Bmob-Application-Id'] = import.meta.env.VITE_BMOB_APP_ID
    method.config.headers['X-Bmob-REST-API-Key'] = import.meta.env.VITE_BMOB_REST_KEY
    method.config.headers['Content-Type'] = 'application/json'
  },
  responded: {
    onSuccess: (response) => {
      // 直接返回数据
      return response
    },
    onError: (error) => {
      console.error('API 错误:', error)
      throw error
    },
  },
  timeout: 60000,
})
```

#### 步骤 2：创建 Alova API 服务

**创建文件：** `src/api/services/homeAlovaService.ts`

```typescript
import { alovaInstance } from '@/api/core/instance'
import type { BannerData } from '@/types/banner'
import type { QuickEntry, RideData } from '@/types/rideData'
import type { ActivityItem } from '@/types/activity'

export class HomeAlovaService {
  // 获取轮播图
  static getBanners() {
    return alovaInstance.Get<BannerData[]>('/classes/Banner', {
      params: { order: 'sort' },
      cacheFor: 5 * 60 * 1000, // 缓存5分钟
    })
  }

  // 获取快捷入口
  static getQuickEntries() {
    return alovaInstance.Get<QuickEntry[]>('/classes/QuickEntry', {
      params: { order: 'sort' },
      cacheFor: 10 * 60 * 1000, // 缓存10分钟
    })
  }

  // 获取骑行数据
  static getRideData() {
    return alovaInstance.Get<RideData>('/classes/RideData')
  }

  // 获取活动列表
  static getActivities(page = 1, pageSize = 10) {
    return alovaInstance.Get<ActivityItem[]>('/classes/Activity', {
      params: {
        limit: pageSize,
        skip: (page - 1) * pageSize,
        order: '-createdAt',
      },
      cacheFor: 2 * 60 * 1000, // 缓存2分钟
    })
  }

  // 切换城市
  static switchCity(city: string) {
    return alovaInstance.Post('/classes/UserPreference', { city })
  }
}
```

#### 步骤 3：在页面中使用 Alova

**使用示例：**

```typescript
import { useRequest } from 'alova'
import { HomeAlovaService } from '@/api/services/homeAlovaService'

// 在组件中使用
const {
  data: banners,
  loading: bannersLoading,
  error: bannersError,
  refresh: refreshBanners
} = useRequest(HomeAlovaService.getBanners())

const {
  data: activities,
  loading: activitiesLoading,
  error: activitiesError
} = useRequest(HomeAlovaService.getActivities())

// 手动刷新数据
function refreshData() {
  refreshBanners()
}
```

#### 步骤 4：切换到 Bmob 模式

**修改文件：** `src/api/services/homeService.ts`

**使用 Alova 版本：**

```typescript
import { HomeAlovaService } from './homeAlovaService'

export class HomeService {
  static async getBanners() {
    try {
      const response = await HomeAlovaService.getBanners()
      return response.data.results
    } catch (error) {
      console.error('获取轮播图失败:', error)
      return []
    }
  }

  // 其他方法类似...
}
```

**需要修改的方法：**
- `getBanners()`
- `getQuickEntries()`
- `getRideData()`
- `getActivities()`
- `switchCity()`

---

### 5.4 测试与验证

#### 步骤 1：启动开发服务器
```bash
pnpm dev:mp-weixin
```

#### 步骤 2：验证数据加载
- 打开微信开发者工具
- 检查首页数据是否正常从 Bmob 加载
- 查看控制台日志确认请求成功

#### 步骤 3：测试功能
- 测试轮播图跳转
- 测试快捷入口跳转
- 测试城市切换
- 测试活动列表展示

---

### 5.5 部署上线

#### 步骤 1：构建生产版本
```bash
pnpm build:mp-weixin
```

#### 步骤 2：上传到微信开发者工具
- 将 `dist/dev/mp-weixin` 目录导入微信开发者工具
- 配置小程序 AppID
- 上传代码

#### 步骤 3：提交审核
- 在微信公众平台提交审核
- 确保所有功能正常

---

## 快速参考

### Mock 模式开发（当前）
✅ 无需任何配置  
✅ 直接运行 `pnpm dev:mp-weixin`  
✅ 使用内置 Mock 数据

### Bmob 模式切换（后期）
1. 注册 Bmob 账号，创建应用
2. 在 Bmob 控制台创建数据表
3. 配置环境变量
4. 修改 `homeService.ts` 启用 Bmob API
5. 测试验证

---

## 常见问题

### Q: 前期开发真的不需要 Bmob 吗？
A: 是的！前期完全使用 Mock 数据，无需任何后端配置。

### Q: 后期切换到 Bmob 麻烦吗？
A: 非常简单！只需配置环境变量和取消几行代码注释。

### Q: Bmob 收费吗？
A: Bmob 有免费版，足够初期使用。后期用户量大了可以升级付费版。

### Q: 数据表字段可以修改吗？
A: 可以！在 Bmob 控制台可以随时添加、修改、删除字段。

---

**文档版本：** v1.0  
**最后更新：** 2026-04-16
