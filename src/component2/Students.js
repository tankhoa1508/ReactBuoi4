import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Table, Input } from "reactstrap";

export default function Students() {
    const [textEdit,setTextEdit] = useState("")
    const [isEdit, setIsEdit] = useState({id:"",flag:false})
    const [text,setText] = useState("");
  const [data, setData] = useState([]);
  const [message, setMassage] = useState(null);

  const url = "https://66a07c047053166bcabb90c1.mockapi.io/student";
  const getStudents = () => {
    axios.get(url)
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteStudent = (id) => {
    axios.delete(url + "/" + id)
      .then(function (res) {
        setMassage("Delete successfull");
        getStudents(data.filter(item=>item.id!==id));
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  const addNewStudent = (txt) => {
    axios.post(url, {
        name: txt
      })
      .then(function (res) {
        setMassage("Add successfull");
        setData([...data,{id:res.data.id, name:txt}]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateStudent = (id, txt) => {
    axios.put(url + "/" + id, {
        name: txt
      })
      .then(function (res) {
        setMassage("Update successfull");
        setData(data.map(item=>item.id===id?{...item,name:txt}:item));
      })
      .catch(function (error) {
        console.log(error);
      });

    // axios ({
    //     method: "put",
    //     url: url,
    //     data: {
    //         name: "Lê Hổ"
    //     }
    // })
    //     .then(function(res) {
    //         setMassage("Add successfull")
    //         getStudents();
    //     })
    //     .catch(function(error) {
    //         console.log(error)
    //     })
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div>
      <Container>
        
        {message && <p>{message}</p>}
        <h1>Student List</h1>
        <Input type="text" value={text} onChange={(event)=>setText(event.target.value)} 
        onKeyDown={(e)=>{
            if(e.key==="Enter"){
                addNewStudent(text)
                setText("")
            }
        }}

         />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr>
                  <td>{item.id}</td>
                  <td>
                    {
                        isEdit.id===item.id&&isEdit.flag===true?<Input type="text" value={textEdit}
                        onChange={(e)=>setTextEdit(e.target.value)}
                        onKeyDown={(e)=>{
                            if (e.key==='Enter') {
                                updateStudent(item.id, textEdit)
                                setIsEdit({id:"", flag:false})
                            }
                        }} 
                        />:
                        <p onDoubleClick={()=>{
                        setIsEdit({id:item.id, flag:true})
                        setTextEdit(item.name)
                        }}
                        >{item.name}
                        </p>
                    }
                   </td>
                  <td>
                    <Button
                      onClick={() => deleteStudent(item.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => updateStudent(item.id)}
                      className="btn btn-success"
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
