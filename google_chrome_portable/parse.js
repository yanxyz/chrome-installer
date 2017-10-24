/**
 * Chrome 打开页面 http://www.geocities.jp/ecvcn/exam/chrome_installer.html
 * 复制下面代码在 Console 运行，将复制的数据保存为 data.json
 */

function get() {
  const container = document.getElementById('container')
  const list = []
  let item = null
  const re = /\((.+)\)$/
  for (const el of container.children) {
    if (isTag('em', el)) {
      const a = el.firstElementChild
      if (!isTag('a', a)) continue
      const version = a.textContent.trim()
      if (version === '${version}') break
      item = {
        version,
        update: a.href
      }
      // date
      const node = el.nextSibling
      if (node.nodeType === 3) {
        const text = node.textContent.trim()
        const match = text.match(re)
        if (!match) {
          console.log(`No matches ${text}`, el)
          item = null
          continue
        }
        item.date = match[1]
      }
    }

    if (isTag('div', el)) {
      const table = el.firstElementChild
      if (!isTag('table', table)) continue
      if (!item) continue
      const a = table.querySelectorAll('a')
      if (!a) {
        console.log('Not found a', table)
        continue
      }
      item.urls = Array.from(a).map(x => x.href)
      list.push(item)
      item = null
    }
  }
  return list
}

function isTag(tagName, el) {
  return el.tagName.toLowerCase() === tagName
}

function cp() {
  const list = get()
  // console.log(list)
  const source = `
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.DATA = factory()
  }
}(this, function () {
  return ${JSON.stringify(list, null, 2)}
}))
`
  /* global copy */
  copy(source.trim())
  console.log('Done! Now paste the copied data to data.js')
}

cp()
