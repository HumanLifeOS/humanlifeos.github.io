import DefaultTheme from 'vitepress/theme'
import 'virtual:group-icons.css'
import './styles.css'
import MyLayout from './MyLayout.vue'
import ContactForm from './ContactForm.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('ContactForm', ContactForm)
  }
}
