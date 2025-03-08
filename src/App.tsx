import { Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Slide, ToastContainer } from "react-toastify"

export function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
        transition={Slide}
      />
    </>
  )
}