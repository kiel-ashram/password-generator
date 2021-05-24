// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//variables for password criteria
var number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var specialChar = ["+", "-", "&", "|", "!", "(", ")", "{", "}", "[", "]", "^","~", "*", "?", ":", "\""];

//function to get a random item from an array
var getRandom = function (x) {
  var random = x[Math.floor(Math.random() * x.length)]
  return random;
}

var getNumber = getRandom(number)
var getLower = getRandom(lowerCase)
var getUpper = getRandom(upperCase)
var getSpecial = getRandom(specialChar)

//function to generate password
function generatePassword() {
  //prompt user to enter the length of the password between 8 and 128
  var passwordLength = prompt("How long would you like your password to be? Your password can be between 8 to 128 charactors long");
  passwordLength = parseInt(passwordLength)
  while (passwordLength==="" || passwordLength === null || passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    passwordLength = prompt("That's not a valid password length. Please choose a number between 8 and 128.")
  }
var lowerCaseConfirm = confirm("Would you like lowercase letters in your password?")
var upperCaseConfirm = confirm("Would you like uppercase letters in your password?")
var numberConfirm = confirm("Would you like numbers in your password?")
var specialConfirm = confirm("Would you like special characters in your password?")


//array of guaranteed characters (must include these based on user's answers to confirm questions)
var guaranteedChars = [];

//array of possible characters to include after guaranteed
var possibleChars = [];

//if statements to build possible char array based on users answers
if (lowerCaseConfirm) {
  possibleChars = possibleChars.concat(lowerCase);
  guaranteedChars.push(getLower);
}
if (upperCaseConfirm) {
  possibleChars = possibleChars.concat(upperCase);
  guaranteedChars.push(getUpper);
}
if (numberConfirm) {
  possibleChars = possibleChars.concat(number);
  guaranteedChars.push(getNumber);
}
if (specialConfirm) {
  possibleChars = possibleChars.concat(specialChar);
}

//password currently set to the guaranteed characters array
var password = guaranteedChars;

var totalLength = passwordLength - guaranteedChars.length

//for loop to grab the rest of the characters from possibleChars array, randomly
for (var i = 0; i < totalLength; i++) {
  password.push(getRandom(possibleChars))
}

//function to shuffle arrays
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//suffle password array so guaranteed chars are not at the front
shuffle(password);

//change password array into a string
var finalPassword = ""
for (var i = 0; i < password.length; i++) {
  finalPassword = finalPassword + password[i]
 }

//show user the password
return finalPassword;
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
