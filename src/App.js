import { Component } from 'react';

import './App.css';

const keys=["a","s","d","f","j","k","l",";"]



class App extends Component{

  state = {correctKeys:0,time:300,text:"",
              key:keys[0],count:0,accuracy:0,inputHandler:false}

  startTime = ()=>{
    this.setState((prev) => ({inputHandler : !prev.inputHandler}))
     this.setIntervalId = setInterval(this.updateTime,1000)
  }

  updateTime = ()=>{
    this.setState(prevState =>({time:prevState.time-1}))
  }

  clearInter = ()=>{
    clearInterval(this.setIntervalId)
    const {correctKeys,count} = this.state
    
    const accuracy = Math.floor(correctKeys/count *100)
   // console.log(accuracy , correctKeys , count)

    this.setState({accuracy,correctKeys:0,time:300,text:"",
    key:keys[0],inputHandler:false})
  }

  increaseCorrect = ()=>{
    this.setState(prevState =>({correctKeys:prevState.correctKeys+1}))
  }

  callBackFunction = ()=>{
    const {text,key} = this.state

    if (text === key){
    //  console.log(text)
      this.increaseCorrect()
    }

    const randomNumber = Math.floor(Math.random()*keys.length)
        // console.log(randomNumber)
        const randomKey = keys[randomNumber]

        setTimeout(()=>{
          this.setState(prevState =>({
            key:randomKey,
            count:prevState.count +1,
            text:""
          }))
        },100)
        
  }
  
    getInputValue = (event)=>{
      const {inputHandler} = this.state
      if(inputHandler){ 
      this.setState({text:event.target.value},this.callBackFunction)  
    }

  }

  render(){
    const {time,key,count,accuracy,text} = this.state
   // console.log(text)
    if (time === 0){
      this.clearInter()
    }

    const minutes = Math.floor(time/60)
    const seconds = time%60
    const updatedSeconds = seconds <10 ? `0${seconds}`:seconds
    return(
      <div className='app-container'>
        <h1>Touch Typing</h1>
        <div className="start-container">
          <p className='time'>minutes:{minutes} seconds:{updatedSeconds}</p>
          <button onClick={this.startTime} type="button" className='button'>Start</button>
        </div>
        <h1>Enter Key - <span>{key}</span></h1>
        <input value={text} onChange={this.getInputValue}  type="text" placeholder='start typing....' />
        <p className='accuracy'>Accuracy : {`${accuracy}%`}</p>
        <p className='count'>Number of keys pressed in 5 mins:- {count}</p>
      </div>
    )
  }

}

export default App