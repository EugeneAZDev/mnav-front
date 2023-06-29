const HEADERS = {
  'Content-Type': 'application/json; charset=UTF-8',
  Connection: 'keep-alive',
  'Keep-Alive': 'timeout=2',
  'Transfer-Encoding': 'chunked'
}

const transport = {}

transport.http = url => structure => {
  const api = {}
  const services = Object.keys(structure)
  for (const name of services) {
    api[name] = {}
    const service = structure[name]
    const methods = Object.keys(service)
    for (const method of methods) {
      api[name][method] = ({ file, ...args } = {}) => {
        let body;
        const token = localStorage.getItem('token')
        if (token) HEADERS['Authorization'] = `Bearer ${token}`
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          body = formData;
        } else {
          body = JSON.stringify({ args })
        }

        return new Promise((resolve, reject) => {
          fetch(`${url}/${name}/${method}`, {
            method: 'POST',
            headers: HEADERS,
            body
          }).then(res => {
            const headers = res.headers
            const statusType = Math.floor(res.status / 10)
            const contentType = headers.get('Content-Type')
            if (contentType === 'application/octet-stream') {
              resolve(res.arrayBuffer())              
            } else if (statusType === 20) {
              resolve(res.json())
            } else
              res.text().then(message => {
                reject(new Error(`${message}`))
              })
          })
        })
      }
    }
  }

  return Promise.resolve(api)
}

const scaffold = url => transport['http'](url)

export default async function getApiMethods () {
  const url = process.env.REACT_APP_API_HOST
  const initial = await scaffold(url)({ system: { load: [] } })
  const structure = await initial.system.load()
  const allMethods = await scaffold(url)(structure)
  return allMethods
}
