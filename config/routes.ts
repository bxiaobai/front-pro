export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: 'login', component: './User/Login'},
    ],
  },
  {path: '/workbench', name: '工作台', icon: 'smile', component: './Workbench'},
  {
    path: '/list', name: '预约列表', icon: 'unorderedListOutlined', component: './Appts/Details',
  },
  {
    hideInMenu: true,
    name: '添加座位', path: '/list/add', component: './Appts/Details/AddDetails',
  },
  // {path: '/seat', name: '座位资源', icon: 'smile', component: './Workbench'},
  {
    path: '/pat',
    icon: 'crown',
    name: '预约配置',
    routes: [
      {path: '/pat', redirect: 'list'},
      {name: '患者列表', path: 'list', component: './System/UserList'},
      {name: '分组管理', path: 'group', component: './Doctor'},
      {name: '标签管理', path: 'tags', component: './System/UserList'},
      {name: '静脉通路', path: 'vein', component: './System/UserList'},
    ]
  },
  {
    path: '/appts',
    icon: 'userAddOutlined',
    name: '预约配置',
    routes: [
      {path: '/appts', redirect: 'setting'},
      {name: '号源模板设置', path: 'template', component: './Appts/Template'},
      {name: '输液室预约设置', path: 'setting', component: './System/UserList'},
    ]
  },
  {
    path: '/ir',
    icon: 'crown',
    name: '输液室管理',
    routes: [
      {path: '/ir', redirect: 'room'},
      {name: '座位管理', path: 'seat', component: './Ir/Seat'},
      {
        name: '输液室管理', path: '/ir/room', component: './Ir/Room',
      },
      {
        hideInMenu: true,
        name: '添加座位', path: '/ir/room/seat', component: './Ir/Room/SeatDetails',
      },
    ]
  },
  // 系统管理路由
  {
    path: '/system',
    icon: 'settingOutlined',
    name: '系统管理',
    routes: [
      {path: '/system', redirect: 'user'},
      {name: '用户管理', path: 'user', component: './System/UserList'},
      {name: '科室管理', path: 'dept', component: './System/Dept'},
      {name: '字典管理', path: 'dict', component: './System/Dict'},
      {
        name: '消息中心', path: 'sms', component: './System/UserList', routes: [
          {name: '短信模板', path: 'sms-template', component: './System/UserList'},
          {name: '短信日志', path: 'sms-log', component: './System/UserList'},
        ]
      },
      {
        name: 'API日志', path: 'log', component: './System/UserList', routes: [
          {name: '访问日志', path: 'api-access-log', component: './System/UserList'},
          {name: '错误日志', path: 'error-log', component: './System/UserList'},
        ]
      },
    ]
  },
  { path: '/appointment/list/scale/:id', component: '@/pages/Scale/index.tsx' },
  { path: '/appointment/list/scale1/:id', component: '@/pages/Scale/Compontents/Scale1.tsx' },
  { path: '/appointment/list/scale2/:id', component: '@/pages/Scale/Compontents/Scale2.tsx' },
  { path: '/appointment/list/scale3/:id', component: '@/pages/Scale/Compontents/Scale3.tsx' },
  { path: '/appointment/list/scale4/:id', component: '@/pages/Scale/Compontents/Scale4.tsx' },
  { path: '/appointment/list/scale5/:id', component: '@/pages/Scale/Compontents/Scale5.tsx' },
  { path: '/appointment/list/scale6/:id', component: '@/pages/Scale/Compontents/Scale6.tsx' },
  { path: '/appointment/list/scale7/:id', component: '@/pages/Scale/Compontents/Scale7.tsx' },
  {
    path: '/infra',
    name: '基础设置',
    icon: 'crown',
    routes: [
      {path: '/infra', redirect: 'file'},
      {
        path: 'file', name: '文件管理', component: './System/UserList', routes: [
          {name: '文件列表', path: 'file-list', component: './System/UserList'},
          {name: '文件配置', path: 'file-config', component: './System/UserList'},
        ]
      },
      {path: 'job', name: '定时任务', component: './System/UserList'},
      {
        path: 'monitors', name: '监控中心', component: './System/UserList', routes: [
          {name: 'Redis监控', path: 'redis', component: './System/UserList'},
        ]
      },
    ],
  },
  {path: '/reac/card', layout: false, name: 'react-card',  component: './Doctor'},
  {path: '/', redirect: '/workbench'},
  {path: '*', layout: false, component: './404'},
];
