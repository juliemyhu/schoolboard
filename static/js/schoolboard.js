"use strict";

// $.ajax({
// 	url: "https://api.collegeai.com/v1/api/autocomplete/colleges?api_key=free_d6e794d268065566fd05b280ee&query=MIT",
// 	type: "GET",
// 	success: function(result) {
// 		console.log(result);
// 	}, error: function(error) {
// 		console.log(error);
// 	}
// })

// fetch("https://api.collegeai.com/v1/api/autocomplete/colleges?api_key=free_d6e794d268065566fd05b280ee&query=MIT")
//   .then(r => r.json())
//   .then(response => {
//     console.log(response)
//   })

$('#college-form').on('submit', (evt) => {
	evt.preventDefault();
	alert("hi");
	const formData = {
		college: $('#college').val()
	};
	console.log(formData);

	$.ajax({
		url: "https://api.collegeai.com/v1/api/autocomplete/colleges?api_key=free_d6e794d268065566fd05b280ee&query=MIT",
		type: "GET",
		success: function(result) {
			console.log(result);
		}, error: function(error) {
			console.log(error);
		}
	});
});