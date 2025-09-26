// src/components/auth/RegisterForm.tsx
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Mail, Lock } from 'lucide-react';

interface RegisterFormProps {
  onSwitch: () => void;
}

export default function RegisterForm({ onSwitch }: RegisterFormProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;
      
      let successMessage = '';
      if (data.user) {
        successMessage = 'Registration successful! Please check your email for a confirmation link.';
      } else {
        successMessage = 'Registration pending. Please check your email for confirmation.';
      }

      toast({ title: successMessage, duration: 4000 });
      
      // Optionally switch to login screen after successful signup prompt
      onSwitch(); 

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown registration error occurred.';
      toast({ title: "Registration Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="text-center">
          <h2 className="text-3xl font-bold text-cultural">Create Your Account</h2>
          <p className="text-sm text-muted-foreground">Start planning your sustainable journey today.</p>
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
            Signing Up...
          </>
        ) : (
          'Register'
        )}
      </Button>
      
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?
        <Button 
          variant="link" 
          onClick={onSwitch}
          className="p-1 h-auto text-cultural hover:text-cultural/80"
        >
          Login
        </Button>
      </p>
    </form>
  );
}