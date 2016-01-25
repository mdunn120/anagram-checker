// This is the Javascript page where the anagram checker is



// This is run every time the button is clicked. It 
function RunAnagramChecker(){
	// http://www.w3schools.com/jsref/met_doc_getelementbyid.asp
	// http://www.w3schools.com/jsref/dom_obj_text.asp
	var firstString = document.getElementById("FirstString").value;
	var secondString = document.getElementById("SecondString").value;
	var statusTextYes = "Yes this is an anagram";
	var statusTextNo = "No this is not an anagram";
	var statusTextNoYG = "No this is not an anagram even though the strings may have the same unicode values. The backslash (U+005c) character in Japanese and Korean fonts contains the Yen and Won symbol and not a backslash. "

	// Edge Case: Yen\Won issue 
	if (document.getElementById("YuGothic").checked == true){
		// Check to see if there is a backslash 
		if (firstString.indexOf("\\") > -1 & secondString.indexOf("\\") > -1){
			document.getElementById("Status").innerHTML = statusTextNoYG;
			return;
		}
	}

	// Edge Case: Capital Check
	if (document.getElementById("CapCheck").checked == false){
		firstString = firstString.toLowerCase();
		secondString = secondString.toLowerCase();
	}
	

	// Switch between the Hash and Sorting functions (specifically looking at the checkbox)
	if (document.getElementById("sort").checked == true){
		// Run the IsAnagram Function 
		console.log("Sort is called")
		if (IsAnagramSort(firstString, secondString) == true){
			document.getElementById("Status").innerHTML = statusTextYes;
		}
		else {
			document.getElementById("Status").innerHTML = statusTextNo;
		}
	}
	else {
		console.log("Hash is called")
		if (IsAnagramHash(firstString, secondString) == true){
			document.getElementById("Status").innerHTML = statusTextYes;
		}
		else {
			document.getElementById("Status").innerHTML = statusTextNo;
		}
	}
}

// This function checks to see if the 2 strings are an anagram.
function IsAnagramSort(firstString, secondString){

	// http://www.w3schools.com/jsref/jsref_split.asp
	// Split the strings into arrays
	var firstArray = firstString.split('');
	var secondArray = secondString.split('');

	// If the arrays are different lenghts, return false immediately 
	if (firstArray.length != secondArray.length){
		// console.log("Array lengths don't match");
		return false;
	}

	// If the strings are empty return false immediatly. 
	// At this point they are the same length, and it is enough to just check 
	// the length of the first string. 
	if (firstArray.length == 0){
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

// This will use CreateHash and CheckString2AgainstHash1
function IsAnagramHash(firstString, secondString){
	var secondArray = secondString.split('');
	var hashMap = CreateHash(firstString);

	for(var i = 0; i < secondArray.length; i++){
		// Assign the LetterKey variable to be the ith element of the firstArray
		letterKey = secondArray[i];

		// Check to see if the LetterKey is found at all. If it is undefined return false 
		if (hashMap[letterKey] == undefined){
			return false;
		}

		else {
			hashMap[letterKey] = hashMap[letterKey] - 1;
			if (hashMap[letterKey] == 0){
				// http://stackoverflow.com/questions/6295087/how-to-remove-item-from-a-javascript-object
				delete hashMap[letterKey];
			}
		}
	}
	// http://stackoverflow.com/questions/3068534/getting-javascript-object-key-list
	if (Object.keys(hashMap).length == 0){
		return true;
	}
	else {
		return false;
	}
}

// Create a hash for String1
function CreateHash(firstString){

	var firstArray = firstString.split('');
	var hashMap = {};

	// http://blog.xkoder.com/2008/07/10/javascript-associative-arrays-demystified/
	for (var i = 0; i < firstArray.length; i++) {
		// Assign the letterKey variable to be the ith element of the firstArray
		letterKey = firstArray[i];
		if (hashMap[letterKey] == undefined){
			// Add letterKey to hashMap
			// Set CountValue to 1
			hashMap[letterKey] = 1;
		}
		else {
	     	hashMap[letterKey] = hashMap[letterKey] + 1;
	 	}
	}
	return hashMap; 
}
