import React from 'react';

class App extends React.Component {
  state = {
    data:[
      {'_id':'1','subject':'Apple','status':0},
      {'_id':'2','subject':'PineApple','status':1},
      {'_id':'3','subject':'Bread','status':0},
      {'_id':'4','subject':'Milk','status':1},
    ]
  }

  input = React.createRef();

  componentWillMount(){
    fetch('http://localhost:8000/tasks').then(res => res.json()).then(json => {
        this.setState({
          data:json
        })
    });
  }

  remove = (_id) => {
     this.setState({
        data:this.state.data.filter(item => item._id !== _id)
     });

     fetch(`http://localhost:8000/tasks/${_id}`, {
        method: 'DELETE'
      });
  }

  done = (_id) => {
    this.setState({
      data:this.state.data.map(item => {
          if(item._id === _id){
            item.status = 1;
          }
          return item;
      })
    });

    fetch(`http://localhost:8000/tasks/${_id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: 1 })
    });
  }

  undo = (_id) => {
    this.setState({
        data:this.state.data.map(item=>{
            if(item._id === _id){
              item.status = 0;
            }
            return item;
        })
    });

    fetch(`http://localhost:8000/tasks/${_id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: 0 })
    });
  }

  add = () => {
    var subject = this.input.target.value;
    fetch('http://localhost:8000/tasks',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ subject })
    }).then(res => res.json()).then(json => {
      this.setState({
          data:[
            json,
            ...this.state.data
          ]
      })
    });
  }

 render(){
  let todo = this.state.data.filter(item => item.status === 0);
  let done = this.state.data.filter(item => item.status === 1);
    return (
      <div className="App">
        <h1>Todo</h1>
        <ul>
          {todo.map(item => {
              return (
                 <li key={item._id}>
                    <input type="checkbox" onChange={()=> {
                      this.done(item._id);
                    }} />

                    {item.subject}
                 </li>
              )
          })}
        </ul>

        <hr/>

        <h1>Done </h1>
        <ul>
          {done.map(item => {
              return (
                <li key={item._id}>
                  <input type="checkbox" onChange={()=> {
                      this.undo(item._id);
                  }} />

                  {item.subject}
                </li>
              )
          })}
        </ul>
      </div>
    );
 }
}

export default App;
