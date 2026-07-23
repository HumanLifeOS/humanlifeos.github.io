import DefaultTheme from 'vitepress/theme'
import 'virtual:group-icons.css'
import './styles.css'
import MyLayout from './MyLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout
}