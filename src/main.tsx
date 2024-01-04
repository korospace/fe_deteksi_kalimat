import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Rt from './router/index.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Rt/>
  </BrowserRouter>
)
