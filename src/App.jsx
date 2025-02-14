import { Route, Routes } from "react-router";
import AppLayout from "./Layout/AppLayout";
import Create from "./Pages/Create";
import Creation from "./Pages/Creation";
import Home from "./Pages/Home";
import SingleImage from "./Pages/SingleImage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout></AppLayout>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/create" element={<Create></Create>}></Route>
          <Route path="/creations" element={<Creation> </Creation>}></Route>
          <Route
            path="/creation/:id"
            element={<SingleImage></SingleImage>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
