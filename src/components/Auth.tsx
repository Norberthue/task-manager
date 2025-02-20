import { useState } from "react";
import { signUp, login } from "../AuthService";

export default function Auth({ onAuthSuccess }: { onAuthSuccess: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleAuth = async () => {
        try {
            if (isSignUp) {
                await signUp(email, password);
            } else {
                await login(email, password);
            }
            onAuthSuccess();
        } catch (err) {
            setError("Authentication failed. Check your credentials.");
        }
    }

    return (
        <div className="p-4 max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-2">{isSignUp ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAuth} className="bg-blue-500 text-white p-2 w-full">
          {isSignUp ? "Sign Up" : "Login"}
        </button>
        <p
          className="text-sm text-blue-500 cursor-pointer mt-2"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
      </div>
  )
}
