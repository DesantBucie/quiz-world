import * as React from 'react';
import {} from 'react-dom';
import { connect } from 'react-redux';
import { Container,Row,Col, Button,} from 'reactstrap';
import {Spring} from 'react-spring/renderprops';
import axios from 'axios';
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
class Quiz extends React.Component {

    state = {
        loading: true,
        error: "",
        data: null,
        category: null,
        question:null,
        answer1:null,
        answer2:null, 
        answer3:null,
		answer4:null,
		id: null,
		correctAnswer:null,
		iterator:0,
		selectedAnswer:null,
      };

    loadData = () => {
        this.setState({ loading: true });
        return axios.get(`https://localhost:44322/api/Test`)
        .then(result => {
            console.log(result);
            this.setState({
                data: result.data[0],
                loading: false,
                error: false,
				category: result.data[0].category,
				id: result.data[0].id,
                question: result.data[0].question.content,
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
	selectAnswer1 = () => {
		this.setState({
			selectedAnswer:0
		})
		this.sendId();
	}
	selectAnswer2 = () => {
		this.setState({
			selectedAnswer:1
		})
		this.sendId();
	}
	selectAnswer3 = () => {
		this.setState({
			selectedAnswer:2
		})
		this.sendId();

	}
	selectAnswer4 = () => {
		this.setState({
			selectedAnswer:3
		})
		this.sendId();
	}
	sendId = () => {
		const selectedAnswer = this.state;
		/*axios.post(`https://localhost:44322/api/Test`, {selectedAnswer})
		.catch(err =>{
			console.error("error: ", err);
			this.setState({
				error: `${err}`,
			});
		});*/
		console.log(selectedAnswer);
	};
    componentDidMount() {
		this.loadData();
    }

	render() {
		const { loading, error, category, answer1, question, answer2, answer3, answer4, id } = this.state;
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
			button1: {
				width:"100%",
				backgroundColor:"#ffe5ac",
				'&:hover': {
					transition:'1s',
					color:'green'
				}

			},
			button2: {
				width:"100%",
				backgroundColor:"#caacff",
				'&:hover': {
					transition:'1s',
					color:'green'
				}

			},
			button3: {
				width:"100%",
				backgroundColor:"#fface1",
				'&:hover': {
					transition:'1s',
					color:'green'
				}

			},
			button4: {
				width:"100%",
				backgroundColor:"#e1ffac",
				'&:hover': {
					transition:'1s',
					color:'green'
				}

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
				<Col sm={12}>
					<p>{category}</p>
					<h2>{question}</h2>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<button id='0' onClick={this.selectAnswer1} style={styles.button1} >A. {answer1}</button>
					</div>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<button id='1' onClick={this.selectAnswer2} style={styles.button2} >B. {answer2}</button>
					</div>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<button id='2' onClick={this.selectAnswer3} style={styles.button3} >C. {answer3}</button>
					</div>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<button  id='3' onClick={this.selectAnswer4} style={styles.button4}>D. {answer4}</button>
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