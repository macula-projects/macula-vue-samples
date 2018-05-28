import { isUrl } from '@/assets/element/js/utils/utils'

const anticon = (name) => {
  return `anticon anticon-${name}`
}

const menuData = [
  {
    code: 'dashboard',
    name: 'dashboard',
    icon: anticon('dashboard'),
    path: 'dashboard',
    children: [
      {
        code: 'analysis',
        name: '分析页',
        path: 'analysis'
      },
      {
        code: 'monitor',
        name: '监控页',
        path: 'monitor'
      },
      {
        code: 'workplace',
        name: '工作台',
        path: 'workplace'
      }
    ]
  },
  {
    code: 'form',
    name: '表单页',
    icon: anticon('form'),
    path: 'form',
    children: [
      {
        code: 'basic-form',
        name: '基础表单',
        path: 'basic-form'
      },
      {
        code: 'step-form',
        name: '分步表单',
        path: 'step-form'
      }
      // {
      //   name: '高级表单',
      //   path: 'advanced-form'
      // }
    ]
  },
  {
    code: 'list',
    name: '列表页',
    icon: anticon('table'),
    path: 'list',
    children: [
      {
        code: 'table-list',
        name: '查询表格',
        path: 'table-list'
      }
      // {
      //   name: '标准列表',
      //   path: 'basic-list'
      // },
      // {
      //   name: '卡片列表',
      //   path: 'card-list'
      // },
      // {
      //   name: '搜索列表',
      //   path: 'search',
      //   children: [
      //     {
      //       name: '搜索列表（文章）',
      //       path: 'articles'
      //     },
      //     {
      //       name: '搜索列表（项目）',
      //       path: 'projects'
      //     },
      //     {
      //       name: '搜索列表（应用）',
      //       path: 'applications'
      //     }
      //   ]
      // }
    ]
  },
  {
    code: 'profile',
    name: '详情页',
    icon: anticon('profile'),
    path: 'profile',
    children: [
      {
        code: 'basic',
        name: '基础详情页',
        path: 'basic'
      },
      {
        code: 'advanced',
        name: '高级详情页',
        path: 'advanced'
      }
    ]
  },
  {
    code: 'result',
    name: '结果页',
    icon: anticon('check-circle-o'),
    path: 'result',
    children: [
      {
        code: 'success',
        name: '成功',
        path: 'success'
      },
      {
        code: 'fail',
        name: '失败',
        path: 'fail'
      }
    ]
  },
  {
    code: 'exception',
    name: '异常页',
    icon: anticon('warning'),
    path: 'exception',
    children: [
      {
        code: '403',
        name: '403',
        path: '403'
      },
      {
        code: '404',
        name: '404',
        path: '404'
      },
      {
        code: '500',
        name: '500',
        path: '500'
      },
      {
        code: 'trigger',
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true
      }
    ]
  }
]

const topMenuData = [
  {
    code: 'dashboard',
    name: '首页',
    icon: anticon('dashboard'),
    path: 'dashboard'
  },
  {
    code: 'admin',
    name: '系统管理',
    icon: anticon('admin'),
    path: 'admin'
  },
  {
    code: 'operation',
    name: '运维管理',
    icon: anticon('operation'),
    path: 'operation'
  },
  {
    code: 'porder',
    name: '订单中心',
    icon: anticon('porder')
  },
  {
    code: 'more',
    name: '更多',
    icon: anticon('more'),
    children: [
      {
        code: '403',
        name: '403'
      },
      {
        code: '404',
        name: '404',
        path: '404'
      },
      {
        code: '500',
        name: '500',
        path: '500'
      }
    ]
  }
]

// 拼接路径，将父亲和children中的path串起来
function formatter (data, parentPath = '/') {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path
    }
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`
      )
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)

export const getTopMenuData = () => formatter(topMenuData)
