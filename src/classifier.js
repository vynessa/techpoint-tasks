var input = require('./inputs/input')

/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */

const classifier = (input) => {
  //Your code should go here
  const validateInput = () => {
    if(!Array.isArray(input)) {
      throw"Invalid Type. Please enter an Array";
    }
    return true;
  }

  const getAge = (birthDay) => {
    var today = new Date();
    var birthDate = new Date(birthDay);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--
    } 
    return age;
  }

  const sortByAge = (input) => {
    Object.keys(input).forEach((student, index) => {
      input[student].age = getAge(input[student].dob)
      delete(input[student].dob);
    })
    return input.sort((prev, next) => {
      return prev.age - next.age;
    });
  }

  const groupMembersMetadata = (members) => {
    let group = {
      members: [],
      oldest: 0,
      sum: 0,
      regNos: []
    }
    members.forEach(student => { group.members.push(student) });
    membersAges = group.members.map((student) => student.age);
    group.oldest = Math.max(...membersAges);
    group.sum = membersAges.reduce((acc, cur) => (acc + cur));
    group.regNos = group.members.map((student) => student.regNo).sort(
      (prev, next) => (prev - next)
    );
    group.members.forEach(student => { 
      delete(student.regNo) });
    return group
  }
};

classifier = JSON.stringify(classifier(input), null, 2);

module.exports = classifier;
