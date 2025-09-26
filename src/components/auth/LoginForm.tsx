// src/components/auth/LoginForm.tsx
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSwitch: () => void;
}

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      
      // On success, the AuthWrapper in App.tsx handles the full page redirect.
      toast({ title: 'Login successful! Redirecting...', duration: 1500 });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown login error occurred.';
      toast({ title: "Login Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="text-center">
          <h2 className="text-3xl font-bold text-nature">Welcome Back</h2>
          <p className="text-sm text-muted-foreground">Sign in to continue your journey planning.</p>
      </div>

      <div className="flex items-center space-x-2 border rounded-lg p-2">
        <Mail className="h-5 w-5 text-muted-foreground" />
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-0 focus:ring-0 shadow-none px-0"
        />
      </div>
      <div className="flex items-center space-x-2 border rounded-lg p-2">
        <Lock className="h-5 w-5 text-muted-foreground" />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-0 focus:ring-0 shadow-none px-0"
        />
      </div>

      <Button type="submit" className="w-full bg-nature hover:bg-nature/90" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging In...
          </>
        ) : (
          'Login'
        )}
      </Button>
      
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don't have an account?
        <Button 
          variant="link" 
          onClick={onSwitch}
          className="p-1 h-auto text-cultural hover:text-cultural/80"
        >
          Register
        </Button>
      </p>
    </form>
  );
}