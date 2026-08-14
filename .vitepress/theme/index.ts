import DefaultTheme from 'vitepress/theme'
import 'virtual:group-icons.css'
import './styles.css'
import MyLayout from './MyLayout.vue'
import ContactForm from './components/ContactForm.vue'
import SubscribeForm from './components/SubscribeForm.vue'
import ModalDemo from './components/ModalDemo.vue'
import ComponentInHeader from './components/ComponentInHeader.vue'
import CoreTerms from './components/CoreTerms.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('ContactForm', ContactForm)
    app.component('SubscribeForm', SubscribeForm)
    app.component('ModalDemo', ModalDemo)
    app.component('ComponentInHeader', ComponentInHeader)
    app.component('CoreTerms', CoreTerms)
  }
}
