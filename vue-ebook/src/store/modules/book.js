const book = {
  state: {
    fileName: '', // 文件名
    menuVisible: false, // 菜单隐藏
    settingVisible: -1, // 设置详情显示-1:不显示，0：字号，1：主题，2：进度，3：目录
    defaultFontSize: 16, // 默认字体大小
    currentBook: null, // 这本书
    defaultFontFamily: 'Default', // 默认字体样式为'Default'
    fontFamilyVisible: false, // 字体样式详情可见
    defaultTheme: 'default', // 默认主题
    bookAvailable: false,
    progress: 0, // 看书进度百分比
    section: 0, // 章节
    isPaginating: true,
    navigation: null,
    cover: null, // 封面
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0, // 偏移量
    isBookmark: null
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => { // 改变文件名
      state.fileName = fileName
    },
    'SET_MENUVISIBLE': (state, menuVisible) => { // 菜单隐藏
      state.menuVisible = menuVisible
    },
    'SET_SETTINGISIVLE': (state, settingVisible) => { // 底部菜单详情设置隐藏
      state.settingVisible = settingVisible
    },
    'SET_CURRENT_BOOK': (state, currentBook) => { // 这本书
      state.currentBook = currentBook
    },
    'SET_DEFAULT_FONT_SIZE': (state, defaultFontSize) => { // 默认字体大小隐藏
      state.defaultFontSize = defaultFontSize
    },
    'SET_DEFAULT_FONT_FAMILY': (state, font) => { // 默认字体样式
      state.defaultFontFamily = font
    },
    'SET_FONT_FAMILY_VISIBLE': (state, visible) => { // 默认字体样式详情隐藏
      state.fontFamilyVisible = visible
    },
    'SET_DEFAULT_THEME': (state, defaultTheme) => { // 默认主题样式
      state.defaultTheme = defaultTheme
    },
    'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    'SET_PROGRESS': (state, progress) => {
      state.progress = progress
    },
    'SET_SECTION': (state, section) => {
      state.section = section
    },
    'SET_IS_PAGINATING': (state, isPaginating) => {
      state.isPaginating = isPaginating
    },
    'SET_NAVIGATION': (state, navigation) => {
      state.navigation = navigation
    },
    'SET_COVER': (state, cover) => {
      state.cover = cover
    },
    'SET_METADATA': (state, metadata) => {
      state.metadata = metadata
    },
    'SET_PAGINATE': (state, paginate) => {
      state.paginate = paginate
    },
    'SET_PAGELIST': (state, pagelist) => {
      state.pagelist = pagelist
    },
    'SET_OFFSETY': (state, offsetY) => {
      state.offsetY = offsetY
    },
    'SET_IS_BOOKMARK': (state, isBookmark) => {
      state.isBookmark = isBookmark
    }
  }
}
export default book
