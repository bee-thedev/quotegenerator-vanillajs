const quoteText = document.querySelector(".quote");

quoteButton = document.querySelector("button");
authorName = document.querySelector(".quoteAuthor");
speechButton = document.querySelector(".quoteSpeech");
copyButton = document.querySelector(".quoteCopy");
twitterButton = document.querySelector(".twitter");
const apiurl = "https://goquotes-api.herokuapp.com/api/v1/random?count=200";

// const apiurl ="http://api.quotable.io/random";

synth = speechSynthesis;

function fetchQuote(){
    quoteButton.classList.add("loading");
    quoteButton.innerText = "Loading Quote ....";
    fetch(apiurl)
    .then((response=>response.json())).then(result=>
        result.quotes.forEach((data)=> {
            quoteText.innerText = data.text;
            authorName.innerText = data.author;
            quoteButton.classList.remove("loading");
            quoteButton.innerText = "New Quote";
        }))
}
    
// ----Text to Speech(synthesis) Function 

speechButton.addEventListener("click",()=>{
    if(!quoteButton.classList.contains("loading")){
            let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`)
            synth.speak(utterance);
            setInterval(()=>{
                !synth.speak ? speechButton.classList.remove("active") : speechButton.classList.add("active"); 
            }, 10)
        }
    }
)


// ----- Copy to clipboard 

copyButton.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

// ----- Twitter Retweet

twitterButton.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
})

// --- Running the Function 


quoteButton.addEventListener("click", fetchQuote);