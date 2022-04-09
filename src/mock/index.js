import Mock from 'mockjs'

Mock.setup({
  timeout: '600-2000'
})

Mock.mock('http://localhost:9999/api/login', 'post', {
  'token': '123213123',
  'userInfo': {
    'name': '@FIRST @LAST',
    'avatar': '@image',
    'id': /\d{8}/,
    'bu': "@pick(['开发', '人事', '产品', '运营'])",
    'rank|1-10': 1
  }
})

Mock.mock('http://localhost:9999/api/user/menu', 'post', {
  'items|5-10': [{
    'id': /\d{8}/,
    'title': '@ctitle(10, 20)',
    'children|2-10': [{
      'id': /\d{8}/,
      'title': '@ctitle(10, 20)',
      'children|2-5': [{
        'id': /\d{8}/,
        'title': '@ctitle(10, 20)',
        'children|0-5': [{
          'id': /\d{8}/,
          'title': '@ctitle(10, 20)',
          'children|0': []
        }]
      }]
    }]
  }]
})

Mock.mock('http://localhost:9999/api/user/comment', 'post', {
  'comments|4-7': [{
    'commentId': /\d{8}/,
    'name': '@FIRST @LAST',
    'id': /\d{8}/,
    'comment': '@ctitle(20, 30)',
    'time': '@datetime("yyyy年MM月dd日 HH:mm")',
    'avatar': '@image',
    'reply|0-5': [{
      'commentId': /\d{8}/,
      'name': '@FIRST @LAST',
      'id': /\d{8}/,
      'comment': '@ctitle(20, 30)',
      'time': '@datetime("yyyy年MM月dd日 HH:mm")'
    }]
  }]
})

Mock.mock('http://localhost:9999/api/admin/files', 'post', {
  'fields': ['编号', '作者', '部门', '标题', '创建时间'],
  'keys': ['id', 'owner', 'bu', 'title', 'createTime'],
  'cols': [2, 2, 2, 8, 4],
  'currentPage|0-50': 1,
  'totalPage': 50,
  'items|20': [{
    'id': /\d{8}/,
    'owner': '@FIRST LAST',
    'userId': /\d{8}/,
    'title': '@ctitle(10, 20)',
    'bu': "@pick(['开发', '人事', '产品', '运营'])",
    'createTime': '@datetime("yyyy年MM月dd日 HH:mm")'
  }]
})

Mock.mock('http://localhost:9999/api/admin/users', 'post', {
  'fields': ['编号', '姓名', '部门', '联系方式'],
  'keys': ['id', 'name', 'bu', 'tel'],
  'cols': [4, 4, 4, 4],
  'currentPage|0-50': 1,
  'totalPage': 50,
  'items|20': [{
    'id': /\d{8}/,
    'name': '@FIRST LAST',
    'userId': /\d{8}/,
    'bu': "@pick(['开发', '人事', '产品', '运营'])",
    'tel': '@email'
  }]
})

Mock.mock('http://localhost:9999/api/admin/records', 'post', {
  'fields': ['用户编号', '操作', '部门', '文件编号', '时间'],
  'keys': ['id', 'operate', 'bu', 'fid', 'operateTime'],
  'cols': [3, 3, 3, 4, 7],
  'currentPage|0-50': 1,
  'totalPage': 50,
  'items|20': [{
    'id': /\d{8}/,
    'fid': /\d{8}/,
    'bu': "@pick(['开发', '人事', '产品', '运营'])",
    'operateTime': '@datetime("yyyy年MM月dd日 HH:mm")',
    'operate': "@pick(['更新', '删除', '浏览', '创建', '评论'])"
  }]
})

Mock.mock('http://localhost:9999/api/admin/notices', 'post', {
  'fields': ['编号', '对象', '部门', '内容', '创建时间', '结束时间'],
  'keys': ['id', 'to', 'bu', 'ctx', 'startTime', 'endTime'],
  'cols': [2, 2, 2, 7, 4, 4],
  'currentPage|0-50': 1,
  'totalPage': 50,
  'items|20': [{
    'id': /\d{8}/,
    'to': /\d{8}/,
    'bu': "@pick(['开发', '人事', '产品', '运营'])",
    'ctx': "@csentence(10, 20)",
    'startTime': '@datetime("yyyy年MM月dd日 HH:mm")',
    'endTime': '@datetime("yyyy年MM月dd日 HH:mm")'
  }]
})

Mock.mock('http://localhost:9999/api/notice', 'post', {
  'notices|0-2': [{
    'id': /\d{8}/,
    'type|1-3': 1,
    'message': '@csentence(10, 12)'
  }]
})

Mock.mock('http://localhost:9999/api/user/file', 'post', {
  'fileInfo': {
    'editor': '@First @Last',
    'lastEditTime': '@datetime("yyyy年MM月dd日 HH:mm")',
    'fileContent': '<p>@cparagraph()</p><p>@cparagraph()</p><p>@cparagraph()</p><p>@cparagraph()</p>'
  }
})