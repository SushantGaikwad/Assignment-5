import React from "react";

const Todo = () =>{

    const [inputValue, setInputValue] = React.useState("");
    const [todos, setTodos] = React.useState([]);
    const [page,setPage] = React.useState(1);
    const [tpage,setTpage] = React.useState(0);
    
    React.useEffect(() => {
        getTodos(page);
        const pageno = async ()=>{
        const res = await fetch(`http://localhost:3001/todos?_limit=2`);
        const data = await res.json();
        const total = res.headers.get('x-total-count');
        setTpage(total);
        console.log(tpage);
        };
        pageno();
        
    },[page,tpage]);

    const getTodos = (page = 1) =>{
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=2`)
        .then((res) => res.json())
        .then((res) => setTodos(res))
        .catch((err) => console.log(err));
    }

    const handleAdd = () => {
        console.log(inputValue);

        const payload = {
            title : inputValue,
            status : false,
        };


        const payloadJson = JSON.stringify(payload);
        // let url = "https://json-server-mocker-masai.herokuapp.com/tasks"
        fetch(`http://localhost:3001/todos`, {
            method: "POST",
            body : payloadJson,
            headers : {
                "content-type" : "application/json"
            }
        }).then((res)=> {
            getTodos();
        } )
    }

    return <div>
        <input placeholder="Add Todos" 
        value={inputValue} 
        onChange = { (e) => setInputValue(e.target.value) }/>
        <button onClick={handleAdd}>Save</button>
        {
            todos.map((item, index) => {
                return <div key={index}>{item.title}</div>
            })
        }
        <h3>Page : {page}</h3>
        <h3>{tpage}</h3>

        <button disabled = {page === 1} onClick={() => setPage(page-1)}>Prev</button>
        <button onClick={() => setPage(page+1)} disabled = {page === Math.ceil(tpage/2)}>Next</button>
    </div>
}

export {Todo}