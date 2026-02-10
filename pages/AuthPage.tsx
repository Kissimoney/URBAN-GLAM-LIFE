
import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isLogin) {
                // Sign In
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Redirect to dashboard on success
                navigate('/dashboard');
            } else {
                // Sign Up
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                // User created, check email verification or redirect
                alert('Check your email for the confirmation link!');
                setIsLogin(true); // Switch to login after signup
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-neutral-950 min-h-screen text-white flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center py-32 px-6">
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-neutral-900/50 border border-white/10 p-10 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        {/* Decorative Element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[60px] pointer-events-none"></div>

                        <div className="text-center mb-10 relative z-10">
                            <h1 className="text-gold uppercase tracking-[0.5em] text-xs font-black mb-4">VIP Access</h1>
                            <h2 className="text-3xl font-serif font-bold tracking-tight">Member Portal</h2>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-bold uppercase tracking-wide">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleAuth} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border-b border-white/10 px-0 py-3 text-white focus:border-gold outline-none transition-all placeholder-white/10"
                                    placeholder="vip@urbanglam.life"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border-b border-white/10 px-0 py-3 text-white focus:border-gold outline-none transition-all placeholder-white/10"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gold text-black py-4 mt-8 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                <span className="relative z-10">{isLoading ? 'Processing...' : (isLogin ? 'Enter Portal' : 'Request Access')}</span>
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                            </button>
                        </form>

                        <div className="mt-8 text-center relative z-10">
                            <p className="text-neutral-500 text-xs">
                                {isLogin ? "New to the circle?" : "Already a member?"}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="ml-2 text-gold hover:text-white transition-colors font-bold uppercase tracking-wider"
                                >
                                    {isLogin ? "Apply for Access" : "Sign In"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AuthPage;
