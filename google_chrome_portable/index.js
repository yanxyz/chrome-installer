/* global DATA */

var filteredList = null
var input = document.getElementById('version')
input.onchange = function () {
  filter(this.value.trim())
}

window.onload = function () {
  var value = storage()
  input.value = value
  filter(value)
}

window.onload = function () {
  var value = storage()
  input.value = value
  filter(value)
}

var x64Checkbox = document.getElementById('x64')
x64Checkbox.onchange = function () {
  if (filteredList) {
    build(filteredList)
  } else {
    showRecent()
  }
}

function showRecent() {
  build(DATA.slice(0, 10))
}

function filter(version) {
  if (!version) {
    filteredList = null
    showRecent()
    return
  }

  if (!validateVersion(version)) {
    alert('Invalid version')
    return
  }

  filteredList = DATA.filter(function (item) {
    return compareVersion(item.version, version)
  })
  build(filteredList)
  storage(version)
}

function validateVersion(version) {
  return /^(\d+\.){3}\d+/.test(version)
}

function compareVersion(a, b) {
  var arr1 = a.split('.')
  var arr2 = b.split('.')
  var d = arr1[2] - arr2[2] // build
  if (d > 0) return true
  if (d === 0 && arr1[3] > arr2[3]) return true
  return false
}

function build(list) {
  var x64 = x64Checkbox.checked
  var arr = list.map(function (item) {
    var qq = 'https://sm.myapp.com/original/Browser/' + item.version + '_chrome_installer'
    if (x64) {
      item.qq = qq + '_x64.exe'
      item.google = item.urls.length > 1 ? item.urls[0] : ''
    } else {
      item.qq = qq + '.exe'
      item.google = item.urls.length > 1 ? item.urls[1] : item.urls[0]
    }
    return render(item)
  })
  document.getElementById('list').innerHTML = arr.join('\n')
}

function render(data) {
  return document.getElementById('template-list').text
    .replace(/{{(\w+)}}/g, function (m, p) {
      return data[p]
    })
}

function storage(value) {
  const key = 'LAST_CHROME_INSTALLER'
  if (!value) {
    return localStorage.getItem(key)
  } else {
    localStorage.setItem(key, value)
  }
}
