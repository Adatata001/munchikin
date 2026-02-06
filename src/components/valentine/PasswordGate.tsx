import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import pookieBear from "@/assets/pookie-bear.png";

interface PasswordGateProps {
  onSuccess: () => void;
}

const PasswordGate = ({ onSuccess }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === "essence") {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="h-screen w-screen fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 overflow-hidden">
      <Card className="w-full max-w-md shadow-[0_0_30px_rgba(59,130,246,0.3)] border-primary/30 bg-primary/20 backdrop-blur-sm max-h-[90vh] overflow-auto">
        <CardContent className="pt-6 pb-6 flex flex-col items-center gap-4">
          <img 
            src={pookieBear} 
            alt="Pookie Bear" 
            className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-lg"
          />
          
          <h1 className="text-2xl font-bold text-primary text-center">
            What is the name of our perfume brand? 💙
          </h1>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`text-center text-lg ${error ? "border-destructive animate-pulse" : ""}`}
            />
            
            {error && (
              <p className="text-destructive text-center text-sm animate-fade-in">
                Hmm, that's not it... Try again! 💭
              </p>
            )}
            
            <Button 
              type="submit" 
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
            >
              Enter 💕
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGate;
