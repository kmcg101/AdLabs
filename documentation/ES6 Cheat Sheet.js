//ES6 Cheat Sheet

//Filter with Fat Arrows

// the old way to create a new array with values based on a rule, <3
const array1 = [1,2,3]
const arrayFiltered = []
for (var i = 0; i<array1.length; i++){
    if(array1[i]<3){
        arrayFiltered.push(array1[i])
    }
}
console.log(arrayFiltered)

// a shorter way using filter which accepts a function as parameter
// filter, like map, will iterate through all the values of the array


const arrayFiltered2 = array1.filter(function(num) {
    return(
        // the interesting thing here is it is returning 
        // to the array that it is buiding, arrayFiltered2

        // so filter takes care of creating the new array
        // and stuffing elements into it
        num < 3
    )
})
console.log(arrayFiltered2)

// an even shorter way. using fat arrow allows you to remove function.  and because there is
// only one parameter it is ok to remove the parens around the parameter.
// also there is only one return line so the parens and return can be removed

const arrayFiltered3 = array1.filter((num) => {
    return(
        num<3
)})
console.log(arrayFiltered3)
    
const arrayFiltered4 = array1.filter(num => num<3)


//MAP with Fat Arrows
// filter goes through each array value and expects a T or F return for each
// and includes/excludes based on T or F
// MAP includes all but expects a transform for each
const animals = [
    {name: 'buddy', species: 'crab'},
    {name: 'pal', species: 'dog'},
    {name: 'nestor', species: 'cat'},
    {name: 'shar', species: 'cat'}
]

var animalNamesArray = []
for (var i = 0; i<animals.length; i++){
    animalNamesArray.push(animals[i].name)
}

var animalNamesArrayMap = animals.map(function(animal){
    return animal.name
})

// create new object.  returns array of single sentences
var animalNamesArrayMap = animals.map(function(animal){
    return animal.name + 'is a ' + animal.species
})

// with arrow function and return is just one line so don't need to write RETURN
var animalNamesArrayMap = animals.map((animal) => animal.name + 'is a ' + animal.species)

var animalNamesArrayMap = animals.map(animal => {
    return animal.name + 'is a ' + animal.species
} )
    
    

// but you want to create a new value pair
const myUsers = [
    { name: 'shark', likes: 'ocean' },
    { name: 'turtle', likes: 'pond' },
    { name: 'otter', likes: 'fish biscuits' }
]
const usersByLikes = myUsers.map(item => {
    const container = {};
    container.name = item.name;
    container.likes = item.likes;
    container.age = item.name.length * 10;
    return container;
})
console.log(usersByLikes);

//PROMISES

let p = new Promise((resolve, reject) => {
    let a = 1+1;
    if(a === 2){
        resolve("success")
    }
    else{
        reject('failed')
    }
})

p.then((message) => {
    console.log("p finished and the message is " + message)
})

.catch((message) => {
    console.log(" failed and the message is " + message)
})

/// multi promise and Promise all
let p1 = new Promise((resolve, reject) => {
    let a = 1+1;
    if(a === 2){
        resolve("success")
    }
    else{
        reject('failed')
    }
})

let p2 = new Promise((resolve, reject) => {
    let a = 1+1;
    if(a === 3){
        resolve("success")
    }
    else{
        reject('failed')
    }
})
let p3 = new Promise((resolve, reject) => {
    let a = 1+1;
    if(a === 2){
        resolve("success3")
    }
    else{
        reject('failed')
    }
})


Promise.all([p1, p2, p3])
.then((message) => {
	console.log("done ", message)
}).catch((message) => {
	console.log(message)
})




// load a blob with file reader, event and not promise
var fileReaderElevator = new FileReader();
    
fileReaderElevator.onload = (e) => {
  const arrayBufferElevator = e.target.result;
  
  const fileType = finalFileType;

  const blobElevator = new Blob([arrayBufferElevator], {
    type: fileType,
  });
 
};
fileReaderElevator.readAsArrayBuffer(elevatorFile.payload);

}