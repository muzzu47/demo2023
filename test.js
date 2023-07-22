function longestSubstringWithoutRepeatingCharacters(s){
    let maxLength = 0;
    let start = 0;
    let charMap = {};
       
    for(let i=0; i<=s.length;i++){
    const currentChar = s[i];
    console.log("What is currentChar",currentChar,charMap[currentChar],start,charMap);
    // console.log("What is this??",charMap[currentChar] >= start);
    
    if(charMap[currentChar] >= start) {
    start = charMap[currentChar] +1;
    // console.log("Is it coming inside??")
    }
    charMap[currentChar] = i;
    }
}



    const input = "abcabcbb";
    // un un un 0 1 2 4 
    // const input = "bbbbb";
      const result = longestSubstringWithoutRepeatingCharacters(input);
      console.log(result);