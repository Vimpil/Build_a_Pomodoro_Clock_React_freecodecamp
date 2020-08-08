import React from "react";

import "./styles.css";


const timeLeftStyle = {
	color:"red",
}

class Timer extends React.Component {



  constructor(props){
    super(props)
    this.state = {
      isOn: false,
      minutes: 0,
      seconds: 0,
      currTimerPer: false,
      counter : 0
    }

 	
    this.start_stop = this.start_stop.bind(this);
    this.resetTimer = this.resetTimer.bind(this);

  }

  getTimeUntil(deadline) {
  	
	
	if(this.state.isOn) {

			deadline = deadline - (this.state.counter*60);

		    const seconds = Math.floor((deadline / 1000) % 60);
		    
		    const minutes = Math.floor((deadline / 1000 / 60) % 60);      
	
			this.setState({ minutes:minutes, seconds:seconds });


			if(((this.state.minutes===0)&&(this.state.seconds===0)))
					{
				  				this.setState({currTimerPer:!this.state.currTimerPer,counter:0});
				  				clearInterval(this.timer);
				  				this.playSound();
				  				this.startTimer();
				  	}
		  	
		  	this.setState({
		  		counter:this.state.counter+(60/1000)
		  	})
  	}


}



  start_stop(e){

  	e.preventDefault();
	   		
		if(!this.state.isOn){
	   		this.setState({
	   			isOn:true,
	   		})

	   		this.startTimer();

	   	}else{

	   		this.setState({
	   			isOn:false,
	   		})
	   		this.setState({
		  		counter:0
		  	})
	   		clearInterval(this.timer);
		}


}

resetTimer(){
console.log('resetTimer entr');
	this.setState({
	   	currTimerPer:false,
	   	minutes:25,
	   	seconds:0,
	   	counter:0,
	   	isOn:false,

	})
	clearInterval(this.timer);

		this.props.updateBincr('5');
		this.props.updateSincr('25');
		
	

}


startTimer() {

	var dt='';

	if(((this.state.seconds===0)&&(this.state.seconds===0))){

		if (!this.state.currTimerPer){
			    	dt = (this.props.sincr*1000 * 60);

				}else{
					dt = (((this.props.bincr*1000 * 60)));
				}
	}else{
		dt = (this.state.minutes*1000 * 60)+(this.state.seconds*1000);
	}

	this.timer = setInterval(() => (this.getTimeUntil(dt), 1000 ));

}

playSound(e) {
    const sound = document.getElementById("beep");
    sound.currentTime = 0;
    sound.play();    
  }


  render() {
			{this.updateBincr=this.props.updateBincr}
			{this.updateSincr=this.props.updateSincr}
  return(
  	<div class = 'timer'>
	  	<div id="timer-label">{this.state.currTimerPer?"Break":"Session"}</div>
	    <div id="time-left" style={this.state.minutes<1?timeLeftStyle:null}>{this.state.minutes<10?"0"+this.state.minutes:this.state.minutes}{' : '}{this.state.seconds<10?"0"+this.state.seconds:this.state.seconds}</div>
		<button id="start_stop" type="button" onClick={this.start_stop} />
		<button id="reset" type="button" onClick={this.resetTimer} />
		{this.props.updateSmth2}
		<audio
		  className='clip'
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
	</div>

    )
  }
}




class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	bincr: 2,
    	sincr: 1,
    	newParamB:false,
    	newParamS:false,
    };

    this.buttonClick = this.buttonClick.bind(this);
    this.updateBincr = this.updateBincr.bind(this);
    this.updateSincr = this.updateSincr.bind(this);
    this.TruenewParamB = this.TruenewParamB.bind(this);
    this.TruenewParamS = this.TruenewParamS.bind(this);
  }




  TruenewParamB(){
  	
	this.setState({
  		newParamB: true,
  	})

  }

  TruenewParamS(){
  	
	this.setState({
  		newParamS: true,
  	})
  	
  }


  updateBincr(value){
  	
  	

	this.setState({
  		newParamB: true,
  	})
  	

  	this.setState({
  		bincr: value,
  	})

  	
  }

  updateSincr(value){

  	

	  	this.setState({
	  		newParamS: true,
	  	})

	  	this.setState({
	  		sincr: value,
	  	})
  	
  }


  buttonClick(e) {
    
    const button_id = e.target.id;
    
     switch (button_id) {

     	case "break-increment":
	     	if(this.state.bincr+1<60){
	     	this.setState({
	          bincr: this.state.bincr+1
	      	})
     	}
          break;

        case "break-decrement":
        if((this.state.bincr-1)>0){
            this.setState({
	          bincr: this.state.bincr-1
	        })
    	}
          break;

        case "session-increment":
        if(this.state.sincr+1<60){
	        this.setState({
	          sincr: this.state.sincr+1
	        })
    	}
          break;

        case "session-decrement":
        
        if(this.state.sincr-1>0){
	        this.setState({
	          sincr: this.state.sincr-1
	        })
	    }

          break;

        default:
        
        break;
     }
  }


componentDidMount() {
    
  }
  render() {
    return (
      <div className="App">

		<div class="length-control">      
		        
		        <div id="#break-label">Break Length</div>

		        <button id="break-decrement" type="button" onClick={this.buttonClick} />

		        <button id="break-increment" type="button" onClick={this.buttonClick} />

		        <div id="break-length" class="btn-level">{this.state.bincr}</div>
		</div>


		<div class="length-control"> 

		        <div id="#session-label">Session Length</div>

		        <button id="session-decrement" type="button" onClick={this.buttonClick} />

		        <button id="session-increment" type="button" onClick={this.buttonClick} />

		        <div id="session-length" class="btn-level">{this.state.sincr}</div>

		</div>

		<Timer 
		
			bincr={this.state.bincr}
			sincr={this.state.sincr}

			newParamB={this.state.newParamB}
			newParamS={this.state.newParamS}

			updateBincr={this.updateBincr}
			updateSincr={this.updateSincr}

			TruenewParamB={this.state.TruenewParamB}
			TruenewParamS={this.state.TruenewParamS}

		/>

      </div>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

    render() {
      return (
        <div className="App">
          <PomodoroClock />
         
          {/* <p id="display">{this.state.display}</p> */}
        </div>
      );
    }
    

}