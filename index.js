import './style.css';

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });
  $('#new-quote').click(getQuote);
});

let quotesData = [];

var colors = [
  '#cef2eb',
  '#cfe6d8',
  '#b0c4cf',
  '#ebd9be',
  '#e3d0cf',
  '#e0d1e3',
  '#e3cbca',
  '#ccbcbd',
  '#a8999c',
  '#cfcec0',
  '#b2bfbd',
  '#b5c2ae',
];

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json',
    },
    url: 'https://raw.githubusercontent.com/marlamalone/marlamalone.github.io/main/quotes-data-alltime-clean.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    },
  });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

let currentQuote, currentAuthor, currentLink, currentTitle, currentImgLink;

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.top_quote;
  currentAuthor = randomQuote.author_name;
  currentLink = randomQuote.link;
  currentTitle = randomQuote.title;
  currentImgLink = randomQuote.post_image;

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').html(randomQuote.top_quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author_name);
  });

  function openLink() {
    window.open(currentLink, '_blank');
  }

  $('.quote-title').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#title').html(currentTitle);
    $('#title').on('click', openLink);
  });

  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  var color = Math.floor(Math.random() * colors.length);
  $('body').css(
    {
      backgroundColor: colors[color],
      color: colors[color],
    },
    1000
  );
  $('.button').css(
    {
      backgroundColor: colors[color],
    },
    1000
  );
}
