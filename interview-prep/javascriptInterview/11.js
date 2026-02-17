function maxConsecutiveRepeating(str) {
    if (!str) return 0;
  
    let max = 1;
    let current = 1;
  
    for (let i = 1; i < str.length; i++) {
      if (str[i] === str[i - 1]) {
        current++;
        max = Math.max(max, current);
      } else {
        current = 1;
      }
    }
  
    return max;
  }
  function maxRepeatingCharacter(str){
    if(!str) return 0;
    let freq={};
    let max=0;
    for(let i=0; i<str.length; i++){
        console.log(str[i])
        freq[str[i]] = (freq[str[i]] || 0 ) + 1;
        max = Math.max(freq[str[i]], max);
    }
    return max
    console.log(freq);
  }
  console.log(maxRepeatingCharacter("acbcbcacbcc"));
//   console.log(maxConsecutiveRepeating("acbcbcacbcc"))