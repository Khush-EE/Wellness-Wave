import { Outlet } from "react-router-dom"
import { Header, Footer } from "./components/index"

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default App
