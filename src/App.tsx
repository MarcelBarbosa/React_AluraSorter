import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Configuracao from "./Components/Paginas/configuracao";
import Sorteio from "./Components/Paginas/sorteio";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>  
        <Routes>
          <Route path="/" element={<Configuracao />}/>
          <Route path="/sorteio" element={<Sorteio />}/>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
