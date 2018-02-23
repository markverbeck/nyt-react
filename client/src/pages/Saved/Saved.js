import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
// import { Link } from "react-router-dom";

class Saved extends Component{
	state={
		articles:[]
	};
	componentDidMount(){
		this.articleLoad();
		
	}

	articleLoad = () =>{
		API.searchMongo()
		.then(res => this.setState({articles: res.data}))
		.catch(err => console.log(err));
	}

	articleDelete= id =>{
		API.delete(id)
		.then(res => this.articleLoad())
		.catch(err => console.log(err));
	}

render(){
	return(
		<Container>
		<Row>
				<div id="header" className="col-md-12">
					<h1 id="head" className="text-center">New York Times Search</h1> 
				</div>
				<div>
					<a id="savedLink" href="/" className="text-center">Search Page</a>
				</div>
		</Row>
		<Row>
		<div className="panel panel-default">
			<div className="background">Saved Articles</div>
			<div className="panel-body">{this.state.articles? this.state.articles.map((article, index) => 
				<div key ={index +7}>
				<div key={index + 5} className="well">
					<h2 key={index}><span key={index + 1} className="label label-primary">{index + 1}</span>
					<span key={index + 2}><button key={index + 3} onClick={() => this.articleDelete(article._id)} type="button" className="btn btn-danger button">Delete Article</button></span>
					  		{article.title}</h2>

					<h4 key={index + 4} className="snippet">{article.snippet}</h4>
					<a key={index + 5} href={article.url} target="_blank" >{article.url}</a> 
					  		
				</div>
			</div>) : <p>shucks</p>}</div>
		</div>
		</Row>
		</Container>);
    }
};

export default Saved;