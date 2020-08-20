import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router';
import * as Category from '../../store/Category';

import Loading from '../Shared/Loading';
import '../../scss/components/Quiz.scss';

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
		const apiLink = '/api/Test/' + category;
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
		await axios.post(`/api/Test`, {id,question})
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
    	//it < amount -1 ? await this.setState({it: this.state.it + 1}) && this.currentQuestion() :  await this.setState({redirect:true})
	}
	componentDidMount() {
		this.loadData();
	}
	
	render() {
		const {category, answer1, content, answer2, answer3, answer4,id1,id2,id3,id4,id} = this.state.currentquestion;
		const {redirect,loading, error} = this.state;
		if (loading) { return <Loading/>}
		if (error) {
			return (
				<p>
				Wystąpił problem podczas ładowania{" "}<br/>
				<button className="home__button" onClick={this.loadData}>Spróbuj ponownie!</button>
				</p>
			);
		}
		if (redirect){return <Redirect to="/summary"/>}
		return (
		<section>
		
			<div className="quiz__top">
					<p>Kategoria: {category}</p>
					<p className="quiz__id">ID z bazy danych: {id}</p>
					<h2 className="quiz__question">{content}</h2>
					<div className="quiz__answers">
						<button id={id1} className={'quiz__buttons quiz__buttons--but1'} onClick={this.selectAnswer}>A. {answer1}</button>
					</div>
					<div className="quiz__answers">
						<button id={id2} className={'quiz__buttons quiz__buttons--but2'} onClick={this.selectAnswer}>B. {answer2}</button>
					</div>
					<div className="quiz__answers">
						<button id={id3} className={'quiz__buttons quiz__buttons--but3'} onClick={this.selectAnswer}>C. {answer3}</button>
					</div>
					<div className="quiz__answers">
						<button  id={id4} className={'quiz__buttons quiz__buttons--but4'} onClick={this.selectAnswer}>D. {answer4}</button>
					</div>
			</div>
		</section>
		);
	};
}

export default connect(
	(state: ApplicationState) => state.category,
    Category.actionCreators
) (Quiz as any);
