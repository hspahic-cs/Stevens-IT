/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element.  
You will take in the text input , convert it to all lowercase and generate some text statistics based on the input.
You will calculate the following statistics based on the text:
Original Input: you will just show the input that the user entered (see below)
Total Letters: total number of letter characters in the text ,
Total Non-Letters: total number of non-letters in the text (including spaces),
Total Vowels: total number of vowels in the text (not counting y),
Total Consonants: total number of consonants in the text (counting y),
Total Words: total number of words in the text; a word is defined as any sequence of letters broken by any not-letter. For example, the phrase to-do is two words; a word does not start until a letter appears,
Unique Words: total number of unique words that appear in the lowercased text,
Long Words: number of words in the text that are 6 or more letters long; this is a total count of individual words, not unique words,
Short Words: number of words in the text that are 3 or less letters long; this is a total count of individual words, not unique words
This lab is easy to over-complicate by attempting to be too clever. I am giving two important pieces of advice:

You will generate the following HTML every time the application processes the text and append it to the results div.  
You will be using a data list element (dl), inside the dl, you will have a data title (dt) that has the title of the stat and then a data description (dd) which has the value. (see expected output below)

Here is the output based on the input: "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"
<dl>

  <dt>Original Input:</dt>

  <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

  <dt>Total Letters</dt>

  <dd>40</dd>

  <dt>Total Non-Letters</dt>

  <dd>27</dd>

  <dt>Total Vowels</dt>

  <dd>13</dd>

  <dt>Total Consonants</dt>

  <dd>26</dd>

  <dt>Total Words</dt>

  <dd>11</dd>

  <dt>Unique Words</dt>

  <dd>9</dd>

  <dt>Long Words</dt>

  <dd>3</dd>

  <dt>Short Words</dt>

  <dd>3.6363636363636362</dd>

</dl>
You will generate the above HTML and append it to the div every time the form is submitted, so you will have multiple data lists (dl) in the div, one for each time the user inputs and processes some text. So for example:

If the user submitted the following input and processed it:

1. "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"

2. "The quick brown fox jumps over the lazy dog."

3.  "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"

Your div would look like this:

<div id="results">

  <dl>

    <dt>Original Input:</dt>

    <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

    <dt>Total Letters</dt>

    <dd>40</dd>

    <dt>Total Non-Letters</dt>

    <dd>27</dd>

    <dt>Total Vowels</dt>

    <dd>13</dd>

    <dt>Total Consonants</dt>

    <dd>26</dd>

    <dt>Total Words</dt>

    <dd>11</dd>

    <dt>Unique Words</dt>

    <dd>9</dd>

    <dt>Long Words</dt>

    <dd>3</dd>

    <dt>Short Words</dt>

    <dd>6</dd>

  </dl>

  <dl>

    <dt>Original Input:</dt>

    <dd>The quick brown fox jumps over the lazy dog.</dd>

    <dt>Total Letters</dt>

    <dd>33</dd>

    <dt>Total Non-Letters</dt>

    <dd>9</dd>

    <dt>Total Vowels</dt>

    <dd>11</dd>

    <dt>Total Consonants</dt>

    <dd>24</dd>

    <dt>Total Words</dt>

    <dd>9</dd>

    <dt>Unique Words</dt>

    <dd>8</dd>

    <dt>Long Words</dt>

    <dd>0</dd>

    <dt>Short Words</dt>

    <dd>4</dd>

  </dl>

  <dl>

    <dt>Original Input:</dt>

    <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

    <dt>Total Letters</dt>

    <dd>40</dd>

    <dt>Total Non-Letters</dt>

    <dd>27</dd>

    <dt>Total Vowels</dt>

    <dd>13</dd>

    <dt>Total Consonants</dt>

    <dd>26</dd>

    <dt>Total Words</dt>

    <dd>11</dd>

    <dt>Unique Words</dt>

    <dd>9</dd>

    <dt>Long Words</dt>

    <dd>3</dd>

    <dt>Short Words</dt>

    <dd>6</dd>

  </dl>

</div>
If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of the error on the page. If the user enters bad data, you should not continue processing and instead inform them of the error on the page.


*/
let myForm = document.getElementById('main_form')
let results = document.getElementById('results')
let input = document.getElementById('text_input')
let login_error_msg = document.getElementById('error')


if(myForm){
  myForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(input.value.trim() === ""){
      input.value = ''
      error_msg.hidden = false
      error_msg.innerHTML = 'You must enter a value'
    }
    else if(input.value){
      let cleaned_data = input.value.toLowerCase()
      let dl = document.createElement('dl')
      
      let original_input = input.value
      let total_letters = cleaned_data.split("").filter(character => character.match(/[a-z]/)).length
      let total_non_letters = cleaned_data.split("").filter(character => character.match(/[^a-z]/)).length
      let total_vowels = cleaned_data.split("").filter(character => character.match(/[aeiou]/)).length
      let total_conosonants = total_letters - total_vowels
      
      let all_words = cleaned_data.split(/[^a-z]/).filter(word => word != "")
      let total_words = all_words.length
      let total_unique_words = [...new Set(all_words)].length
      let total_long_words = all_words.filter(word => word.length >= 6).length
      let total_short_words = all_words.filter(word => word.length <= 3).length

      let dt = document.createElement("dt")
      let dd = document.createElement("dd")
      let dtContent = document.createTextNode("Original Input:")
      let ddContent = document.createTextNode(original_input)
      dt.appendChild(dtContent)
      dd.appendChild(ddContent)
      dl.appendChild(dt)
      dl.appendChild(dd)
      
      dt = document.createElement("dt")
      dd = document.createElement("dd")
      dtContent = document.createTextNode("Total Letters")
      ddContent = document.createTextNode(total_letters)
      dt.appendChild(dtContent)
      dd.appendChild(ddContent)
      dl.appendChild(dt)
      dl.appendChild(dd)
      
      dt = document.createElement("dt")
      dd = document.createElement("dd")
      dtContent = document.createTextNode("Total Non-Letters")
      ddContent = document.createTextNode(total_non_letters)
      dt.appendChild(dtContent)
      dd.appendChild(ddContent)
      dl.appendChild(dt)
      dl.appendChild(dd)
      
      dt = document.createElement("dt")
      dd = document.createElement("dd")
      dtContent = document.createTextNode("Total Vowels")
      ddContent = document.createTextNode(total_vowels)
      dt.appendChild(dtContent)
      dd.appendChild(ddContent)
      dl.appendChild(dt)
      dl.appendChild(dd)

      dt = document.createElement("dt")
      dd = document.createElement("dd")
      dtContent = document.createTextNode("Total Consonants")
      ddContent = document.createTextNode(total_conosonants)
      dt.appendChild(dtContent)
      dd.appendChild(ddContent)
      dl.appendChild(dt)
      dl.appendChild(dd)

      dt = document.createElement("dt")
      dd = document.createElement("dd")
      dtContent = document.createTextNode("Total Words")
      ddContent = document.createTextNode(total_words)
      dt.appendChild(dtContent)
      dd.appendChild(ddContent)
      dl.appendChild(dt)
      dl.appendChild(dd)

      dt = document.createElement("dt")
      dd = document.createElement("dd")
      dtContent = document.createTextNode("Total Unique Words")
      ddContent = document.createTextNode(total_unique_words)
      dt.appendChild(dtContent)
      dd.appendChild(ddContent)
      dl.appendChild(dt)
      dl.appendChild(dd)

      dt = document.createElement("dt")
      dd = document.createElement("dd")
      dtContent = document.createTextNode("Total Long Words")
      ddContent = document.createTextNode(total_long_words)
      dt.appendChild(dtContent)
      dd.appendChild(ddContent)
      dl.appendChild(dt)
      dl.appendChild(dd)

      dt = document.createElement("dt")
      dd = document.createElement("dd")
      dtContent = document.createTextNode("Total Short Words")
      ddContent = document.createTextNode(total_short_words)
      dt.appendChild(dtContent)
      dd.appendChild(ddContent)
      dl.appendChild(dt)
      dl.appendChild(dd)

      results.append(dl)
      myForm.reset()
    } else{
      input.value = ''
      error_msg.hidden = false
      error_msg.innerHTML = 'You must enter a value'
    }
  })
}