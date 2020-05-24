import * as React from 'react';
import { connect } from 'react-redux';
import { Container,Row,Col } from 'reactstrap';
import { Spring } from 'react-spring/renderprops';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import './Quiz.scss';
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
	numer:number,
	question: {
		answers:[
			{
				id:any
			}
		]
	},
	response:string,
	redirect:boolean,
	allquestions:any,
	currentquestion:any;
	it:number,
};




export class Quiz extends React.Component<State> {
	
   	readonly  state : State = {
        loading: true,
		error: false,
		numer:0,
		question: {
			answers:[
				{
					id:0,
				}
			]
		},
		response:'',
		redirect:false,
		allquestions:[
			{
				category:'',
				id:0,
				question: {
					content:'',
					answers:[
						{
						id:0,
						content:'',
						},
						{
							id:0,
							content:'',
						},
						{
							id:0,
							content:'',
						},
						{
							id:0,
							content:'',
						},
					]
				}
			}
		],
		currentquestion:{
			category:'',
			id:0,
			content:'',
			answer1:'',
			answer2:'',
			answer3:'',
			answer4:'',
			id1:'',
			id2:'',
			id3:'',
			id4:'',
		},
		it:0
	};

    loadData = async() => {
        this.setState({ loading: true });
        await axios.get(`https://localhost:44322/api/Test`)
        .then(res=> {
			console.log(JSON.stringify(res.data))
            this.setState({
				allquestions: res.data,
                loading: false,
				error: false,
			});
		})
        .catch(err => {
        	console.error("error: ", err);
            this.setState({
              	error: `${err}`,
              	loading: false
            });
		}) 
		this.currentQuestion();
	}
	currentQuestion = async() => {
		const all = this.state.allquestions; 
		const it = this.state.it;
		await this.setState({
			currentquestion: {
				category: all[it].category,
				id: all[it].id,
				content: all[it].question.content,
				answer1: all[it].question.answers[0].content,
				answer2: all[it].question.answers[1].content,
				answer3: all[it].question.answers[2].content,
				answer4: all[it].question.answers[3].content,
				id1: all[it].question.answers[0].id.toString(),
				id2: all[it].question.answers[1].id.toString(),
				id3: all[it].question.answers[2].id.toString(),
				id4: all[it].question.answers[3].id.toString(),
			}
		})
	}
	selectAnswer = async (e:any) => {
		await this.setState({
			numer:parseInt(e.target.id)
		})
		await this.setState ({
			question:{
				answers:[
					{
						id:this.state.numer,
					}
				] 
			}	 
		});
		console.log(this.state.question)
		this.sendId();
	}
	sendId = async () => {
		const {question} = this.state;
		const id = this.state.currentquestion.id;
		await axios.post(`https://localhost:44322/api/Test`, {id,question})
		.then( res => {
				this.setState({
				response:res.data
			});
		})
		.catch(err =>{
			console.error("error: ", err);
			this.setState({
				error: `${err}`,
			});
		})
		this.molonLabe();
	};
	molonLabe = async () => {
		const it = this.state.it;
		const amount = this.state.allquestions.length;
		if (it < amount) {
			this.setState({
				it : this.state.it + 1
			})
			this.currentQuestion();
		}
		else {
			this.setState({
					redirect:true
			})
		}
	}
	componentDidMount() {
		this.loadData();
	}
	
	render() {
		const {category, answer1, content, answer2, answer3, answer4,id1,id2,id3,id4,id} = this.state.currentquestion;
		const {redirect,loading, error} = this.state;
		const styles = {
			answers:{
				marginBottom:"10px",
			},
			buttons: {
				width:"100%",
				padding:'30px',
				border:'1px solid transparent',
				borderRadius:'4px'
			},
			top: {
				marginTop:'30px'
			},
			question: {
				marginBottom:'30px'
			},
			id: {
				textAlign:'right' as 'right',
			}
		};    
		if (loading) {
			return (
			<h2>Ładowanie...</h2>
			);
		}
		if (error) {
			return (
				<p>
				Wystąpił problem podczas ładowania{" "}
				<button style={styles.buttons} onClick={this.loadData}>Spróbuj ponownie!</button>
				</p>
			);
		}
		if (redirect){
			return (
				<Redirect to="/summary"/>
			);
		}
		return (
		<section>
			<Spring
			from={{ opacity: 0 }}
			to={{ opacity: 1 }}
			config={{duration:700}}>
			{props => 
		<Container style={props}>
			<Row style={styles.top}>
				<Col sm={6}>
					<p>Kategoria: {category}</p>
				</Col>
				<Col sm={6}>
					<p style={styles.id}>ID z bazy danych: {id}</p>
				</Col>
				<Col sm={12}>
					<h2 style={styles.question}>{content}</h2>
				</Col>
				<Col xs={6}>
					<div style={styles.answers}>
						<button id={id1} className={'but1'} onClick={this.selectAnswer} style={styles.buttons} >A. {answer1}</button>
					</div>
				</Col>
				<Col xs={6}>
					<div style={styles.answers}>
						<button id={id2} className={'but2'} onClick={this.selectAnswer} style={styles.buttons} >B. {answer2}</button>
					</div>
				</Col>
				<Col xs={6}>
					<div style={styles.answers}>
						<button id={id3} className={'but3'} onClick={this.selectAnswer} style={styles.buttons} >C. {answer3}</button>
					</div>
				</Col>
				<Col xs={6}>
					<div style={styles.answers}>
						<button  id={id4} className={'but4'} onClick={this.selectAnswer} style={styles.buttons}>D. {answer4}</button>
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
