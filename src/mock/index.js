import Mock from 'mockjs'
// const Random = Mock.Random

Mock.setup({
    timeout: '600-2000'
})

Mock.mock('http://localhost:8081/api/login', 'post', {
    'type': Boolean
})