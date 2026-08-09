import DefaultTheme from 'vitepress/theme'
import 'virtual:group-icons.css'
import './styles.css'
import MyLayout from './MyLayout.vue'
import ContactForm from './components/ContactForm.vue'
import ModalDemo from './components/ModalDemo.vue'
import ComponentInHeader from './components/ComponentInHeader.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('ContactForm', ContactForm)
    app.component('ModalDemo', ModalDemo)
    app.component('ComponentInHeader', ComponentInHeader)
  }
}
