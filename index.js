document.addEventListener("DOMContentLoaded", function (){

    //ERRORS SEEM TO OCCUR DUE TO HASH SYMBOL (#) IN IMAGE URLs.
    fetch(`http://localhost:3000/heros`)
    .then((r)=> r.json())
    .then((heros) => {
        heros.forEach((eachHero)=>{
            //Define array to assign Most Wanted individual to with info.
            let criminallyNestedArray = [[],[],[],[],[],[],[],[],[],[]]
            const inputField = document.createElement("input")
            const subBody = document.createElement("div")
            const forShuffle = document.getElementById("forShuffle")
            const submitButton = document.createElement("button")
            const submitButtonDiv = document.createElement("div")
            let finalArray = []
            submitButton.innerText = "Submit Tasteful, Politically Correct Mad Lib"
            submitButton.classList.fontSize = "small"
            const body = document.querySelector("body")
            const imageHTML = document.createElement("img")
            const nameHTML = document.createElement("p")

            //This for loop assigns hero info from JSON to criminallyNestedArray.
            for(let i = 0; i < heros.length; i++){
               

                    criminallyNestedArray[i].push(eachHero.image)
                    console.log(criminallyNestedArray[i][0])
                    criminallyNestedArray[i].push(eachHero.name)
    
                    criminallyNestedArray[i].push(eachHero.bio)

                
                }
           
    
        //Determines random hero
        function rando (array){
            let randomNumber = Math.floor(Math.random() * 15)
            return array[randomNumber]
        }
    
        //Render the current hero within the DOM
        function renderRando(randomCriminal){
            let imageHTML = document.createElement("img")
            
            console.log("0 :" + randomCriminal[0])
            console.log("1 :" + randomCriminal[1])
            console.log("2 :" + randomCriminal[2])
            imageHTML.src = randomCriminal[0]
            body.appendChild(imageHTML)
            
            let nameHTML = document.createElement("p")
            nameHTML.innerText = randomCriminal[1]
            nameHTML.style.fontSize = "x-large"
            body.appendChild(nameHTML)
        
            // If the bio has HTML, use this spot to remove it.  let tempString = removeHTML()

            let tempString = randomCriminal[2]
            
            removeWord(tempString)

            finalFunction()
    
        }
    
        //NEXT ----> CREATE BUTTON TO SHUFFLE TO DIFFERENT CRIMINAL
        function doTheCriminalShuffle (){
            const shuffle = document.createElement("button")
            shuffle.innerText = "This one's too dirty for me."
            shuffle.fontSize = "Large"
            
    
            shuffle.addEventListener("click",(e)=>{
                
                const imageHTML = document.querySelector("img")
                const nameHTML = document.querySelectorAll("p")[0]
                const spans = document.querySelectorAll("span")
                const inputs = document.querySelectorAll("input")
                
                subBody.innerHTML = ""
                imageHTML.remove()
                nameHTML.remove()
                shuffle.remove()
             
                for (let i = 0; i < spans.length; i++){
                    spans[i].remove()
                }

                 //Random hero assigned to variable
                 randomCriminal = rando(criminallyNestedArray)
                //  console.log(randomCriminal[0])
                //  console.log(randomCriminal[1])
                //  console.log(randomCriminal[2])

                 //call the function to append info to DOM
                renderRando(randomCriminal)
                
                body.appendChild(shuffle)

                subBody.appendChild(submitButtonDiv)
                submitButtonDiv.appendChild(submitButton)
    
            })
            body.appendChild(shuffle)
            finalFunction()
        }
    
        //Random hero assigned to variable
        let randomCriminal = rando(criminallyNestedArray)
    
        //This function is used to remove HTML elements 
        // function removeHTML(){
        //     let newString = ""
        //     let tagCounter = 0
        //     //WORKING HERE 
        //     for(let i = 0; i < randomCriminal[2].length; i++) {
        //         if(randomCriminal[2][i] === "<"){
        //             tagCounter++
        //         }
        //         if(randomCriminal[2][i] === ">"){
        //             i = i + tagCounter  - 2
        //             tagCounter = 0
        //         }
        //         if(randomCriminal[2][i] != "<" && randomCriminal[2][i] != ">" && tagCounter === 0 && randomCriminal[2][i] != undefined){
        //             newString += randomCriminal[2][i]
        //         }
        //         else {
        //             tagCounter++
        //         }
        //     }
        //     return newString
        // }
    
        //call the function to append info to DOM
        renderRando(randomCriminal)
    
        //Call the shuffle button in case the user doesn't like the criminal they're paired with.
        doTheCriminalShuffle()
    
        //Calculate random true or false based on length of string
        function  calculateRandom(){
            //The chances of a word being replaced should be 1 in 15 for an aimicable user experience.
            let randomNumber = Math.floor(Math.random() * 11)
            if(randomNumber === 1){
                return true
            }
            else {
                return false
            }
        }
    
        //Removes a word at random, inserts user input field.
        function removeWord (tempString) {
            let newArray = tempString.split(" ")
            const keyWord = "keyWord"
            body.appendChild(subBody)
            
            for(let i = 0; i < (newArray.length) / 15; i++){
                
                let randomI = Math.floor(Math.random() * newArray.length)
                newArray.splice(randomI, 1, keyWord)
                
                randomI = 0
            }
    
            let newString = newArray.join(" ")
            for(let i = 0; i < newArray.length; i++) {
                if(newArray[i] === "keyWord") {
                    const test = document.createElement("input")
                    test.type = "text"
                    test.name = "input"
                    const inputSpan = document.createElement("span")
                    
                    subBody.appendChild(inputSpan)
                    inputSpan.appendChild(test)
                }
                else {     
                    const test = document.createElement("span")
                    test.innerText = newArray[i] + " "
                    subBody.appendChild(test)
                     }
            }

            finalArray = newArray.slice()

            for(let i = 0; i < newArray.length; i++){
                newArray[i] = ""
            }
        }

        subBody.appendChild(submitButtonDiv)
        submitButtonDiv.appendChild(submitButton)

        submitButton.addEventListener("dblclick",(e)=>{
            e.preventDefault()

            //CREATE PUSH TO DB.JSON TO SAVE MADLIB
         //WIPE FORM, BRING UP ALERT THAT SAYS, FORM SAVED!

         alert("Crime doesn't pay!!")
        
        })


        function finalFunction(){
        let theImage = document.querySelector("img")
        theImage.addEventListener("mouseover", ()=>{
            theImage.title = "Roast 'em!"
        })
    }
  
            //End forEach for each criminal
        })
        //End second .then
    })
    //end DOM content loaded listener
    })
   
