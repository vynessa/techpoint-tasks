/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */

const classifier = (input) => {
  //Your code should go here
  const validateInput = () => {
    if(!Array.isArray(input)) {
      throw TypeError("Invalid Type. Please enter an Array");
    }
    return true;
  }

  const getStudentAge = (birthDay) => {
    const today = new Date();
    const birthDate = new Date(birthDay);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }

  const sortStudentsByAge = (input) => {
    const newInput = input.map((student) => {
      let studentObj = { ...student }
      studentObj.age = getStudentAge(student.dob);
      return studentObj;
    }).sort((prev, next) => 
      prev.age - next.age
    );

    return newInput
  }

  const groupMembersMetadata = (members) => {
    let group = {
      members: [],
      oldest: 0,
      sum: 0,
      regNos: []
    }

    members.map(student => { 
      group.members.push(student)
      group.oldest = Math.max(student.age)
      group.sum += student.age
      group.regNos.push(Number(student.regNo));
      group.regNos = group.regNos.sort(
                        (prev, next) => (prev - next)
                      )
    });

    return group
  }

  const sortStudentsInGroups = (currStudent, arrOfNextTwoStudents) => {
    const position1 = 0;
    const position2 = 1;

    const twoMembers = 2;
    const oneMember = 1;
    const noMember = -1;
 
    if ((arrOfNextTwoStudents[position2] 
          && arrOfNextTwoStudents[position2].age - currStudent.age) <= 5 ) {
      return twoMembers;
    }
    else if ((arrOfNextTwoStudents[position1] 
      && arrOfNextTwoStudents[position1].age - currStudent.age) <= 5 ) {
      return oneMember;
    }
    return noMember;
  }

  const groupData = (sortedData) => {
    let groupCount = 1
    let chunks = {};
    chunks.noOfGroups = 0;

    for(let c = 0; c < sortedData.length; c++) {
      chunks.noOfGroups = Object.keys(chunks).length
      const firstIndex = c + 1;
      const secondIndex = c + 2;
      const groupMembers = sortStudentsInGroups(sortedData[c], [ 
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
      if (input.length === 0)  { return { noOfGroups: 0 } }
      const sortedInput = sortStudentsByAge(input)
      return groupData(sortedInput);
    }
    catch(error) {
      throw error;
    }
  }

  return getClassifiedStudents(input)
};

module.exports = classifier;
