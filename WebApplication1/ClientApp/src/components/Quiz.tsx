import * as React from 'react';
import { connect } from 'react-redux';
import { Container,Row,Col } from 'reactstrap';
import { Spring } from 'react-spring/renderprops';
import axios from 'axios';
import './Quiz.css';
/*
This code differs a little bit from the rest of the project, as it current state of 03.05.20.
There is a main class with variables stored inside state, no redux is used yet. 

state - most of the variables used to fetch and send data
loadData() - function which loads question and answers
sendIt() -function which sends selected answer
render() - well render

 REMEMBER ABOUT SETTING STATE WHEN PASSING VARIABLES

 and typescript may need :any
*/
type State = {
	loading: boolean,
	error: boolean,
	data: object,
	category: string,
	question1:string,
	answer1:string,
	answer2:string, 
	answer3:string,
	answer4:string,
	id: number,
	numer:number,
};
type Sendquestion = {
	question: {
		answers:[
			{
				id:number
			}
		]
	}
};
export class Quiz extends React.Component<State> {

   	readonly  state : State = {
		data:{},
        loading: true,
        error: false,
        category: '',
        question1:'',
        answer1:'',
        answer2:'', 
        answer3:'',
		answer4:'',
		id:0,
		numer:0,
	};
	readonly sendquestion : Sendquestion = {
		question: {
			answers:[
				{
					id:0,
				}
			]
		}
	};

    loadData = () => {
        this.setState({ loading: true });
        return axios.get(`https://localhost:44322/api/Test`)
        .then(result => {
			console.log(result.data)
            this.setState({
                loading: false,
                error: false,
				category: result.data[0].category,
				id: result.data[0].id,
                question1: result.data[0].question.content,
                answer1: result.data[0].question.answers[0].content,
                answer2: result.data[0].question.answers[1].content,
                answer3: result.data[0].question.answers[2].content,
				answer4: result.data[0].question.answers[3].content,
				correctAnswer: result.data[0].question.correctId              
			});
		})
        .catch(err => {
        	console.error("error: ", err);
            this.setState({
              	error: `${err}`,
              	loading: false
            });
		});
	}
	 selectAnswer = async (e:any) => {
		await this.setState ({
			numer: e.target.id,
		});
		const numer:number = this.state.numer;
		await this.setState ({
			question:{
				answers:[
					{
						id:numer,
					}
				] 
			}			 
		});
		this.sendId();
	}
	sendId = () => {
		const id = this.state;
		const question = this.sendquestion.question;
		console.log(this.sendquestion);
		axios.post(`https://localhost:44322/api/Test`, {id,question})
		.then(res => {
			console.log(res.data)
		})
		.catch(err =>{
			console.error("error: ", err);
			this.setState({
				error: `${err}`,
			});
		});
	};
	comeAndGetThem = () => {
	}
    componentDidMount() {
		this.loadData();
    }

	render() {
		const { loading, error, category, answer1, question1, answer2, answer3, answer4, id } = this.state;
		if (loading) {
			return (
			<h2>Ładowanie...</h2>
			);
		}
		if (error) {
			return (
				<p>
				There was an error loading the repos.{" "}
				<button onClick={this.loadData}>Try again</button>
				</p>
			);
		}
		const styles = {
			answers:{
				marginBottom:"10px",
			},
			buttons: {
				width:"100%",
			},
		};    
		return (
		<section>
			<Spring
  from={{ opacity: 0 }}
  to={{ opacity: 1 }}
  config={{duration:500}}>
  {props => 
		<Container style={props}>
			<Row>
				<Col sm={6}>
					<p>Kategoria: {category}</p>
				</Col>
				<Col sm={6}>
					<p>ID z bazy danych: {id}</p>
				</Col>
				<Col sm={12}>
					<h2>{question1}</h2>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<button id='0' className={'but1'} onClick={this.selectAnswer} style={styles.buttons} >A. {answer1}</button>
					</div>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<button id='1' className={'but2'} onClick={this.selectAnswer} style={styles.buttons} >B. {answer2}</button>
					</div>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<button id='2' className={'but3'} onClick={this.selectAnswer} style={styles.buttons} >C. {answer3}</button>
					</div>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<button  id='3' className={'but4'} onClick={this.selectAnswer} style={styles.buttons}>D. {answer4}</button>
					</div>
				</Col>
			</Row>
  </Container>} 
		</Spring>
		</section>
		);
	};
}

export default connect() (Quiz);
