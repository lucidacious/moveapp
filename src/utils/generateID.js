const allowedCharacters = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

//firebase styled ids https://gist.github.com/mikelehen/3596a30bd69384624c11
const generateTime=()=>{

    const characters = new Array(8)
    let now = Date.now();
    for (let i = 7; i >= 0; i--) {
        characters[i] = allowedCharacters.charAt(now % 64);
        now = Math.floor(now / 64)
    }
    return characters.join('')

};
const generateRandom=()=>{
    const randomArray=[];
    for (let i = 0; i < 12; i++) {
        randomArray[i] = Math.floor(Math.random() * 64);
    }
   return randomArray.map((randy)=>allowedCharacters(randy))
};


const generateID=()=>{

    return generateTime()+generateRandom();

};
export default generateID