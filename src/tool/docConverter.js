import {getUUID, hashCode} from "@/tool/utils";

const ID = 'data-id'
const PARENT = 'data-parent'
const INDEX = 'data-index'
const HASH = 'data-hash'
const CHILDREN = 'data-children'
const STYLE = 'style'
const CLASS = 'class'
const CUSTOM_TAG = 'zzz'

const type = { ELEMENT: 'element', ROOT: 'root', TEXT: 'text' }

const getIndex = (curIndex, arr) => {
  let [ low, high ] = [0.0 , 100000000000000.3]
  for (let i = curIndex - 1; i >= 0; i--) {
    if (arr[i].attr && arr[i].attr[INDEX]) {
      low = parseFloat(arr[i].attr[INDEX])
      break
    }
  }

  for (let i = curIndex + 1; i < arr.length; i++) {
    if (arr[i].attr && arr[i].attr[INDEX]) {
      high = parseFloat(arr[i].attr[INDEX])
      break
    }
  }
  let mid = (low + high) / 2.0
  return String(mid + (mid > 1.0 ? Math.random(0, 1) : Math.random(0, mid)))
}

const getHash = (cur) => {
  if (cur.node === type.TEXT) {
    return hashCode(cur.text)
  } else {
    let payload = ''
    for (let k in cur.attr) {
      if (![ID, PARENT, INDEX, HASH, CHILDREN].includes(k)) {
        payload += Array.isArray(cur.attr[k]) ? cur.attr[k].join('') : cur.attr[k]
      }
      payload += cur.tag || ''
    }
    return hashCode(payload)
  }
}

const jsonRefine = (node, res, queue) => {
  if (node.child) {
    // for (let i = 0; i < node.child.length; i++) {
    //   console.log(JSON.stringify(node.child[i].attr));
    //   console.log(node.child[i])
    //   console.log(Object.keys(node.child[i]))
    //   console.log(node.child[i].child)
    //   console.log(node.child[i].attr)
    //   console.log(JSON.stringify(node.child[i].attr))
    //   console.log("----------")
    // }
    node.child.reduce(
      (pre, cur, curIndex, arr) => {
        if (cur.node === type.TEXT && pre && pre.tag === CUSTOM_TAG && pre.node !== type.TEXT) {
          [cur.attr, cur.tag ] = [pre.attr, pre.tag]
        }
        if (!cur.attr) {
          cur.attr = {}
        }
        cur.attr = JSON.parse(JSON.stringify(cur.attr))
        if (cur.attr[ID] === undefined && (cur.tag !== CUSTOM_TAG || cur.node === type.TEXT)) {
          res.newNode.push(cur)
        }
        if (cur.tag !== CUSTOM_TAG || cur.node === type.TEXT) {
          cur.attr[ID] = cur.attr[ID] || getUUID()
          cur.attr[STYLE] = Array.isArray(cur.attr[STYLE]) ? cur.attr[STYLE].join(' ') : cur.attr[STYLE] || ''
          cur.attr[CLASS] = Array.isArray(cur.attr[CLASS]) ? cur.attr[CLASS].join(' ') : cur.attr[CLASS] || ''
          cur.attr[PARENT] = cur.attr[PARENT] || node.attr[ID]
          cur.attr[INDEX] = cur.attr[INDEX] || getIndex(curIndex, arr)
          cur.attr[HASH] = cur.attr[HASH] || getHash(cur)
        }

        return cur
      },
      null
    )
    node.child = node.child.filter(it => it.tag !== CUSTOM_TAG || it.node === type.TEXT)
    node.child.forEach(it => queue.push(it))
  }
}

const findUpdateAndDlete = (node, res, queue) => {
  const newNodeIds = res.newNode.map(it => it.attr[ID]);
  if (newNodeIds.indexOf(node.attr[ID]) === -1) {
    if (getHash(node) !== node.attr[HASH]) {
      node.attr[HASH] = getHash(node)
      res.modifyNodeAttribute.push(node)
    }
    const childIds = node.child ? node.child.map(it => it.attr[ID]) : []
    node.attr[CHILDREN].split(',').filter(it => it.trim() !== '' && childIds.indexOf(it) === -1)
      .forEach(it => res.deleteNodeIds.push(it))
  }
  node.attr[CHILDREN] = node.child ? node.child.map(it => it.attr[ID]).join(',') : ""
  if (node.child) {
    node.child.forEach(it => queue.push(it))
  }
}

const attrToString = (attr) => {
  const [custom, other] = [{}, {}]
  for (let k in attr) {
    if ([ID, PARENT, INDEX, HASH, CHILDREN, CLASS, STYLE].includes(k)) {
      custom[k] = Array.isArray(attr[k]) ? attr[k].join(' ') : attr[k]
    } else {
      other[k] = Array.isArray(attr[k]) ? attr[k].join(' ') : attr[k]
    }
  }

  return { ...custom, attr: other }
}

export function toRequest(root, rootAttribute) {
  root.attr = rootAttribute

  const res = {
    modifyNodeAttribute: [],
    deleteNodeIds: [],
    newNode: []
  }

  let queue = [root]
  while (queue.length !== 0) {
    jsonRefine(queue.shift(), res, queue)
  }

  queue = [root]
  while (queue.length !== 0) {
    findUpdateAndDlete(queue.shift(), res, queue)
  }

  const updateAttrNodes =  res.modifyNodeAttribute.map(it =>
    it.node === type.TEXT
      ? { id: it.attr[ID], text: it.text }
      : { id: it.attr[ID], ...attrToString(it.attr) }
  )

  return {
    updateNodes: updateAttrNodes,
    deleteNodes: res.deleteNodeIds,
    newNodes: res.newNode.map(it => {
      delete it.attr[CHILDREN]
      return { node: it.node, ...attrToString(it.attr), tag: it.tag, text: it.text }
    })
  }
}