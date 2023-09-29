import 'normalize.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SelectionContainer from './Components/SelectionContainer'
import Slideshow from './Components/Slideshow/Slideshow'
function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<SelectionContainer />} />
          <Route path='/slideshow' element={<Slideshow />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
