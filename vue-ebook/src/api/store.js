import axios from 'axios'
import { setLocalForage } from '../utils/localForage'

export function download(book, onSuccess, onError, onProgress) {
  if (!onProgress) {
    onProgress = onError
    onError = null
  }
  return axios.create({ // 采用axios的create方法传递参数设置响应类型
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob', // 设置响应类型
    timeout: 180 * 1000, // 下载超时时间
    onDownloadProgress: ProgressEvent => { // 下载进度
      if (onProgress) onProgress(ProgressEvent)
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`).then(res => {
    const blob = new Blob([res.data])
    setLocalForage(book.fileName, blob, () => { // 建立本地存储，indexDB
      if (onSuccess) onSuccess(book)
    }, err => {
      if (onError) onError(err)
    })
  }).catch(err => {
    if (onError) onError(err)
  })
}

export function flatList() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/flat-list`
  })
}

export function shelf() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
  })
}

export function home() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  })
}

export function detail(book) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}

export function list() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/list`
  })
}
