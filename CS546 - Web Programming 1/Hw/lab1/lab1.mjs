export const questionOne = (arr) => {
  let myObj = {}
  
  let cube_sum = arr.reduce((acc, cur) => acc + Math.pow(cur, 3), 0);

  let i = 2; 
  let upper_bound = Math.floor(Math.sqrt(cube_sum));

  while (i < upper_bound){
    if (cube_sum % i == 0){
      myObj[cube_sum] = false;
      return myObj;
    }
    i = i + 1;
  }

  myObj[cube_sum] = true;
  return myObj; 
};

export const questionTwo = (numArray) => {
  const result = [];
  const unsorted_arr = [...numArray]
  const sorted_arr = numArray.sort(function(x, y){return x - y});

  let last_index = unsorted_arr.length;
  let i = 0;

  while(i < last_index){
    if(unsorted_arr[i] != sorted_arr[i]){
      result.push(i)
      result.push(i+1)
      break
    }
    i= i+1
  }

  if(result.length != 0){
    result.splice(0, 0, false)
  } else{
    result.push(true)
  }

  return result;
};

export const questionThree = (obj1, obj2) => {
  // Implement question 3 here
  const result = {}

  for (let x in obj1){
    if(obj2[x]){
      result[x] = true
    } else{
      result[x] = false
    }
  }

  for (let x in obj2){
    if(!result[x]){
      result[x] = false
    }
  }

  return result;
};

export const questionFour = (string) => {
  return (string.split('\n')).map(x => x.split(','));
};

export const studentInfo = {
  firstName: 'Harris',
  lastName: 'Spahic',
  studentId: '10460436'
};
