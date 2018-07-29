var input = require('./inputs/input')

/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
const classifier = (input) => {
  // Your code should go here.

  const getAge = (birthDay) => {
    var today = new Date();
    var birthDate = new Date(birthDay);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  
  const sortAge = (input) => {
    Object.keys(input).forEach((student, index) => {
      input[student].age = getAge(input[student].dob)
    })
    return input.sort((prev, next) => {
      return prev.age - next.age;
    });
  }
}

module.exports = classifier;
