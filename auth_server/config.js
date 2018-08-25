const providers = ['twitter', 'google']

const callbacks = providers.map(provider => {
  return `http://127.0.0.1:8080/${provider}/callback`
})

// const [twitterURL, googleURL, githubURL] = callbacks
const [twitterURL, googleURL] = callbacks

exports.CLIENT_ORIGIN = 'http://localhost:3000'
console.log(twitterURL);
exports.TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: twitterURL,
}
console.log(googleURL);
exports.GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: googleURL
}

// exports.GITHUB_CONFIG = {
//   clientID: process.env.GITHUB_KEY,
//   clientSecret: process.env.GITHUB_SECRET,
//   callbackURL: githubURL
// }
