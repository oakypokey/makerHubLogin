$(document).ready(function(){
	let payload = ""; //where the userID is stored
	let recording = false;//whether or not the page is recording keystrokes
	alert("Press 'a1234b' and 'a5678b' to simulate the cardswiper. Card swiper values are in comments")
	$(this).keydown(function( event ) {
		event.preventDefault();//prevents default actions
  if (event.which == 65 /*53*/) { //when a is pressed, start recording and move to second page
		recording = true;
		window.location.href = "#secondPage"
		setTimeout(function(){
			window.location.href = "#3rdPage"
		},3000) //wait three seconds on this page: should probs be changed to wait for data
  } else if (event.which == 66 /*191*/){ //when b is pressed, stop recording, update card, reset
		console.log(payload);
		updateModal(payload);
		payload = "";
		recording = false;
		setTimeout(function(){
			window.location.href = "#firstPage"
		}, 9000); //wait 9 seconds on this page then go back to the beginning
	} else if (recording){
		payload += event.key; //add the keys that are pressed between "a" and "b"
	}
});
});

let updateModal = (userID) =>{
	let netID = search(userID); //give the user ID and returns data as a JSON about the user

	if(netID == "unknownUser"){
		window.location.href = "unknownUser.html"; //unknown user page that will prompts to see a staff member
	} else {																		 //this page then resets back to the original after a couple seconds

		$("#hero").css("background", "url('"+ netID.picturePath +"')"); //update the contact picture
		$("#username").text("Welcome " + netID.nameFirst + "!"); //update the name
		$("#visitCount").text(netID.visitCount);//update the visit count if that exists
		$("#skillCount").text(netID.skillCount);//update the skill count if that exists
	}

}

let search = (userID) =>{ //currently only returns dummy data and should be modified
	if(userID == "1234"){
		return {
			"ID":"cod11",
			"visitCount":"300",
			"skillCount":"12",
			"nameFirst":"Calvin",
			"picturePath":"imgs/cod11.jpg"
		}
	} else if(userID == "5678"){
		return {
			"ID":"cod11",
			"visitCount":"12",
			"skillCount":"500",
			"nameFirst":"Mike",
			"picturePath":"imgs/bg2.jpg"
		}
	} else {
		return "unknownUser";
	}
}
