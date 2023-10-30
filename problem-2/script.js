const fetchData = async (endpoint) => {
    try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
    const data = await response.json();
    return data;
    } catch (error) {
      console.error(error);
    }
  };
//Getting titles containing more than 6 words
  const getTitlesContainingMoreThanSixWords = async () => {
  const posts = await fetchData('posts');
  
  const titlesWithMoreThanSixWords = posts
  .filter(post => post.title.split(' ').length > 6)
  .map(post => post.title);
  
  console.log("Output titles with more than six words:");
  console.log(titlesWithMoreThanSixWords);
  };
  
//word frequency map
const getWordFrequencyMap = async () => {
const posts = await fetchData('posts');
  
const bodyText = posts
.map(post => post.body)
.join(' '); //Merge all text into a single string
  
const words = bodyText
.toLowerCase()
.match(/\b\w+\b/g);
  
const wordFrequencyMap = words.reduce((map, word) => {
map[word] = (map[word] || 0) + 1;
return map;
}, {});
  
console.log("Word frequency map:");
console.log(wordFrequencyMap);
};
//call functions
getTitlesContainingMoreThanSixWords();
getWordFrequencyMap();
  
