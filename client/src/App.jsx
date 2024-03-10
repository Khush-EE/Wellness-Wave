import { Outlet } from "react-router-dom"
import { Header, Footer } from "./components/index"
import { Provider } from "react-redux"
import { store } from "./redux/store.js"

function App() {

    return (
        <>
            <Provider store={store}>
              <Header />
              <main>
                  <Outlet />
              </main>
              <Footer />
            </Provider>
        </>
    )
}

export default App
