import * as React from 'react';
import { connect } from 'react-redux';
import { Container,Row,Col, Button } from 'reactstrap';
import axios from 'axios';

class Quiz extends React.Component {
    state = {
        loading: true,
        error: "",
        data: null,
        category: null,
        answer1:null,
        question:null,
        answer2:null,
        answer3:null,
        answer4:null,
      };
      loadData = () => {
        this.setState({ loading: true });
        return axios
          .get(`https://localhost:44322/api/Test`)
          .then(result => {
            console.log(result);
            this.setState({
              data: result.data[0],
              loading: false,
              error: false,
              category: result.data[0].category,
              question: result.data[0].question.content,
              answer1: result.data[0].question.answers[0].content,
              answer2: result.data[0].question.answers[1].content,
              answer3: result.data[0].question.answers[2].content,
              answer4: result.data[0].question.answers[3].content,
              
            });
          })
          .catch(error => {
            console.error("error: ", error);
            this.setState({
              error: `${error}`,
              loading: false
            });
          });
      };
      componentDidMount() {
        this.loadData();
      }
render() {
    const { loading, error, data, category, answer1, question, answer2, answer3, answer4 } = this.state;
    if (loading) {
      return <p>Loading ...</p>;
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
            marginBottom:"20px",
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
    <Container>
        <Row>
            <Col sm={12}>
                <p>{category}</p>
                <h2>{question}</h2>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>A. {answer1}</Button>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>B. {answer2}</Button>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>C. {answer3}</Button>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>D. {answer4}</Button>
                </div>
            </Col>
        </Row>
    </Container> 
    </section>
        );
    };
}

export default connect() (Quiz);