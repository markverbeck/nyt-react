import React, { Component } from "react";
// import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import "./Home.css";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Home extends Component{
	state={
		articles:[],
		search: "" 
	};

	componentDidMount(){
		this.articleLoad("poop");
		
	}

	articleLoad = (query) =>{
		API.search(query)
		.then(res => this.setState({articles: res.data.response.docs, search:""}))
		.catch(err => console.log(err));
	}
	handleInputChange = event =>{
		const name = event.target.name;
		const value = event.target.value;

		this.setState({[name]: value});
	}

	handleFormSubmit = event =>{
		event.preventDefault();
		API.search(this.state.search)
		.then(res =>this.setState({articles: res.data.response.docs, search:""}))
		.catch(err => console.log(err));
		
	}

	saveArticle = (i) =>{
		// event.preventDefault();
		API.save({
			title: this.state.articles[i].headline.main,
			snippet: this.state.articles[i].snippet,
			url: this.state.articles[i].web_url

		}).then(res => alert("Article Saved!!")).catch(err => console.log(err));
		
	}

render(){
	 console.log(this.state.articles);
	// {this.state.articles? this.state.articles.map(article =>(<p>{article.headline.main}</p>)) :
	// 				<p>no way dude</p>}
	return(
		<Container>
			<Row>
				<div id="header" className="col-md-12">
					<h1 id="head" className="text-center">New York Times Search</h1> 
				</div>
				<div>
					<a id="savedLink" href="/saved" className="text-center">Saved Articles</a>
				</div>
			</Row>
			<Row>
				
				<div className="panel panel-default">
					<div className="background">Search Articles</div>
					<div className="panel-body">
						<Input
			                value={this.state.search}
			                onChange={this.handleInputChange}
			                name="search"
			                placeholder="Enter search term."
			              />
			              <FormBtn disabled={!this.state.search} onClick={this.handleFormSubmit}>
			                Submit Article
			              </FormBtn>
					</div>
				</div>
			</Row>
			<Row>
				<div className="panel panel-default">
				  <div className="background">Top 10 Articles</div>
				  <div className="panel-body">{this.state.articles? this.state.articles.map((article, index) =>(
				  	<div key ={index +7}>
					  	<div key={index + 5} className="well">
					  		<h2 key={index}><span key={index + 1} className="label label-primary">{index + 1}</span>
					  		<span key={index + 2}><button key={index + 3} onClick={() => this.saveArticle(index)} type="button" className="btn btn-success button">Save Article</button></span>
					  		{article.headline.main}</h2>

					  		<h4 key={index + 4} className="snippet">{article.snippet}</h4>
					  		<a key={index + 5} href={article.web_url} target="_blank" >{article.web_url}</a> 
					  		
					  	</div>
				  	</div>)) :
					<p>no way dude</p>}</div>
				</div>
			</Row>
		</Container>
		);
};
};

export default Home;