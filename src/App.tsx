import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux';
import Cart from './pages/cart/Index'
import Delivery from './pages/Delivery'
import Home from './pages/Home'
import store from './store'


function App() {


  return (
    <ReduxProvider store={store}>
      <div className='mx-auto xs:max-w-[calc(100%-10%)] md:max-w-[calc(100%-22%)] '>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/delivery" element={<Delivery />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ReduxProvider>
  )
}

export default App
