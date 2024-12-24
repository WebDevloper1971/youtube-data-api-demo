import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
// import HomePage from "./pages/HomePage";
// import VideoPage from "./pages/VideoPage";
import Home from "./pages/Home";
import Video from "./pages/Video";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/video/:categoryId/:videoId" element={<Video />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
