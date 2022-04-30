import {getUUID, hashCode} from "@/tool/utils";

const getIndex = (curIndex, arr) => {
  let [ low, high ] = [0.0 , 100000000000000.3]
  for (let i = curIndex - 1; i >= 0; i--) {
    if (arr[i].attr && arr[i].attr['z-index']) {
      low = parseFloat(arr[i].attr['z-index'])
      break
    }
  }

  for (let i = curIndex + 1; i < arr.length; i++) {
    if (arr[i].attr && arr[i].attr['z-index']) {
      high = parseFloat(arr[i].attr['z-index'])
      break
    }
  }
  return String((low + high) / 2.0)
}

const getHash = (cur) => {
  let payload;
  if (cur.node === 'text') {
    payload = cur.text
  } else {
    payload = cur.attr['style'].join(',') + cur.attr['class'].join(',')
  }
  return hashCode(payload)
}

const jsonRefine = (node, res, queue) => {
  if (node.child) {
    node.child.reduce(
      (pre, cur, curIndex, arr) => {
        if (cur.node === 'text' && pre && pre.tag === 'zzz' && pre.node !== 'text') {
          [cur.attr, cur.tag ] = [pre.attr, pre.tag]
        }
        if (!cur.attr) {
          cur.attr = {}
        }
        if (!cur.attr['z-id'] && (cur.tag !== 'zzz' || cur.node === 'text')) {
          res.newNode.push(cur)
        }
        if (cur.tag !== 'zzz' || cur.node === 'text') {
          cur.attr['z-id'] = cur.attr['z-id'] || getUUID()
          cur.attr['style'] = cur.attr['style'] || []
          cur.attr['class'] = cur.attr['class'] || []
          cur.attr['z-parent'] = cur.attr['z-parent'] || node.attr['z-id']
          cur.attr['z-index'] = cur.attr['z-index'] || getIndex(curIndex, arr)
          cur.attr['z-hash'] = cur.attr['z-hash'] || getHash(cur)
        }

        return cur
      },
      null
    )
    node.child = node.child.filter(it => it.tag !== 'zzz' || it.node === 'text')
    node.child.forEach(it => queue.push(it))
  }
}

const findUpdateAndDlete = (node, res, queue) => {
  const newNodeIds = res.newNode.map(it => it.attr['z-id']);
  if (newNodeIds.indexOf(node.attr['z-id']) === -1) {
    const currentHash = getHash(node);
    if (currentHash !== node.attr['z-hash']) {
      res.modifyNodeAttribute.push(node)
    }
    const childIds = node.child ? node.child.map(it => it.attr['z-id']) : []
    const attributeChildren = node.attr['z-children'].split(',').filter(it => it.trim() !== '')

    const deleteIds = attributeChildren.filter(it => childIds.indexOf(it) === -1);
    if (deleteIds.length > 0 ) {
      deleteIds.forEach(res.deleteNode.push)
      res.modifyNodeChildren.push(node)
    }
  }
  node.attr['z-children'] = node.child ? node.child.map(it => it.attr['z-id']).join(',') : ""
  if (node.child) {
    node.child.forEach(it => queue.push(it))
  }


}

export function toRequest(root, rootAttribute={ 'z-id': '0', 'z-children': '', 'z-hash': '0', 'style': [], 'class': []}) {
  root.attr = rootAttribute

  const res = {
    modifyNodeAttribute: [],
    modifyNodeChildren: [],
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
    it.node === 'text'
      ? { id: it.attr['z-id'], text: it.text }
      : { id: it.attr['z-id'], class: it.attr['class'], styles: it.attr['style'] }
  )
  const updateChildNodes =  res.modifyNodeChildren.map(it => ({id: it.attr['z-id'], zChildren: it.attr['child']}))

  const updateNodes = updateAttrNodes.concat(updateChildNodes).reduce((pre, cur) => {
      let find = pre.find(it => it.id === cur.id);
      if (find) {
        find.class = find.class || cur.class
        find.styles = find.styles || cur.styles
        find.zChildren = find.zChildren || cur.zChildren
        find.text = find.text || cur.text
      } else {
        pre.push(cur)
      }
      return pre
    }, []);

  return {
    updateNodes,
    deleteNodes: res.deleteNode.map(it => it.attr['z-id']),
    newNodes: res.newNode.map(it => ({node: it.node, ...it.attr, tag: it.tag, text: it.text}))
  }
}