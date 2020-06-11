import URL from 'url'
import { unbase64 } from '@/utils/util'

function parseUrl (url) {
  // eslint-disable-next-line node/no-deprecated-api
  return URL.parse(url);
}

function handlePath (path) {
  console.log('handlePath -> path', path)
  path = parseUrl(path).pathname;
  path = decodeURIComponent(path);
  if (!path) return '';

  path = path.replace(/{{\w*}}/g, '');

  if (path[0] !== '/') {
    path = '/' + path;
  }
  return path;
}
function handleHar (data, key) {
  const reflect = {
    title: 'url',
    path: 'url',
    method: 'method',
    desc: 'description',
    req_query: 'queryString',
    req_body_form: 'params',
    req_body_other: 'text'
  }
  const allKey = [
    'title',
    'path',
    'method',
    'req_query',
    'req_body_type',
    'req_body_form',
    'req_body_other',
    'res_body_type',
    'res_body',
    'req_headers'
  ]
  key = key || allKey
  const res = {}
  let reqType = 'json';
  let header
  data.request.headers.forEach(item => {
    if (!item || !item.name || !item.value) return null
    if (/content-type/i.test(item.name) && item.value.indexOf('application/json') === 0) {
      reqType = 'json'
      header = 'application/json'
    } else if (
      /content-type/i.test(item.name) &&
    item.value.indexOf('application/x-www-form-urlencoded') === 0
    ) {
      header = 'application/x-www-form-urlencoded';
      reqType = 'form';
    } else if (
      /content-type/i.test(item.name) &&
    item.value.indexOf('multipart/form-data') === 0
    ) {
      header = 'multipart/form-data';
      reqType = 'form';
    }
  })

  for (let item in key) {
    item = key[item]
    const reqTarget = data.request[reflect[item]]
    if (item === 'req_query') {
      // res[item] = this.handleReq(reqTarget)
    } else if (item === 'req_body_form' && reqType === 'form' && data.request.postData) {

    } else if (item === 'req_body_other' && reqType === 'json' && data.request.postData) {

    } else if (item === 'req_header') {
      res[item] = [
        {
          name: 'Content-Type',
          value: header
        }
      ]
    } else if (item === 'req_body_type') {
      res[item] = reqType
    } else if (item === 'path') {
      console.log(data.request)
      res[item] = handlePath(reqTarget)
    } else if (item === 'title') {
      res[item] = handlePath(reqTarget)
    } else if (item === 'res_body_type') {
      res[item] = 'json'
    } else if (item === 'res_body') {
      // res.res_body_is_json_schema = true
      // base64
      if (data.response.content.encoding && data.response.content.encoding === 'base64') {
        res[item] = unbase64(data.response.content.text)
      } else {
        res[item] = data.response.content.text
      }
    } else {
      res[item] = reqTarget
    }
  }
  return res
}

function checkInterRepeat (interData) {
  const obj = {}
  const arr = []
  for (const item in interData) {
    const key = interData[item].request.url + '|' + interData[item].request.method
    if (!obj[key]) {
      arr.push(interData[item])
      obj[key] = true
    }
  }
  return arr
}

const importHar = function importHar (res) {
  try {
    res = JSON.parse(res)
    res = res.log.entries

    res = res.filter(item => {
      if (!item) return false
      return item.response.content.mimeType.indexOf('application/json') === 0
    })
    const interfaceData = { apis: [] }
    console.log('importDataModule -> res', res)
    // const interfaceData = { apis: [] }
    res = checkInterRepeat(res)
    if (res && res.length) {
      for (const item in res) {
        const data = handleHar(res[item], ['title', 'path', 'method', 'res_body'])
        interfaceData.apis.push(data)
      }
    }

    return interfaceData
  } catch (e) {
    console.error(e)
    console.log('数据格式有误')
  }
}
export default importHar