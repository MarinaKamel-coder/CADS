import { SignUp } from "@clerk/clerk-react";
import "../styles/auth.css";

export default function SignUpPage() {
  return (
    <div className="auth-screen">
      <div className="auth-container">
        <SignUp
          routing="virtual"    
          signInUrl="/sign-in" 
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}