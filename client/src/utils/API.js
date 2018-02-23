import axios from "axios";

const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=";


export default {
	search: function(query){
		return axios.get(url + query);
	},
	save: function(articleData){
		return axios.post("/api/articles", articleData);
	},
	searchMongo: function(){
		return axios.get("/api/articles");
	},
	delete: function(id){
		return axios.delete("/api/articles/" + id);
	}
}