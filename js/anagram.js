// This is the Javascript page where the anagram checker is



// This is run every time the button is clicked. It 
function RunAnagramChecker(){
	// http://www.w3schools.com/jsref/met_doc_getelementbyid.asp
	// http://www.w3schools.com/jsref/dom_obj_text.asp
	var firstString = document.getElementById("FirstString").value;
	var secondString = document.getElementById("SecondString").value;
	var statusTextYes = "Yes this is an anagram";
	var statusTextNo = "No this is not an anagram";

	//Capital Check
	if(document.getElementById("CapCheck").checked == false){
		firstString = firstString.toLowerCase();
		secondString = secondString.toLowerCase();
	}

	//Run the IsAnagram Function 
	if (IsAnagram(firstString, secondString) == true){
		document.getElementById("Status").innerHTML = statusTextYes;
	}
	else{
		document.getElementById("Status").innerHTML = statusTextNo;
	}
}

// This function checks to see if the 2 strings are an anagram.
function IsAnagram(firstString, secondString){

	// http://www.w3schools.com/jsref/jsref_split.asp
	// Split the strings into arrays
	var firstArray = firstString.split('');
	var secondArray = secondString.split('');

	// If the arrays are different lenghts, return false immediately 
	if (firstArray.length != secondArray.length){
		// console.log("Array lengths don't match");
		return false;
	}

	// Sort the arrays 
	var firstArraySorted = firstArray.sort();
	var secondArraySorted = secondArray.sort();

	// Compare the arrays to check if they are the same 
	for (var i = 0; i < firstArraySorted.length; i++){
		if (firstArraySorted[i] != secondArraySorted[i]){
			// console.log("Some Character is wrong");
			return false;
		}
	}
	// console.log("it is true");
	return true;
}


