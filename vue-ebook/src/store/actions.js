const actions = {
  setFileName: ({ commit }, fileName) => { // 文件名
    return commit('SET_FILENAME', fileName)
  },
    setCurrentBook: ({ commit }, currentBook) => { // 这本书
    return commit('SET_CURRENT_BOOK', currentBook)
  },
  setMenuVisible: ({ commit }, menuVisible) => { // 菜单展示
    return commit('SET_MENUVISIBLE', menuVisible)
  },
  setSettingVisible: ({ commit }, settingVisible) => { // 设置展示
    return commit('SET_SETTINGISIVLE', settingVisible)
  },
  setFontFamilyVisible: ({ commit }, visible) => { // 字体展示
    return commit('SET_FONT_FAMILY_VISIBLE', visible)
  },
  setDefaultFontFamily: ({ commit }, font) => { // 字体样式
    return commit('SET_DEFAULT_FONT_FAMILY', font)
  },
  setDefaultFontSize: ({ commit }, fontSize) => { // 默认字体
    return commit('SET_DEFAULT_FONT_SIZE', fontSize)
  },
  setDefaultTheme: ({ commit }, theme) => { // 默认主题
    return commit('SET_DEFAULT_THEME', theme)
  },
  setBookAvailable: ({ commit }, bookAvailable) => {
    return commit('SET_BOOK_AVAILABLE', bookAvailable)
  },
  setProgress: ({ commit }, progress) => {
    return commit('SET_PROGRESS', progress)
  },
  setSection: ({ commit }, section) => {
    return commit('SET_SECTION', section)
  },
  setIsPaginating: ({ commit }, isPaginating) => {
    return commit('SET_IS_PAGINATING', isPaginating)
  },
  setNavigation: ({ commit }, navigation) => {
    return commit('SET_NAVIGATION', navigation)
  },
  setCover: ({ commit }, cover) => {
    return commit('SET_COVER', cover)
  },
  setMetadata: ({ commit }, metadata) => {
    return commit('SET_METADATA', metadata)
  },
  setPaginate: ({ commit }, paginate) => {
    return commit('SET_PAGINATE', paginate)
  },
  setPagelist: ({ commit }, pagelist) => {
    return commit('SET_PAGELIST', pagelist)
  },
  setIsBookmark({ commit }, isBookmark) {
    return commit('SET_IS_BOOKMARK', isBookmark)
  },
  setOffsetY({ commit }, offsetY) {
    return commit('SET_OFFSETY', offsetY)
  },
  setSpeakingIconBottom({ commit }, speakingIconBottom) {
    return commit('SET_SPEAKING_ICON_BOTTOM', speakingIconBottom)
  },
  setHotSearchOffsetY({ commit }, hotSearchOffsetY) {
    return commit('SET_HOT_SEARCH_OFFSETY', hotSearchOffsetY)
  },
  setFlapCardVisible({ commit }, flapCardVisible) {
    return commit('SET_FLAP_CARD_VISIBLE', flapCardVisible)
  },
  setIsEditMode({ commit }, isEditMode) {
    return commit('SET_IS_EDIT_MODE', isEditMode)
  },
  setShelfList({ commit }, list) {
    return commit('SET_SHELF_LIST', list)
  },
  setShelfSelected({ commit }, selected) {
    return commit('SET_SHELF_SELECTED', selected)
  },
  setShelfTitleVisible({ commit }, visible) {
    return commit('SET_SHELF_TITLE_VISIBLE', visible)
  },
  setShelfCategory({ commit }, category) {
    return commit('SET_SHELF_CATEGORY', category)
  },
  setCurrentType({ commit }, type) {
    return commit('SET_CURRENT_TYPE', type)
  }
}
export default actions
