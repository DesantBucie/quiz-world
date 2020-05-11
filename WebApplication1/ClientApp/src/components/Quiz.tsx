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
	error: boolean
	seenquestion:{
		answer1:string,
		answer2:string, 
		answer3:string,
		answer4:string,
		id: number,
		category:string,
		question:string,
	},
	numer:number,
	question: {
		answers:[
			{
				id:any
			}
		]
	},
	response:string,
	iterator:number,
	redirect:boolean
};

export class Quiz extends React.Component<State> {
	
   	readonly  state : State = {
        loading: true,
		error: false,
        seenquestion:{
			answer1:'',
			answer2:'', 
			answer3:'',
			answer4:'',
			id:0,
			category: '',
			question:'',
		},
		numer:0,
		question: {
			answers:[
				{
					id:0,
				}
			]
		},
		response:'',
		iterator:0,
		redirect:false
	};

    loadData = () => {
		let it = this.state.iterator;
        this.setState({ loading: true });
        return axios.get(`https://localhost:44322/api/Test`)
        .then(result => {
			console.log(result.data[it])
            this.setState({
                loading: false,
				error: false,
				seenquestion: {
					category: result.data[it].category,
					id: result.data[it].id,
					question: result.data[it].question.content,
					answer1: result.data[it].question.answers[0].content,
					answer2: result.data[it].question.answers[1].content,
					answer3: result.data[it].question.answers[2].content,
					answer4: result.data[it].question.answers[3].content,
				}
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
			numer: parseInt(e.target.id)
		});
		await this.setState ({
			question:{
				answers:[
					{
						id:this.state.numer,
					}
				] 
			}	 
		});
		this.sendId();
	}
	sendId = async () => {
		const {question} = this.state;
		const id = this.state.seenquestion.id;
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
		});
		this.comeAndGetThem();
	};
	comeAndGetThem = async () => {
		await this.setState({
			iterator: this.state.iterator + 1
		})
		if (this.state.iterator < 5) {
			this.loadData();
		}
		else {
			await this.setState({
				iterator:0,
				redirect:true,
			});
		}
	}
	componentDidMount() {
		this.loadData();
    }
	render() {
		const {category, answer1, question, answer2, answer3, answer4, id } = this.state.seenquestion;
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
					<h2 style={styles.question}>{question}</h2>
				</Col>
				<Col xs={6}>
					<div style={styles.answers}>
						<button id='0' className={'but1'} onClick={this.selectAnswer} style={styles.buttons} >A. {answer1}</button>
					</div>
				</Col>
				<Col xs={6}>
					<div style={styles.answers}>
						<button id='1' className={'but2'} onClick={this.selectAnswer} style={styles.buttons} >B. {answer2}</button>
					</div>
				</Col>
				<Col xs={6}>
					<div style={styles.answers}>
						<button id='2' className={'but3'} onClick={this.selectAnswer} style={styles.buttons} >C. {answer3}</button>
					</div>
				</Col>
				<Col xs={6}>
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
