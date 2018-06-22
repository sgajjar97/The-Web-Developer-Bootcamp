var movieDB = [ 
	{ 
		title: "Raid", 
		rating: 4,
		hasWatched: true 

	}, 
	{
		title: "Deadpool", 
		rating: 4.5,
		hasWatched: true
	}
];

movieDB.forEach(function(movie) {
	var result = "You have ";
	if (movieDB.hasWatched) {
		result += "watched ";
	} else {
		result += "not seen ";
	}
	result += "\"" + movieDB.title + "\" - ";
	result += movieDB.rating + " stars";
	console.log(result);
});  