import React, { Component } from "react";
import Slide from "./Slide";
import Slide2 from "./Slide_2";
let opac = 50
let time = 0.5
let pos = 100


export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
        "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg",
      ],
      currentIndex: 0,
      currentIndex2: 0
    };
  }

  
  shuffle = async () => {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    for (let index = 1; index < 20; index++) {
      let sleepTime = 0
      if(index<10){
        sleepTime = 200 - (index*10)
      }
      else{
        sleepTime = 10*index // slowing down
      }
      console.log(sleepTime)
      await sleep(sleepTime).then(() => { this.goToNextSlide() });
    }
  }
  shuffle2 = () => {    
      this.goToNextSlide2()    
    }
  
  

  goToNextSlide = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
    console.log(this.state.currentIndex1);
  };

  goToPrevSlide = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1
    }));
    console.log(this.state.currentIndex1);
  };





  goToNextSlide2 = () => {
    console.log("moin")
    let theLoop = (i, time) =>{
      opac = 100
      pos = 0
      setTimeout(() => {
        this.setState(prevState => ({
          currentIndex2: prevState.currentIndex2 + 1
        }));
        console.log(this.state.currentIndex2);
        console.log(time)
        if (--i) {          // If i > 0, keep going
          theLoop(i, time);       // Call the loop again, and pass it the current value of i
        }
      }, time);
    }
    for (let index = 1; index < 6; index++) {
      let time = 1000*index
      console.log(time)
      theLoop(1, time)
    }

  };

  render() {
    return (
      <div>
        <button onClick={this.goToNextSlide}> {"<<<<<"} </button>
        <button onClick={this.goToPrevSlide}> {">>>>>"} </button>
        <button onClick={this.shuffle}>Shuffle</button>

        <br/><br></br>

        <div className="slider">
          {this.state.images.map((image, i) =>
            this.state.currentIndex >= i ? (this.state.currentIndex > i ? (<Slide key={i} image={image} subClass="slideImageLeft" />) : (<Slide key={i} image={image} subClass="slideImage" />
              )
            ) : (
              <Slide key={i} image={image} subClass="slideImageRight" />
            )
          )}
        </div>
        <br/>
        <br/>
        <br/>
        <br/><br/><br/><br/><br/>
        <br/>
        <br/>
        <button onClick={this.goToNextSlide2}>NEXT2</button>
        <button onClick={this.shuffle2}>Shuffle2</button>

        <div className="slider">
          {this.state.images.map((image, i) =>
            this.state.currentIndex2 === i ? <Slide2 key={i} image={image} opac={opac} time={time} pos={pos} />: <Slide2 key={i} image={image} opac="0" time={time} pos={pos} />
          )}
        </div>
      </div>
    );
  }
}
