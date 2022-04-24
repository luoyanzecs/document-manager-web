import Mock from 'mockjs'

Mock.setup({
  timeout: '600-2000'
})

Mock.mock('http://localhost:9999/api/admin/search', 'post', {
  'pairs': [
    {'name': '字段一', 'key': 'a'},
    {'name': '字段二', 'key': 'b'},
    {'name': '字段三', 'key': 'c'},
    {'name': '字段四', 'key': 'd'},
    {'name': '字段五', 'key': 'e'},
    {'name': '字段六', 'key': 'f'},
    {'name': '字段七', 'key': 'g'},
    {'name': '字段七', 'key': 'h'},
  ],
  'currentPage|0-50': 1,
  'totalPage': 50,
  'items|35': [{
    'a': '@ctitle(6, 12)',
    'b': '@ctitle(6, 12)',
    'c': '@ctitle(6, 12)',
    'd': '@ctitle(6, 12)',
    'e': '@ctitle(6, 12)',
    'f': '@ctitle(6, 12)',
    'g': '@ctitle(6, 12)',
    'h': '@ctitle(6, 12)',
  }]
})

Mock.mock('http://localhost:9999/api/admin/add/user', 'post', {
  'head': {
    'status': 'success',
    'statusCode': 200,
    'message': 'OK',
    'timestamp': Date.now()
  }
})

Mock.mock('http://localhost:9999/api/admin/add/notice', 'post', {
  'head': {
    'status': 'success',
    'statusCode': 200,
    'message': 'OK',
    'timestamp': Date.now()
  }
})

Mock.mock('http://localhost:9999/api/user/leaveMessage', 'post', {
  'head': {
    'status': 'success',
    'statusCode': 200,
    'message': 'OK',
    'timestamp': Date.now()
  }
})

Mock.mock('http://localhost:9999/api/admin/delete', 'post', {
  'head': {
    'status': 'success',
    'statusCode': 200,
    'message': 'OK',
    'timestamp': Date.now()
  }
})

Mock.mock('http://localhost:9999/api/search', 'post', {
  'head': {
    'status': 'success',
    'statusCode': 200,
    'message': 'OK',
    'timestamp': Date.now()
  },
  'searchResults|3-6': [{
    'id': /\d{8}/,
    'title': '@ctitle(6, 9)',
    'ctx': '@csentence(10, 12)'
  }]
})

Mock.mock('http://localhost:9999/api/user/createFile', 'post', {
  'head': {
    'status': 'success',
    'statusCode': 200,
    'message': 'OK',
    'timestamp': Date.now()
  },
  'fileId': /\d{8}/
})

Mock.mock('http://localhost:9999/api/user/updateFile', 'post', {
  'head': {
    'status': 'success',
    'statusCode': 200,
    'message': 'OK',
    'timestamp': Date.now()
  }
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

Mock.mock('http://localhost:9999/api/getbu', 'post', {
  'buList': ['开发', '人事', '产品', '运营']
})

Mock.mock('http://localhost:9999/api/user/menu', 'post', {
  'items|5-10': [{
    'id': /\d{8}/,
    'title': '@ctitle(10, 20)',
    'isDir': '@boolean',
    'children|2-10': [{
      'id': /\d{8}/,
      'title': '@ctitle(10, 20)',
      'isDir': '@boolean',
      'children|2-5': [{
        'id': /\d{8}/,
        'title': '@ctitle(10, 20)',
        'isDir': '@boolean',
        'children|0-5': [{
          'id': /\d{8}/,
          'title': '@ctitle(10, 20)',
          'isDir': '@boolean',
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
    'fileContent': '<p>@cparagraph()</p><p>@cparagraph()</p><p>@cparagraph()</p><p>@cparagraph()</p><p>@cparagraph()</p><p>@cparagraph()</p><p>@cparagraph()</p><p>@cparagraph()</p><p>@cparagraph()</p>',
    'attaches|0-3': [{
      'name': '@ctitle(4, 7)',
      'link': '@url("http")'
    }]
  }
})

Mock.mock('http://localhost:9999/api/uploadAttach', 'post', {
  'name': '@ctitle(4, 7)',
  'link': '@url("http")'
})

Mock.mock('http://localhost:9999/api/user/downloadAttach', 'post', {
  'head': {
    'status': 'success',
    'statusCode': 200,
    'message': 'OK',
    'timestamp': Date.now()
  }
})

Mock.mock('http://localhost:9999/api/user/deleteAttach', 'post', {
  'head': {
    'status': 'success',
    'statusCode': 200,
    'message': 'OK',
    'timestamp': Date.now()
  }
})