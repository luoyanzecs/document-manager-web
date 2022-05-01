import {getUUID, hashCode} from "@/tool/utils";

const ID = 'z-id'
const PARENT = 'z-parent'
const INDEX = 'z-index'
const HASH = 'z-hash'
const CHILDREN = 'z-children'
const STYLE = 'style'
const CLASS = 'class'
const CUSTOM_TAG = 'zzz'

const type = {
  ELEMENT: 'element',
  ROOT: 'root',
  TEXT: 'text'
}

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
  return String(mid + mid > 1.0 ? Math.random(0, 1) : Math.random(0, mid))
}

const getHash = (cur) => {
  if (cur.node === type.TEXT) {
    return hashCode(cur.text)
  } else {
    let payload = ""
    for (let k in cur.attr) {
      if (![ID, PARENT, INDEX, HASH, CHILDREN].includes(k)) {
        payload += String(cur.attr[k])
      }
    }
    return hashCode(payload)
  }
}

const jsonRefine = (node, res, queue) => {
  if (node.child) {
    node.child.reduce(
      (pre, cur, curIndex, arr) => {
        if (cur.node === type.TEXT && pre && pre.tag === CUSTOM_TAG && pre.node !== type.TEXT) {
          [cur.attr, cur.tag ] = [pre.attr, pre.tag]
        }
        if (!cur.attr) {
          cur.attr = {}
        }
        if (!cur.attr[ID] && (cur.tag !== CUSTOM_TAG || cur.node === type.TEXT)) {
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
      res.modifyNodeAttribute.push(node)
    }
    const childIds = node.child ? node.child.map(it => it.attr[ID]) : []
    node.attr[CHILDREN].split(',').filter(it => it.trim() !== '' && childIds.indexOf(it) === -1).forEach(res.deleteNode.push)
  }
  node.attr[CHILDREN] = node.child ? node.child.map(it => it.attr[ID]).join(',') : ""
  if (node.child) {
    node.child.forEach(it => queue.push(it))
  }


}

export function toRequest(root, rootAttribute={ 'z-id': '0', 'z-children': '', 'z-hash': '0', 'style': [], 'class': []}) {
  root.attr = rootAttribute

  const res = {
    modifyNodeAttribute: [],
    deleteNode: [],
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
      : { id: it.attr[ID], attr: it.attr }
  )

  return {
    updateNodes: updateAttrNodes,
    deleteNodes: res.deleteNode.map(it => it.attr[ID]),
    newNodes: res.newNode.map(it => {
      delete it.attr[CHILDREN]
      return { node: it.node, attr: it.attr, tag: it.tag, text: it.text }
    })
  }
}