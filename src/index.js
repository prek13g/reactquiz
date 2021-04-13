import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';
import quizService from './quizService';
import QuestionBox from './QuestionsBox';
import Result from './Result';

class Quizb extends Component{
  state = {
    questionBank : [],
    score:0,
    responses:0
  };
  //lets us centrally store and use data, and makes it easy to debug

  getQuestions = ()=>{
    quizService().then(question =>{
       this.setState({
         questionBank: question
       });
    });
  };
 
  computeAnswer=(answer,correctAnswer)=>{
    if(answer===correctAnswer){
      this.setState({
        score:this.state.score+1
      })
    }
    this.setState({
      responses:this.state.responses<5 ? this.state.responses + 1 : 5
    })
  }
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score:0,
      responses:0
    })
  }
  componentDidMount() {
    this.getQuestions();
  }
//to get set of questions
//any changes made to the question bank would get reflected here
  render(){
    return(<>
    <br/>
      <div className="container">
      <br/>
      <br/>
         <div className="title">Quizz</div>
         {this.state.questionBank.length>0 &&this.state.responses<5 && this.state.questionBank.map(
           ({question,answers,correct,questionId})=>
           (<QuestionBox 
           question={question} 
           options={answers} 
           key={questionId}
           selected={answer=> this.computeAnswer(answer,correct)}  
           />) 
           //key is for unique question id for each question
           )}

            {this.state.responses === 5 ? <Result score={this.state.score} playAgain={this.playAgain}/>: null}

      </div>
    </>);
  } 
}
ReactDOM.render(<Quizb/>,document.getElementById("root"));