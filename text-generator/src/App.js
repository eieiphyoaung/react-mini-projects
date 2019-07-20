import React from 'react';
import axios from 'axios';
import Output from './Components/Output';
import Select from './Components/Controls/Select';
import Text from './Components/Controls/Text';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      paras: 4,
      html: true,
      text:''
    }
  }

  componentWillMount(){
    this.sampleText();
  }

  sampleText(){
    axios.get('http://hipsterjesus.com/api?paras='+this.state.paras+'&html='+this.state.html)
      .then((response) => {
          this.setState({text:response.data.text},function(){
            console.log(this.state);
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showHTML(x){
    this.setState({html:x},this.sampleText);
  }

  changeParas(number){
    this.setState({paras:number},this.sampleText);
  }

  render(){
      return (
        <div className="App container">
          <h1 className="text-center">ReactJS Sample Text Generator</h1>
          <hr/>
          <form className="form-inline">
            <div className="form-group">
              <label>Paragraph</label> &nbsp; &nbsp;
              <Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
            </div>

            <div className="form-group">
              <label>Include HTML</label> &nbsp; &nbsp;
              <Select value={this.state.html} onChange={this.showHTML.bind(this)} />
            </div>
          </form>
          <br/><br/>
          <Output value={this.state.text} />
        </div>
      );
  }
}

export default App;
