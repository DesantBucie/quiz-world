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
	selectAnswer = (e:any) => {
		this.setState({
		selectedAnswer:e.target.id
		})
		console.log(this.state.selectedAnswer);
	}
	/* sendId = () => {
		const selectedAnswer = this.state;
		console.log(selectedAnswer);
		axios.post(`https://localhost:44322/api/Test`, {selectedAnswer})
		.then (res => {
			console.log(res)
			console.log(res.data)
		})
		.catch(err =>{
			console.error("error: ", err);
			this.setState({
				error: `${err}`,
			});
		});
	};*/
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
			buttons: {
				width:"100%",
				'&:hover': {
					transition:'2s',
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
						<Button id='0' onClick={this.selectAnswer} style={styles.buttons}>A. {answer1}</Button>
					</div>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<Button id='1' onClick={this.selectAnswer} style={styles.buttons}>B. {answer2}</Button>
					</div>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<Button id='2' onClick={this.selectAnswer} style={styles.buttons}>C. {answer3}</Button>
					</div>
				</Col>
				<Col sm={6}>
					<div style={styles.answers}>
						<Button  id='3' onClick={this.selectAnswer} style={styles.buttons}>D. {answer4}</Button>
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