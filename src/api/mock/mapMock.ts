/**
 * 地图模块 Mock 数据
 * 方便前端开发和调试，后续对接到 Bmob 后端
 */
import type { RideRoute } from '@/types'

export const mockRoutes: RideRoute[] = [
  // ================================================
  // 摩友实测路线（2026.05.28 明辰玩摄影车队实测）
  // ================================================

  {
    id: '0',
    name: '赵湾最美天路探险环线',
    description: '襄阳版"318 天路"完整环线！从谷城旺恒广场出发，经谷栗路到盛康镇补给，深入赵湾乡八里荒冲坡探险（废弃滑雪场坡道），游玩后经竹缘民宿到赵湾乡，再走小路到渔坪村（两河口区域），最后经紫金镇、石花镇返回县城。全程约 160km，途经赵湾天路、八里荒云雾山巅、两河口南河风光，风光媲美贵州 + 秦岭结合体。',
    shortDescription: '襄阳版 318 天路环线！赵湾天路 + 八里荒冲坡 + 渔坪南河风光，全程 160km 媲美贵州 + 秦岭',
    region: 'gucheng',
    loopType: 'loop',
    path: [
      // 【第一段】旺恒广场 → 盛康镇（补给）
      { latitude: 32.2550, longitude: 111.6450 }, // 旺恒广场（起点）
      { latitude: 32.2480, longitude: 111.6380 }, // 谷栗路起点
      { latitude: 32.2180, longitude: 111.5920 }, // 盛康镇中心
      { latitude: 32.2160, longitude: 111.5900 }, // 盛康镇超市（补给点）
      
      // 【第二段】盛康镇 → 八里荒（冲坡探险）
      { latitude: 32.2080, longitude: 111.5780 }, // 进山点
      { latitude: 32.1980, longitude: 111.5620 }, // 谷栗路中段
      { latitude: 32.1880, longitude: 111.5480 }, // 弯道风光
      { latitude: 32.1780, longitude: 111.5350 }, // 政府观景台
      { latitude: 32.1680, longitude: 111.5180 }, // 进入赵湾乡
      { latitude: 32.1620, longitude: 111.5050 }, // 赵湾天路起点
      { latitude: 32.1520, longitude: 111.4920 }, // 八里荒坡道（冲坡点）
      { latitude: 32.1480, longitude: 111.4880 }, // 八里荒山顶（游玩点）
      
      // 【第三段】八里荒 → 竹缘民宿 → 赵湾乡 → 渔坪村
      { latitude: 32.1450, longitude: 111.4850 }, // 下山（往竹缘民宿方向）
      { latitude: 32.1380, longitude: 111.4780 }, // 竹缘民宿（路过）
      { latitude: 32.1320, longitude: 111.4680 }, // 赵湾乡
      { latitude: 32.1250, longitude: 111.4580 }, // 小路起点（往渔坪）
      { latitude: 32.1180, longitude: 111.4450 }, // 山路途中
      { latitude: 32.1080, longitude: 111.4320 }, // 渔坪村（南河小三峡）
      { latitude: 32.1020, longitude: 111.4220 }, // 渔坪观景台
      
      // 【第四段】渔坪 → 紫金镇 → 石花镇 → 返回县城
      { latitude: 32.1150, longitude: 111.4380 }, // 离开渔坪
      { latitude: 32.1280, longitude: 111.4550 }, // 紫金镇
      { latitude: 32.1450, longitude: 111.4850 }, // 241 国道
      { latitude: 32.1680, longitude: 111.5280 }, // 石花镇
      { latitude: 32.1950, longitude: 111.5680 }, // 返回途中
      { latitude: 32.2280, longitude: 111.6150 }, // 接近县城
      { latitude: 32.2550, longitude: 111.6450 }, // 旺恒广场（终点）
    ],
    segments: [
      {
        name: '旺恒广场 → 盛康镇',
        description: '县城出发，经谷栗路到盛康镇中心超市补给',
        path: [
          { latitude: 32.2550, longitude: 111.6450 },
          { latitude: 32.2160, longitude: 111.5900 },
        ],
        distance: 18,
        duration: 45,
        roadType: 'paved',
      },
      {
        name: '盛康镇 → 赵湾天路 → 八里荒',
        description: '进山路段，谷栗路弯道连绵，途经襄阳最美公路"赵湾天路"，抵达八里荒冲坡探险',
        path: [
          { latitude: 32.2160, longitude: 111.5900 },
          { latitude: 32.1480, longitude: 111.4880 },
        ],
        distance: 35,
        duration: 90,
        roadType: 'paved',
        highlights: ['谷栗路弯道风光', '赵湾天路', '八里荒冲坡'],
      },
      {
        name: '八里荒 → 渔坪村',
        description: '游玩后经竹缘民宿、赵湾乡，走小路到渔坪村（两河口区域），南河沿岸风光媲美贵州 + 秦岭',
        path: [
          { latitude: 32.1480, longitude: 111.4880 },
          { latitude: 32.1020, longitude: 111.4220 },
        ],
        distance: 28,
        duration: 75,
        roadType: 'mixed',
        highlights: ['竹缘民宿', '赵湾乡', '渔坪村', '两河口', '南河沿岸风光'],
      },
      {
        name: '渔坪村 → 县城',
        description: '经紫金镇、石花镇，走 241 国道返回县城，高等级沥青路，骑行舒适',
        path: [
          { latitude: 32.1020, longitude: 111.4220 },
          { latitude: 32.2550, longitude: 111.6450 },
        ],
        distance: 79,
        duration: 120,
        roadType: 'paved',
      },
    ],
    difficulty: 'medium',
    distance: 160,
    duration: 330,  // 5.5 小时（含游玩时间）
    meetupPoint: {
      name: '旺恒广场',
      address: '谷城县城关镇旺恒广场',
      coordinates: { latitude: 32.2550, longitude: 111.6450 },
      time: '09:30',
    },
    tags: ['mountain', 'photo', 'adventure', 'leisure'],
    elevation: {
      min: 280,
      max: 1200,
      gain: 920,
    },
    adventureAreas: [
      {
        name: '八里荒废弃坡道',
        type: 'offroad_park',
        description: '之前规划滑雪场遗留的非铺装坡道，适合巡航车轻度越野冲坡体验，登顶后云雾缭绕，视野绝佳',
        coordinates: { latitude: 32.1520, longitude: 111.4920 },
        difficulty: 'medium',
      },
    ],
    roadCondition: '全程以柏油路为主，八里荒冲坡段为非铺装路面（轻度越野），两河口段为山区小路但路况良好，返回段 241 国道为高等级沥青路。',
    bestSeason: '5-10 月（夏季避暑绝佳，秋季层林尽染，冬季可遇雾凇）',
    highlights: [
      '襄阳最美公路"赵湾天路"，媲美 318 国道',
      '海拔 1200 米高山云雾，视野绝佳',
      '非铺装坡道，巡航车轻度越野体验',
      '渔坪村两河口区域，贵州 + 秦岭结合体',
      '南河沿岸风光，河水碧绿山体雄伟',
      '241 国道高等级沥青路，骑行舒适',
    ],
    spots: [
      {
        id: 's0-1',
        name: '旺恒广场（集合点）',
        type: 'photo',
        coordinates: { latitude: 32.2550, longitude: 111.6450 },
        description: '早上 9:30 集合，县城地标，停车方便',
        tags: ['集合', '停车'],
      },
      {
        id: 's0-2',
        name: '盛康镇中心超市',
        type: 'food',
        coordinates: { latitude: 32.2160, longitude: 111.5900 },
        description: '补给站，采购饮料、食物、水',
        tags: ['补给', '超市'],
      },
      {
        id: 's0-3',
        name: '谷栗路观景台',
        type: 'scenic',
        coordinates: { latitude: 32.1780, longitude: 111.5350 },
        description: '政府修建的城墙坨子观景台，登顶远眺，山谷风光尽收眼底',
        tags: ['观景', '拍照'],
      },
      {
        id: 's0-4',
        name: '赵湾天路起点',
        type: 'photo',
        coordinates: { latitude: 32.1620, longitude: 111.5050 },
        description: '襄阳最美公路起点，打卡留念',
        tags: ['打卡', '天路'],
      },
      {
        id: 's0-5',
        name: '八里荒废弃坡道',
        type: 'adventure',
        coordinates: { latitude: 32.1520, longitude: 111.4920 },
        description: '滑雪场规划时遗留的非铺装坡道，适合巡航车轻度越野冲坡，登顶后云雾缭绕，非常爽',
        tags: ['越野', '冲坡', '探险', '云雾'],
      },
      {
        id: 's0-6',
        name: '八里荒山顶',
        type: 'scenic',
        coordinates: { latitude: 32.1480, longitude: 111.4880 },
        description: '海拔较高，云雾飘飘，视野开阔，游玩拍照',
        tags: ['云雾', '摄影', '观景'],
      },
      {
        id: 's0-7',
        name: '竹缘民宿',
        type: 'coffee',
        coordinates: { latitude: 32.1380, longitude: 111.4780 },
        description: '路过打卡，山间特色民宿',
        tags: ['民宿', '路过'],
      },
      {
        id: 's0-8',
        name: '赵湾乡',
        type: 'scenic',
        coordinates: { latitude: 32.1320, longitude: 111.4680 },
        description: '赵湾乡集镇，可稍作休息',
        tags: ['乡镇', '休息'],
      },
      {
        id: 's0-9',
        name: '渔坪村',
        type: 'scenic',
        coordinates: { latitude: 32.1080, longitude: 111.4320 },
        description: '两河口区域，南河沿岸风光，河水碧绿，山体雄伟，风光媲美贵州 + 秦岭结合体',
        tags: ['风光', '河流', '摄影'],
      },
      {
        id: 's0-10',
        name: '两河口观景台',
        type: 'scenic',
        coordinates: { latitude: 32.1020, longitude: 111.4220 },
        description: '南河沿岸原生态山水，溪水蜿蜒，奇峰耸立，可露营观星',
        tags: ['露营', '摄影', '原生态'],
      },
      {
        id: 's0-11',
        name: '紫金镇',
        type: 'food',
        coordinates: { latitude: 32.1280, longitude: 111.4550 },
        description: '途经小镇，可补充补给',
        tags: ['补给', '路过'],
      },
      {
        id: 's0-12',
        name: '石花镇',
        type: 'food',
        coordinates: { latitude: 32.1680, longitude: 111.5280 },
        description: '石花镇，可品尝当地美食',
        tags: ['美食', '路过'],
      },
    ],
  },

  // ================================================
  // 谷城县核心路线（重点服务区域）
  // ================================================

  {
    id: '6',
    name: '樱花谷环线',
    description: '春季限定！谷城樱花谷景区环线，漫山遍野樱花盛开，拍照绝佳。高等级沥青路，坡度平缓，适合新手。',
    shortDescription: '春季限定！樱花谷景区环线，漫山遍野樱花盛开，高等级沥青路适合新手',
    region: 'gucheng',
    path: [
      { latitude: 32.2580, longitude: 111.6520 },
      { latitude: 32.2450, longitude: 111.6680 },
      { latitude: 32.2320, longitude: 111.6580 },
      { latitude: 32.2280, longitude: 111.6350 },
      { latitude: 32.2480, longitude: 111.6280 },
      { latitude: 32.2580, longitude: 111.6520 },
    ],
    difficulty: 'easy',
    distance: 28,
    duration: 120,
    spots: [
      {
        id: 's6-1',
        name: '樱花谷入口',
        type: 'photo',
        coordinates: { latitude: 32.2550, longitude: 111.6500 },
        description: '景区大门，标志性打卡点',
        tags: ['打卡', '樱花'],
      },
      {
        id: 's6-2',
        name: '樱花观景台',
        type: 'scenic',
        coordinates: { latitude: 32.2420, longitude: 111.6650 },
        description: '俯瞰整片樱花林，拍照绝佳',
        tags: ['观景', '樱花'],
      },
      {
        id: 's6-3',
        name: '农家乐小院',
        type: 'food',
        coordinates: { latitude: 32.2350, longitude: 111.6550 },
        description: '地道谷城农家菜，推荐樱花鸡蛋、山野菜',
        tags: ['农家菜', '特色'],
      },
      {
        id: 's6-4',
        name: '山泉水取水点',
        type: 'scenic',
        coordinates: { latitude: 32.2300, longitude: 111.6380 },
        description: '天然山泉水，清澈甘甜',
        tags: ['泉水', '自然'],
      },
      {
        id: 's6-5',
        name: '樱花林草坪',
        type: 'camp',
        coordinates: { latitude: 32.2450, longitude: 111.6320 },
        description: '林间空地，可露营休息',
        tags: ['露营', '休闲'],
      },
    ],
  },

  {
    id: '7',
    name: '五山茶园品路线',
    description: '谷城五山镇高山云雾茶产区，连绵茶园风光，可体验采茶、品茶。山路蜿蜒但路况极好，适合中级骑手。',
    shortDescription: '五山镇高山云雾茶产区，连绵茶园风光，可体验采茶品茶，山路蜿蜒路况好',
    region: 'gucheng',
    path: [
      { latitude: 32.2850, longitude: 111.5680 },
      { latitude: 32.2950, longitude: 111.5820 },
      { latitude: 32.3080, longitude: 111.5750 },
      { latitude: 32.3150, longitude: 111.5580 },
      { latitude: 32.3020, longitude: 111.5450 },
      { latitude: 32.2850, longitude: 111.5680 },
    ],
    difficulty: 'medium',
    distance: 35,
    duration: 150,
    spots: [
      {
        id: 's7-1',
        name: '五山茶园观景台',
        type: 'photo',
        coordinates: { latitude: 32.2920, longitude: 111.5800 },
        description: '俯瞰层层茶园，拍照打卡必到',
        tags: ['观景', '茶园'],
      },
      {
        id: 's7-2',
        name: '云雾茶体验馆',
        type: 'coffee',
        coordinates: { latitude: 32.3050, longitude: 111.5720 },
        description: '品尝正宗谷城云雾茶，可购买',
        tags: ['品茶', '体验'],
      },
      {
        id: 's7-3',
        name: '采茶体验园',
        type: 'scenic',
        coordinates: { latitude: 32.3100, longitude: 111.5680 },
        description: '春季可体验采茶，制茶',
        tags: ['体验', '茶文化'],
      },
      {
        id: 's7-4',
        name: '山顶茶田',
        type: 'scenic',
        coordinates: { latitude: 32.3130, longitude: 111.5600 },
        description: '茶园最佳观景位置',
        tags: ['观景', '山顶'],
      },
      {
        id: 's7-5',
        name: '茶乡农家乐',
        type: 'food',
        coordinates: { latitude: 32.2980, longitude: 111.5500 },
        description: '茶叶炒蛋、茶香排骨等特色菜',
        tags: ['农家菜', '茶文化'],
      },
    ],
  },

  {
    id: '9',
    name: '薤山森林公园线',
    description: '谷城薤山省级森林公园，森林覆盖率 95%，天然氧吧。夏季避暑胜地，山路平缓适合休闲骑。',
    shortDescription: '薤山省级森林公园，森林覆盖率 95% 天然氧吧，夏季避暑胜地，山路平缓',
    region: 'gucheng',
    path: [
      { latitude: 32.3280, longitude: 111.3680 },
      { latitude: 32.3420, longitude: 111.3820 },
      { latitude: 32.3550, longitude: 111.3750 },
      { latitude: 32.3620, longitude: 111.3580 },
      { latitude: 32.3480, longitude: 111.3450 },
      { latitude: 32.3280, longitude: 111.3680 },
    ],
    difficulty: 'easy',
    distance: 32,
    duration: 140,
    spots: [
      {
        id: 's9-1',
        name: '森林公园入口',
        type: 'scenic',
        coordinates: { latitude: 32.3300, longitude: 111.3660 },
        description: '景区大门，游客中心',
        tags: ['入口', '服务'],
      },
      {
        id: 's9-2',
        name: '森林步道',
        type: 'scenic',
        coordinates: { latitude: 32.3450, longitude: 111.3800 },
        description: '林间小道，空气清新',
        tags: ['森林', '步道'],
      },
      {
        id: 's9-3',
        name: '避暑山庄',
        type: 'coffee',
        coordinates: { latitude: 32.3520, longitude: 111.3720 },
        description: '山顶休息站，茶饮简餐',
        tags: ['休息', '避暑'],
      },
      {
        id: 's9-4',
        name: '古银杏树',
        type: 'photo',
        coordinates: { latitude: 32.3580, longitude: 111.3600 },
        description: '千年古银杏，秋季金黄',
        tags: ['古树', '秋季'],
      },
      {
        id: 's9-5',
        name: '山泉瀑布',
        type: 'scenic',
        coordinates: { latitude: 32.3450, longitude: 111.3500 },
        description: '天然瀑布，夏季清凉',
        tags: ['瀑布', '避暑'],
      },
    ],
  },

  {
    id: '10',
    name: '庙滩田园风光线',
    description: '谷城庙滩镇田园风光，平坦道路穿越农田村庄，体验乡村慢生活。适合家庭休闲骑、新手入门。',
    shortDescription: '庙滩镇田园风光，平坦道路穿越农田村庄，体验乡村慢生活，适合家庭休闲骑',
    region: 'gucheng',
    path: [
      { latitude: 32.1580, longitude: 111.7250 },
      { latitude: 32.1450, longitude: 111.7380 },
      { latitude: 32.1320, longitude: 111.7320 },
      { latitude: 32.1250, longitude: 111.7150 },
      { latitude: 32.1380, longitude: 111.7050 },
      { latitude: 32.1580, longitude: 111.7250 },
    ],
    difficulty: 'easy',
    distance: 22,
    duration: 90,
    spots: [
      {
        id: 's10-1',
        name: '庙滩古镇',
        type: 'photo',
        coordinates: { latitude: 32.1550, longitude: 111.7230 },
        description: '古镇老街，历史建筑',
        tags: ['古镇', '历史'],
      },
      {
        id: 's10-2',
        name: '油菜花田',
        type: 'scenic',
        coordinates: { latitude: 32.1420, longitude: 111.7350 },
        description: '春季油菜花海，拍照绝美',
        tags: ['花田', '春季'],
      },
      {
        id: 's10-3',
        name: '河畔柳树',
        type: 'scenic',
        coordinates: { latitude: 32.1350, longitude: 111.7280 },
        description: '河边垂柳，休闲散步',
        tags: ['河景', '休闲'],
      },
      {
        id: 's10-4',
        name: '农家果园',
        type: 'food',
        coordinates: { latitude: 32.1280, longitude: 111.7180 },
        description: '季节性采摘，草莓、葡萄等',
        tags: ['果园', '采摘'],
      },
      {
        id: 's10-5',
        name: '乡村小院',
        type: 'food',
        coordinates: { latitude: 32.1400, longitude: 111.7100 },
        description: '地道乡村菜，土灶台',
        tags: ['农家菜', '乡村'],
      },
    ],
  },
]
