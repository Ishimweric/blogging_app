import { useState } from 'react'

const SignupPage = () => {
  // declare state controllers
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassord] = useState("");
  const [isLoading, setisLoading] = useState(false)

  // define handle submit function
  const handleSubmit = ()=>{}
  return (
    <section className="min-h-screen bg-gray-100 flex flex-col justify-center p-4">
      <div className="p-8 bg-white rounded-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">NoteDown</h2>
        <form></form>
      </div>
    </section>
  )
}

export default SignupPage