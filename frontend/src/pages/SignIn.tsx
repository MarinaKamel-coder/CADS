import { SignIn } from "@clerk/clerk-react";
import "../styles/auth.css";

export default function SignInPage() {
  return (
    <div className="auth-screen">
      <div className="auth-container">
        <SignIn
          routing="virtual"    
          signUpUrl="/sign-up" 
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}