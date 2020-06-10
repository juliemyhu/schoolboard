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
const MY_API_KEY ='free_d6e794d268065566fd05b280ee'


const all_colleges = new Set()

$('#college-form').on('submit', (evt) => {
	evt.preventDefault();
	// alert("got the college, check the console");
	const college = $('#college').val();
	const API_URL = `https://api.collegeai.com/v1/api/college/info?api_key=${MY_API_KEY}&college_names=${college}&info_ids=city%2Clocation_lat%2Clocation_long%2Cstate_abbr`
	$.ajax({
		url: API_URL,
		type: "GET",
		success: function(result) {
			console.log("result:", result);
			console.log("result.success", result.success);
			console.log("result.colleges", result.colleges);
			console.log("result.colleges[0]", result.colleges[0]);

			for(let i = 0; i < result.colleges.length; i++) {
				const formData = {
					id: result.colleges[i].collegeUnitId,
					collegeName : result.colleges[i].name,
					lat : result.colleges[i].locationLat,
					long : result.colleges[i].locationLong,
					state : result.colleges[i].stateAbbr,
					city : result.colleges[i].city
				}
				$.post('/add-college', formData);
			}

			// collegeList is a list of colleges found by api.
		}, error: function(error) {
			console.log(error);
		}
	});


	if (!all_colleges.has(college)) {
		all_colleges.add(college);
		$('#college-result').append(`<div>${college}</div>`);
	} else alert("You already added this college")
});



// `https://api.collegeai.com/v1/api/autocomplete/colleges?api_key=${MY_API_KEY}&query=${college}`
// fetch("https://api.collegeai.com/v1/api/college/info?api_key=${MY_API_KEY}&college_names=${college}&info_ids=city%2Clocation_lat%2Clocation_long%2C")
//   .then(r => r.json())
//   .then(response => {
//     console.log(response)
//   })
const programForm = `
	<form id=new-program>
		<div>
		<label>Program:</label>
			<input type="text" name="program"></input>
		</div>
		<div>
		<label>College:</label>
			<input type="text" name= "college"></input>
		</div>
		<div>
		<label>Cohort</label>
			<input type="text" name="cohort"></input>
		</div>
		<div>
		<label>Link:</label>
			<input type="text" name="link"></input>
		</div>
		<div>
		<button id=submit-program type="button">Save</button>
		</div>
	</form>
`;

$('#program').on('click' ,() => {
	alert('you clicked the add program button');
	$('#program-form').html(programForm)
});
