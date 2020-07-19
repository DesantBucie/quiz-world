import * as React from 'react';
import { connect } from 'react-redux';
import { Container,Row,Col } from 'reactstrap';
import { Spring } from 'react-spring/renderprops';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router';
import * as Category from '../../store/Category';

import './Quiz.scss';
/*
This code differs a little bit from the rest of the project, as it current state of 03.05.20.
There is a main class with variables stored inside state, no redux is used yet. 

loadData() - function which loads question and answers
sendIt() -function which sends selected answer

*/
type CategoryProps =
    Category.CategoryState &
    typeof Category.actionCreators &
	RouteComponentProps<{}>;
	
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
	allquestions?:any,
	currentquestion?:any;
	it:number,
};




export class Quiz extends React.Component<CategoryProps> {
	
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
		allquestions:[],
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
		const category = this.props.category;
		const apiLink = 'https://localhost:44322/api/Test/' + category; 
        await axios.get(apiLink)
        .then(res=> {
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
		const it = this.state.it;
		const all = this.state.allquestions[it];
		await this.setState({
			currentquestion: {
				category: all.category,
				id: all.id,
				content: all.question.content,
				answer1: all.question.answers[0].content,
				answer2: all.question.answers[1].content,
				answer3: all.question.answers[2].content,
				answer4: all.question.answers[3].content,
				id1: all.question.answers[0].id.toString(),
				id2: all.question.answers[1].id.toString(),
				id3: all.question.answers[2].id.toString(),
				id4: all.question.answers[3].id.toString(),
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
		const amount = this.state.allquestions.length - 1;
		// DEPRECATED
        if (it < amount - 1) {

			await this.setState({
				it : this.state.it + 1
			})
			this.currentQuestion();
		}
		else {
			await this.setState({
				redirect:true
			})
		}
       // !Possible later solution
       //const isTrue = ite < amount;
       //console.log(isTrue);
       // (isTrue ? await this.setState({it: this.state.it + 1}) && this.currentQuestion() :  await this.setState({redirect:true}));
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
			},	
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
				<button className="buttons" onClick={this.loadData}>Spróbuj ponownie!</button>
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
		<Container>
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
  </Container>
		</section>
		);
	};
}

export default connect(
	(state: ApplicationState) => state.category,
    Category.actionCreators
) (Quiz as any);