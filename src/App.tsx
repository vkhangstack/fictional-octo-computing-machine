/* eslint-disable @typescript-eslint/no-explicit-any */
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup } from "firebase/auth"
import "./App.css"
import { Button } from "./components/ui/button"
import { Card, CardTitle } from "./components/ui/card"
import { Provider, fbProvider, ggProvider, githubProvider, twitterProvider } from "./lib/provider"
import { FacebookIcon, GithubIcon, TwitterIcon, Youtube } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog"
import { ScrollArea } from "./components/ui/scroll-area"
import "react18-json-view/src/style.css"
import JsonView from "react18-json-view"
import { Textarea } from "./components/ui/textarea"

function App() {
  const [data, setData] = useState<any>()
  const [dialog, setDialog] = useState<boolean>(false)

  const ConfigSubmit = () => {
    const config: any = document.getElementById("config")
    const value = config?.value
    window.localStorage.setItem("config", value)
    window.location.reload()
  }

  const ChangeConfig = () => {
    window.localStorage.removeItem("config")
    window.location.reload()
  }

  let config = window.localStorage.getItem("config")
  if (!config) {
    return (
      <>
        <CardTitle className="pb-7">Enter your config</CardTitle>

        <Textarea name="config" id="config" className="h-[300px] text-sm" />
        <div className="pt-2">
          <Button className="text-white bg-sky-500" onClick={ConfigSubmit}>
            Submit
          </Button>
        </div>
      </>
    )
  }
  config = window.localStorage.getItem("config")
  const initialConfig = JSON.parse(config as string)

  const authConfig = Provider.getAuth(initialConfig)

  const Google = async () => {
    ggProvider.addScope("https://www.googleapis.com/auth/contacts.readonly")
    ggProvider.setDefaultLanguage("en")
    const result = await signInWithPopup(authConfig, ggProvider)

    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const data = {
      displayName: result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL,
      providerId: result.user.providerId,
      uid: result.user.uid,
      emailVerified: result.user.emailVerified,
      isAnonymous: result.user.isAnonymous,
      metadata: result.user.metadata,
      providerData: result.user.providerData,
      refreshToken: result.user.refreshToken,
      tenantId: result.user.tenantId,
      token,
    }
    setData(data)
    setDialog(true)
  }

  const Github = async () => {
    githubProvider.addScope("repo")
    githubProvider.setCustomParameters({
      allow_signup: "false",
    })
    const result = await signInWithPopup(authConfig, githubProvider)

    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const data = {
      displayName: result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL,
      providerId: result.user.providerId,
      uid: result.user.uid,
      emailVerified: result.user.emailVerified,
      isAnonymous: result.user.isAnonymous,
      metadata: result.user.metadata,
      providerData: result.user.providerData,
      refreshToken: result.user.refreshToken,
      tenantId: result.user.tenantId,
      token,
    }
    setData(data)
    setDialog(true)
  }

  const Facebook = async () => {
    fbProvider.setCustomParameters({
      display: "popup",
    })
    const result = await signInWithPopup(authConfig, fbProvider)

    const credential = FacebookAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const data = {
      displayName: result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL,
      providerId: result.user.providerId,
      uid: result.user.uid,
      emailVerified: result.user.emailVerified,
      isAnonymous: result.user.isAnonymous,
      metadata: result.user.metadata,
      providerData: result.user.providerData,
      refreshToken: result.user.refreshToken,
      tenantId: result.user.tenantId,
      token,
    }
    setData(data)
    setDialog(true)
  }

  const Twitter = async () => {
    twitterProvider.setCustomParameters({
      lang: "es",
    })
    const result = await signInWithPopup(authConfig, twitterProvider)

    const credential = TwitterAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const data = {
      displayName: result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL,
      providerId: result.user.providerId,
      uid: result.user.uid,
      emailVerified: result.user.emailVerified,
      isAnonymous: result.user.isAnonymous,
      metadata: result.user.metadata,
      providerData: result.user.providerData,
      refreshToken: result.user.refreshToken,
      tenantId: result.user.tenantId,
      token,
    }
    setData(data)
    setDialog(true)
  }

  if (dialog) {
    return (
      <Dialog>
        <DialogTrigger className="border-sky-500 border-solid">
          <Button>Open data</Button>
        </DialogTrigger>
        <Button
          onClick={() => {
            window.location.reload()
          }}
          className="m-2"
          variant="destructive">
          Back
        </Button>
        <DialogContent className="w-[900px]">
          <DialogHeader>
            <DialogTitle>Data detail from authorization social</DialogTitle>
          </DialogHeader>
          <DialogDescription className="break-all">
            <div>
              <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                <JsonView src={data} />
              </ScrollArea>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <CardTitle className="pb-7 text-indigo-400">Support Back-End get data from authorization social network</CardTitle>
      <Card className="h-[350px] flex justify-center items-center align-middle gap-8 border-cyan-500 shadow-cyan-800">
        <Button className="text-right absolute top-6 right-8 bg-red-400" onClick={ChangeConfig}>
          Change Config
        </Button>
        <Button variant="default" onClick={Google} className="gap-2 bg-green-400 hover:bg-green-300">
          Login with Google
          <Youtube />
        </Button>
        <Button variant="default" onClick={Github} className="gap-2 bg-slate-500 hover:bg-slate-400">
          Login with Github
          <GithubIcon />
        </Button>
        <Button variant="default" onClick={Twitter} className="gap-2 bg-sky-400 hover:bg-sky-300">
          Login with Twitter
          <TwitterIcon />
        </Button>
        <Button variant="default" onClick={Facebook} className="gap-2 bg-sky-800 hover:bg-sky-700">
          Login with Facebook
          <FacebookIcon />
        </Button>
      </Card>
      <div className="p-4">
        <a href="https://firebase.google.com/docs/auth?hl=en&authuser=0&_gl=1*149t435*_ga*NjY4OTU3NjM5LjE2OTI3MTk0MTk.*_ga_CW55HF8NVT*MTY5NDE2NjI4OS40LjEuMTY5NDE2NjMwMi4wLjAuMA..#multi-factor">
          <p className="text-sky-400">Learn more document</p>
        </a>
        <a href="https://phamvankhang.name.vn">
          <p className="text-purple-900">
            &copy; Copyright 2023 <strong>Phạm Văn Khang</strong>
          </p>
        </a>
      </div>
      <Card className="border-sky-300 h-[200px] text-center align-middle">Adsense area</Card>
    </>
  )
}

export default App
