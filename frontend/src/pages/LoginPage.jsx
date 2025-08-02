import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [isLoading, setisLoading] = useState(false)

  // to navigate to dashboard
  const navigate = useNavigate();

  // to handle form submission
  const handleSubmit = async()=>{}
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage