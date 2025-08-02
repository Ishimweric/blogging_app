import { useState } from "react"
import toast from "react-hot-toast"
const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async()=>{}
  return (
    <div>ResetPasswordPage</div>
  )
}

export default ResetPasswordPage