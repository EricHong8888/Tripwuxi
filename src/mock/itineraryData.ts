// 行程数据
export interface ItineraryItem {
  time: string;
  activity: string;
  type: 'default' | 'highlight' | 'important';
  duration?: number; // 持续时间，单位分钟
}

export interface DayItinerary {
  date: string;
  activities: ItineraryItem[];
  attractions: string[];
  attractionDetails: AttractionDetail[];
  foods: string[];
  hotel: {
    name: string;
    address?: string;
  };
  venue?: {
    name: string;
    address?: string;
  };
  contacts: {
    name: string;
    phone: string;
  }[];
  materials: string[];
}

// 景点详情数据
export interface AttractionDetail {
  name: string;
  price?: string;
  description: string;
  imageUrl: string;
  openingHours: string;
  highlights: string[]; // 添加重要看点
}

const attractionDetails: Record<string, AttractionDetail> = {
  '狮子林': {
    name: '狮子林',
    price: '30元',
    description: '狮子林始建于元代至正二年（1342年），是中国古典私家园林建筑的代表之一。因园内石峰林立，多状似狮子，故名"狮子林"。狮子林以假山著称，山占地面积约0.15公顷。假山群峰起伏，气势雄浑，奇峰怪石，玲珑剔透。假山群共有九条路线，21个洞口，走进去如同迷宫一般。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Suzhou%20Lion%20Forest%20Classical%20Garden%2C%20traditional%20Chinese%20garden%2C%20rock%20formations%2C%20pavilions%2C%20lakes&sign=864540c70fe6f9c4f96f32a43f8738df',
    openingHours: '07:30-17:30',
    highlights: [
      '被誉为"假山王国"的古典园林',
      '元代园林的代表作品',
      '迷宫般的假山群，有21个洞口',
      '寺观园林的典型案例'
    ]
  },
  '拙政园': {
    name: '拙政园',
    price: '70元',
    description: '拙政园，位于江苏省苏州市，始建于明正德初年（16世纪初），是江南古典园林的代表作品。拙政园与北京颐和园、承德避暑山庄、苏州留园一起被誉为中国四大名园。全园以水为中心，山水萦绕，厅榭精美，花木繁茂，具有浓郁的江南水乡特色。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Humble%20Administrator%27s%20Garden%20in%20Suzhou%2C%20traditional%20Chinese%20garden%2C%20pavilion%2C%20lake%2C%20lotus%20flowers&sign=8a42f0235549fb13fe07fe7491cf6850',
    openingHours: '07:30-17:30',
    highlights: [
      '中国四大名园之一',
      '江南古典园林的杰出代表',
      '以水为中心的园林布局',
      '四季皆美的观赏体验'
    ]
  },
  '苏州博物馆': {
    name: '苏州博物馆',
    price: '免费',
    description: '苏州博物馆成立于1960年，馆址为太平天国忠王府。1999年苏州市委、市政府邀请世界华人建筑师贝聿铭设计苏州博物馆新馆。新馆占地面积约10700平方米，建筑面积19000余平方米，加上修葺的太平天国忠王府，总建筑面积达26500平方米。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Suzhou%20Museum%2C%20modern%20architecture%20by%20I.M.%20Pei%2C%20traditional%20Chinese%20elements%2C%20exhibition%20halls&sign=4939cb25bdf74cc4d0d39f5b7186afff',
    openingHours: '09:00-17:00（周一闭馆）',
    highlights: [
      '贝聿铭设计的现代建筑杰作',
      '融合传统与现代的设计理念',
      '丰富的江南文物收藏',
      '太平天国忠王府古建筑'
    ]
  },
  '平江历史文化区': {
    name: '平江历史文化区',
    price: '免费',
    description: '平江历史街区位于苏州古城东北隅，是苏州迄今保存最完整、规模最大的历史街区，堪称苏州古城的缩影。街区内保存着许多古桥、古井、古巷、古牌坊、古民居、古祠堂等文物古迹和传统建筑。平江路是平江历史街区的核心，是一条沿河的小路，北接拙政园，南眺网师园。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Pingjiang%20Road%20historical%20district%2C%20ancient%20Chinese%20street%2C%20traditional%20architecture%2C%20water%20canal&sign=a6e654c9c377cc3a99771718959093f9',
    openingHours: '全天开放',
    highlights: [
      '苏州古城的缩影',
      '保存完好的明清建筑风貌',
      '典型的"小桥流水人家"景观',
      '众多老字号商铺和特色小吃'
    ]
  },
  '山塘街': {
    name: '山塘街',
    price: '部分景点收费',
    description: '山塘街位于江苏省苏州古城西北，东至红尘中"一二等富贵风流之地"阊门，西至"吴中第一名胜"虎丘，全长约3600米，约合7华里，故称"七里山塘到虎丘"。山塘街始建于唐代宝历年间，白居易任苏州刺史时，为便利苏州水陆交通而开凿。山塘街是苏州古城风貌中"小桥流水人家"的典型代表。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Shantang%20Street%20at%20night%2C%20ancient%20Chinese%20architecture%2C%20lit%20lanterns%2C%20water%20canal&sign=a99bb27ba6d4efe42e81842cb6ffe729',
    openingHours: '全天开放',
    highlights: [
      '白居易开凿的千年古街',
      '"七里山塘到虎丘"的文化韵味',
      '璀璨的夜景和传统灯笼',
      '丰富的民俗文化体验'
    ]
  },
  '惠山古镇': {
    name: '惠山古镇',
    price: '古镇免费，景点联票80元',
    description: '惠山古镇地处无锡市西、锡山与惠山的东北坡麓，海拔高8米，东经120°16’、北纬31°34’。距市中心仅2.5公里，京杭大运河紧靠其北流经。无锡史前文化距今已4000余年，有锡山先民施墩遗址。它以地理位置独特、自然环境优美、古祠堂群密集分布为特色，是无锡老街坊风貌保存完好的唯一街区。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Huishan%20Ancient%20Town%2C%20traditional%20Chinese%20architecture%2C%20ancient%20streets%2C%20historical%20buildings&sign=f61a4d1b4f3c88cd10be102b319eb1d2',
    openingHours: '08:00-17:30',
    highlights: [
      '密集的古祠堂群',
      '无锡老街坊风貌的代表',
      '紧邻京杭大运河的地理优势',
      '丰富的民间艺术和手工艺'
    ]
  },
  '寄畅园': {
    name: '寄畅园',
    price: '70元',
    description: '寄畅园是一处始建于明代的古典园林建筑，位于江苏省无锡市惠山横街。园址原为惠山寺沤寓房等二僧舍，明嘉靖初年（约公元1527年前后）曾任南京兵部尚书秦金（号凤山）得之，辟为园，名"凤谷山庄"。秦金殁，园归族侄秦瀚及其子江西布政使秦梁。万历十九年（公元1591年），秦梁之子秦燿以右副都御史巡抚湖广，将凤谷山庄改建为寄畅园。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Jichang%20Garden%2C%20traditional%20Chinese%20garden%2C%20pavilion%2C%20rock%20formations%2C%20trees&sign=10b51781d62eec77fa5dafec723cf542',
    openingHours: '08:00-17:00',
    highlights: [
      '明代古典园林的典范',
      '巧妙的借景手法，借惠山之景',
      '以自然山水为主题的园林设计',
      '丰富的历史文化内涵'
    ]
  },
  '天下第二泉': {
    name: '天下第二泉',
    price: '包含在惠山古镇联票内',
    description: '天下第二泉原名惠山泉，位于江苏省无锡市西郊惠山山麓锡惠公园内。唐代茶圣陆羽评定了天下水品二十等，惠山泉被列为天下第二泉。随后，刘伯刍、张又新等唐代茶人皆评定惠山泉水为"天下第二泉"。此泉经万千松根蓄存和砂岩涤滤，水质清纯甘冽，被唐代"茶圣"陆羽评为"天下第二"。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Huishan%20Spring%20the%20Second%20Spring%20Under%20Heaven%2C%20traditional%20Chinese%20garden%2C%20spring%20water%2C%20pavilion&sign=4d2db7adceca1209d783ee1fae457c77',
    openingHours: '08:00-17:30',
    highlights: [
      '唐代茶圣陆羽评定的"天下第二泉"',
      '清澈甘冽的泉水品质',
      '丰富的茶文化历史',
      '周边优美的自然环境'
    ]
  },
  '南街-夜游': {
    name: '南街',
    price: '免费',
    description: '南街是无锡市一条历史悠久的商业街，位于无锡老城区。这里保存了许多传统建筑和老字号店铺，是体验无锡传统文化和美食的好去处。夜游南街可以欣赏到美丽的夜景，感受江南水乡的独特魅力。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Nan%20Street%20night%20view%2C%20ancient%20Chinese%20architecture%2C%20lit%20lanterns%2C%20pedestrian%20street&sign=53ec560a45068777b1d28ebeb0675503',
    openingHours: '全天开放',
    highlights: [
      '无锡传统商业街的代表',
      '保存完好的历史建筑',
      '丰富的无锡地方美食',
      '热闹的夜市氛围'
    ]
  }
};

export const itineraryData: DayItinerary[] = [
  {
    date: '1月9日',
    activities: [
      { time: '6:45', activity: '起床', type: 'default', duration: 15 },
      { time: '8:00-8:30', activity: '发车前往高崎T4机场，办理托运', type: 'default', duration: 30 },
      { time: '8:50-9:20', activity: '安检，登机', type: 'default', duration: 30 },
      { time: '9:50-11:50', activity: '飞往常州奔牛机场', type: 'default', duration: 120 },
      { time: '12:30-13:00', activity: '取行李，取车', type: 'default', duration: 30 },
      { time: '13:30-15:15', activity: '到达狮子林-地上停车场（1小时36分钟）', type: 'default', duration: 105 },
      { time: '15:30-16:30', activity: '狮子林', type: 'highlight', duration: 60 },
      { time: '16:30-18:00', activity: '平江历史文化区', type: 'highlight', duration: 90 },
      { time: '18:00-18:30', activity: '到达酒店，修整', type: 'default', duration: 30 },
      { time: '19:00-21:30', activity: '山塘街游玩', type: 'highlight', duration: 150 }
    ],
    attractions: [
      '拙政园（70元）',
      '狮子林（30元）',
      '苏州博物馆',
      '平江路',
      '山塘街'
    ],
    attractionDetails: [
      attractionDetails['狮子林'],
      attractionDetails['平江历史文化区'],
      attractionDetails['山塘街']
    ],
    foods: [
      '松鼠桂鱼',
      '蟹黄面（李百蟹）',
      '桂花红烧肉',
      '生煎（哑巴生煎）'
    ],
    hotel: {
      name: '苏州山塘河居',
      address: '地址：江苏省苏州市姑苏区潭子里20号'
    },
    contacts: [
      { name: '取车', phone: '18136722585' },
      { name: '酒店', phone: '15901997167' }
    ],
    materials: [
      '1. 身份证',
      '2. 驾驶证'
    ]
  },
  {
    date: '1月10日',
    activities: [
      { time: '7:00-8:45', activity: '起床', type: 'default', duration: 105 },
      { time: '7:40', activity: '拙政园', type: 'highlight', duration: 80 },
      { time: '9:00-11:00', activity: '苏州博物馆', type: 'highlight', duration: 120 },
      { time: '11:00-13:00', activity: '前往无锡报道（车程1小时6分钟）', type: 'default', duration: 120 },
      { time: '13:00-14:00', activity: '报道领取物资，办理入住，修整', type: 'default', duration: 60 },
      { time: '14:10-16:30', activity: '惠山古镇，寄畅园...', type: 'highlight', duration: 140 },
      { time: '16:30-19:30', activity: '南街逛吃', type: 'important', duration: 180 },
      { time: '19:30', activity: '回酒店休息准备', type: 'default', duration: 30 }
    ],
    attractions: [
      '惠山古镇',
      '寄畅园（门票70）',
      '天下第二泉',
      '南街-夜游'
    ],
    attractionDetails: [
      attractionDetails['拙政园'],
      attractionDetails['苏州博物馆'],
      attractionDetails['惠山古镇'],
      attractionDetails['寄畅园'],
      attractionDetails['天下第二泉'],
      attractionDetails['南街-夜游']
    ],
    foods: [
      '小笼包',
      '玉兰饼',
      '酸辣汤',
      '梅花糕',
      '开洋馄饨',
      '太湖三白'
    ],
    hotel: {
      name: '桔子酒店(无锡欧风街惠山古镇店)'
    },
    contacts: [
      { name: '王丽', phone: '13889840102' },
      { name: '董丽', phone: '13519658178' }
    ],
    materials: [
      '文件夹：',
      '1. 赛项申报表复印件2份',
      '2. 参赛学生身份证复印件2份'
    ]
  },
  {
    date: '1月11日',
    activities: [
      { time: '6:30-7:10', activity: '起床，办理退房', type: 'default', duration: 40 },
      { time: '7:20-7:50', activity: '前往赛场（17分钟）', type: 'default', duration: 30 },
      { time: '8:00-8:30', activity: '选手检录入场', type: 'default', duration: 30 },
      { time: '8:30-12:00', activity: '比赛&颁奖', type: 'default', duration: 210 },
      { time: '13:00-14:00', activity: '前往奔牛机场（1小时）', type: 'default', duration: 60 },
      { time: '14:00-14:30', activity: '还车完成', type: 'default', duration: 30 },
      { time: '14:30-15:00', activity: '办理托运，安检', type: 'default', duration: 30 },
      { time: '15:00-15:30', activity: '安检，候机', type: 'default', duration: 30 },
      { time: '15:30-16:00', activity: '登机，返回厦门', type: 'default', duration: 30 }
    ],
    attractions: [],
    attractionDetails: [],
    foods: [],
    hotel: {},
    venue: {
      name: '锡山高级中学（击剑馆一层跆拳道室）',
      address: '地址：无锡市惠山区政和大道1号'
    },
    contacts: [
      { name: '还车', phone: '18136722585' }
    ],
    materials: [
      '1. 备用手机-无线网络',
      '2. 排插电源',
      '3. 电脑，电源，鼠标，垫子'
    ]
  }
];