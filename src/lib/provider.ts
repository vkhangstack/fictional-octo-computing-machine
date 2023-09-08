import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, EmailAuthProvider, TwitterAuthProvider, getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"

const ggProvider = new GoogleAuthProvider()
const fbProvider = new FacebookAuthProvider()
const twitterProvider = new TwitterAuthProvider()
const githubProvider = new GithubAuthProvider()
const mailProvider = new EmailAuthProvider()

// Initialize Firebase Authentication and get a reference to the service
class Provider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getAuth(config: object) {
    const app = initializeApp(config)

    const auth = getAuth(app)
    return auth
  }
}

export { Provider, ggProvider, fbProvider, twitterProvider, githubProvider, mailProvider }
