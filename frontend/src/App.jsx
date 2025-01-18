import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templates from "./components/templates.jsx";
import Template1 from "./components/template1.jsx";
import Template2 from "./components/template2.jsx";
import Service1 from "./components/service1.jsx";
import Service2 from "./components/service2.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Templates />} />
        {/* <Route path="home" element={<Home/>} /> */}
        <Route path="/temp1" element={<Template1 />} />
        <Route path="/temp2" element={<Template2 />} />
        <Route path="/service1" element={<Service1 />} />
        <Route path="/service2" element={<Service2 />} />
      </Routes>
    </BrowserRouter>
  );
}
