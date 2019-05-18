<template>
  <div>
    <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible&&settingVisible===1">
      <div class="setting-theme">
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
          <div class="preview" :style="{background:item.style.body.background}" :class="{'selected': item.name === defaultTheme}"></div>
          <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>
<script>
import { ebookMixin } from '../../utils/mixin'
import { saveTheme } from '../../utils/localStorage'

export default {
  mixins: [ebookMixin],

  methods: {
    setTheme(index) { // 设置主题
      const theme = this.themeList[index] // 取出相应的主题信息
      this.setDefaultTheme(theme.name).then(() => { // 改变默认主题为theme.name,
        this.currentBook.rendition.themes.select(this.defaultTheme) // 名字改了之后把这本书的主题给改了
        this.initGlobalStyle() // 调用全局方法，初始化全局主题
      })
      saveTheme(this.fileName, theme.name) // 保存主题名称
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/global';
.setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
        };
          &.selected {
            box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0,0, .1)
          }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          color: #ccc;
          @include center;
          &.selected {
            color: #333;
          }
        }
      }
    }
  }
</style>
