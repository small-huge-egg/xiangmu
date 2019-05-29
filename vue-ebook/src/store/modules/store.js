const store = {
  state: {
    hotSearchOffsetY: 0,
    flapCardVisible: false,
    isEditMode: false, // 是否处于编辑状态
    shelfList: [], // 书架数组
    shelfSelected: [], // 书架被选的书籍数组
    shelfTitleVisible: true // 书架标题可见
  },
  mutations: {
    SET_HOT_SEARCH_OFFSETY(state, offsetY) {
      state.hotSearchOffsetY = offsetY
    },
    SET_FLAP_CARD_VISIBLE(state, visible) {
      state.flapCardVisible = visible
    },
    SET_IS_EDIT_MODE(state, isEditMode) {
      state.isEditMode = isEditMode
    },
    SET_SHELF_SELECTED(state, selected) {
      state.shelfSelected = selected
    },
    SET_SHELF_LIST(state, list) {
      state.shelfList = list
    },
    SET__SHELF_TITLE_VISIBLE(state, visible) {
      state.shelfTitleVisible = visible
    }
  }
}
export default store
