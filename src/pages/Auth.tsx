// src/pages/Auth.tsx (MODIFIED FILE)
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// Assuming these are now in src/components/auth/
import RegisterForm from '@/components/auth/RegisterForm'; 
import LoginForm from '@/components/auth/LoginForm'; // NEW IMPORT

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Determine if we should show the register view, default to login
  const view = searchParams.get('view') || 'login';

  useEffect(() => {
    // Ensure URL is clean or points to a valid view on mount
    if (view !== 'login' && view !== 'register') {
        navigate('/auth?view=login', { replace: true });
    }
  }, [view, navigate]);

  const handleSwitch = (targetView: 'login' | 'register') => {
    navigate(`/auth?view=${targetView}`);
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm shadow-xl p-6">
        <CardHeader className="p-0 mb-6">
            <div className='flex justify-between border-b'>
                <button 
                    onClick={() => handleSwitch('login')}
                    className={`flex-1 py-3 text-lg font-semibold transition-colors ${
                        view === 'login' ? 'text-nature border-b-2 border-nature' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    Login
                </button>
                <button 
                    onClick={() => handleSwitch('register')}
                    className={`flex-1 py-3 text-lg font-semibold transition-colors ${
                        view === 'register' ? 'text-cultural border-b-2 border-cultural' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    Register
                </button>
            </div>
        </CardHeader>
        <CardContent className="p-0">
          {view === 'login' ? (
            // Use the dedicated LoginForm component
            <LoginForm onSwitch={() => handleSwitch('register')} />
          ) : (
            // Use the dedicated RegisterForm component
            <RegisterForm onSwitch={() => handleSwitch('login')} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}