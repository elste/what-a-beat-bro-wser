import { defineBoot } from '#q-app/wrappers'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'

// optional: import other languages or plugins if needed
// import 'prismjs/components/prism-css'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export default defineBoot(() => {
  // make Prism available globally so components can call Prism.highlightAll()
  ;(window as any).Prism = Prism
})
