import Hook from "./component/hook/Hook";
import API from "./component/hook/API";
import Hook2 from "./component/hook/Hook2";
import { useState } from "react";
import "./style.css"
import Students from "./component2/Students";


function App() {
  // const [show,setShow] = useState(true)
  return (
    <div>
      {/* {
        show?<Hook2 /> :"Now show hook2"
      }
      <button onClick={()=>setShow(!show)}>Show</button> */}


      {/* API Student */}
      <Students/>
    </div>
  );
}

export default App;
