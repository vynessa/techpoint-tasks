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
      throw "Invalid Type. Please enter an Array";
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

  const sortGroups = (start, finish) => {
    if ((finish[1] && finish[1].age - start) < 5 ) {
      return 2;
    }
    if ((finish[0] && finish[0].age - start) < 5 ) {
      return 1;
    }
    return -1;
  }

  const groupData = (sortedData) => {
    let groupCount = 1
    let chunks = {};

    for(let c = 0; c < sortedData.length; c++) {
      chunks.noOfGroups = Object.keys(chunks).length
      const firstIndex = c + 1;
      const secondIndex = c + 2;
      const groupMembers = sortGroups(sortedData[c].age, [ 
                              sortedData[firstIndex], 
                              sortedData[secondIndex]
                            ]);
      if(groupMembers === 2) {
        data = [sortedData[c], sortedData[firstIndex], sortedData[secondIndex]];
        chunks[`group${groupCount++}`] = groupMembersMetadata(data)
        c += 2;
      }
      if(groupMembers === 1) {
        data = [sortedData[c], sortedData[firstIndex]];
        chunks[`group${groupCount++}`] = groupMembersMetadata(data)
        c +=1;
      } 
      if (groupMembers === -1) {  
        data = [sortedData[c]];
        chunks[`group${groupCount++}`] = groupMembersMetadata(data)
      }
    }
    return chunks
  }

  const getClassifiedStudents = (input) => {
    try {
      validateInput()
      if (input.length === 0)  { return {noOfGroups: 0} }
      const sortedInput = sortByAge(input)
      return groupData(sortedInput);
    }
    catch(error) {
      return error;
    }
  }

  return getClassifiedStudents(input)
};

classifier = JSON.stringify(classifier(input), null, 2);

module.exports = classifier;
