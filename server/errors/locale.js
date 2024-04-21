module.exports = {
  '40000.SessionError': {
    zh: '会话过期',
    en: '会话过期'
  },
  '40001.TokenError': {
    zh: 'token 不合法',
    en: 'token 不合法'
  },
  '40002.OCRError': {
    zh: (fields) => {
      return `OCR异常: ${fields}`
    },
    en: (fields) => {
      return `OCR Exception: ${fields}`
    }
  },
  '40003.ParamError': {
    zh: (fields) => {
      return `参数有误: ${fields}`
    },
    en: (fields) => {
      return `ParamError: ${fields}`
    }
  },
  '40004.NotFound': {
    zh: (fields) => {
      return `资源不存在: ${fields}`
    },
    en: (fields) => {
      return `资源不存在: ${fields}`
    }
  },
  '40005.ImportError': {
    zh: '导入失败',
    en: '导入失败'
  },
  '40006.APINotFound': {
    zh: '接口不存在',
    en: '接口不存在'
  }
}
