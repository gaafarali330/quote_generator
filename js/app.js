// get today date date
const date = new Date();
let appTitle = document.querySelector('.app-title span');;
appTitle.textContent += date.toDateString();

// get the paragraph and next button and author
let qoutePara = document.querySelector('.the-quote'),
    next_qoute = document.querySelector('.next-quote'),
    author = document.querySelector('.author'),
    readBtn = document.querySelector('.sound'),
    copyBtn = document.querySelector('.copy'),
    tweetBtn = document.querySelector('.twitter');


// define function to get random quote
function getRandomQuote() {
    next_qoute.classList.add('loading');
    next_qoute.textContent = 'loading...'
    qoutePara.textContent = 'loading qoute ...'
    fetch('https://api.quotable.io/random').then(res => res.json().then(qoute => {
        qoutePara.textContent = qoute.content;
        author.textContent = `- ${qoute.author}`;
        next_qoute.textContent = 'next';
        next_qoute.classList.remove('loading');
    }));
}
// read the quote
readBtn.addEventListener('click', () => {
    let utterance = new SpeechSynthesisUtterance(`${qoutePara.textContent} by ${author.textContent}`);
    speechSynthesis.speak(utterance);


});

// copy quote to the clipboard
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(qoutePara.textContent)
});

// share on twitter
tweetBtn.addEventListener('click', () => {
    let tweet_url = `https://twitter.com/intent/tweet/?url=${qoutePara.textContent}`;
    window.open(tweet_url, '_blank');
});

getRandomQuote()

next_qoute.addEventListener('click', getRandomQuote);