const book = {
  state: {
    fileName: '', // 文件名
    menuVisible: false, // 菜单隐藏
    settingVisible: -1, // -1:不显示，0：字号，1：主题，2：进度，3：目录
    defaultFontSize: 16 // 默认字体大小
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => { // 改变文件名
      state.fileName = fileName
    },
    'SET_MENUVISIBLE': (state, menuVisible) => { // 菜单隐藏
      state.menuVisible = menuVisible
    },
    'SET_SETTINGISIVLE': (state, settingVisible) => { // 字体设置隐藏
      state.settingVisible = settingVisible
    },
    'SET_DEFAULT_FONT_SIZE': (state, defaultFontSize) => { // 默认字体大小隐藏
      state.defaultFontSize = defaultFontSize
    }
  }
}
export default book
