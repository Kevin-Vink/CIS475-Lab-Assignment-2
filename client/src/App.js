import {BrowserRouter, Route, Routes} from "react-router-dom";
import Students from "./views/Students";
import StudentDetail from "./views/StudentDetail";
import {ToastContainer} from "react-toastify";
import DefaultLayout from "./layouts/defaultLayout";

function App() {
    return (
        <>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DefaultLayout/>}>
                        <Route index path="/" element={<Students/>}/>
                        <Route path="/:id" element={<StudentDetail/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
