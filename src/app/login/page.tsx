"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 

  Car,
  Shield,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('user');
  const [adminType, setAdminType] = useState<'admin' | 'admin_state' | 'admin_district' | 'admin_zonal'>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
    role: 'user'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const loginStore = useAppStore((s) => s.login);
  const setRole = useAppStore((s) => s.setRole);
  const setUser = useAppStore((s) => s.setUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // Check registration list
      const raw = typeof window !== 'undefined' ? localStorage.getItem('registeredUsers') : null;
      const users: Array<{ email: string; password: string; name: string; phone?: string; role: string }> = raw ? JSON.parse(raw) : [];
      const roleToMatch = activeTab === 'admin' ? adminType : activeTab;
      let found = users.find((u) => u.email === formData.email && u.role === roleToMatch);

      // Default demo admins (no registration required)
      const defaultAdmins: Array<{ email: string; password: string; name: string; role: 'admin_state' | 'admin_district' | 'admin_zonal' }> = [
        { email: 'stateadmin@jhar.com', password: 'Admin@123', name: 'State Admin', role: 'admin_state' },
        { email: 'districtadmin@jhar.com', password: 'Admin@123', name: 'District Admin', role: 'admin_district' },
        { email: 'zonaladmin@jhar.com', password: 'Admin@123', name: 'Zonal Admin', role: 'admin_zonal' },
      ];
      if (!found && (roleToMatch === 'admin_state' || roleToMatch === 'admin_district' || roleToMatch === 'admin_zonal')) {
        const demo = defaultAdmins.find((a) => a.email === formData.email && a.role === roleToMatch && a.password === formData.password);
        if (demo) {
          found = { email: demo.email, password: demo.password, name: demo.name, role: demo.role } as { email: string; password: string; name: string; role: string };
        }
      }

      if (!found || found.password !== formData.password) {
        setIsLoading(false);
        setError('Invalid credentials or account not registered for selected role.');
        return;
      }

      // Sync with global store
      loginStore(found.name || 'User');
      setRole(found.role as 'admin_state' | 'admin_district' | 'admin_zonal' | 'provider' | 'user' | 'admin');
      setUser({ name: found.name || 'User', email: found.email, phone: found.phone });
      
      // Redirect based on role
      switch (roleToMatch) {
        case 'user':
          router.push('/dashboard');
          break;
        case 'provider':
          router.push('/provider-dashboard');
          break;
        case 'admin':
        case 'admin_state':
          router.push('/admin-dashboard');
          break;
        case 'admin_district':
          router.push('/admin-district');
          break;
        case 'admin_zonal':
          router.push('/admin-zonal');
          break;
        default:
          router.push('/dashboard');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // Restrict registration to tourist users only
      if (activeTab !== 'user') {
        setIsLoading(false);
        setError('Only tourist users can register. Providers and Admins should use Login.');
        return;
      }
      // Save to local registered users list
      const raw = typeof window !== 'undefined' ? localStorage.getItem('registeredUsers') : null;
      const users: Array<{ email: string; password: string; name: string; phone?: string; role: string }> = raw ? JSON.parse(raw) : [];
      const roleToSave = 'user' as const;
      if (users.some((u) => u.email === formData.email && u.role === roleToSave)) {
        setIsLoading(false);
        setError('An account with this email and role already exists.');
        return;
      }
      users.push({ email: formData.email, password: formData.password, name: formData.name || 'User', phone: formData.phone, role: roleToSave });
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      // Sync with global store and redirect
      loginStore(formData.name || 'User');
      setRole(roleToSave as "user");
      setUser({ name: formData.name || 'User', email: formData.email, phone: formData.phone });
      
      // Redirect based on role
      router.push('/dashboard');
      
      setIsLoading(false);
    }, 1000);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'user': return <User className="w-5 h-5" />;
      case 'provider': return <Car className="w-5 h-5" />;
      case 'admin': return <Shield className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'user': return 'Explore destinations, manage wishlist, and book services';
      case 'provider': return 'Manage your services, bookings, and customer interactions';
      case 'admin': return 'Oversee complaints, providers, and system management';
      default: return 'Access your account';
    }
  };

  return (
    <div className="min-h-screen bg-forest-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-forest-500 mr-2" />
            <h1 className="text-3xl font-bold text-forest-500">Jhar Safar</h1>
          </div>
          <p className="text-forest-400">Welcome to Jharkhand&apos;s tourism platform</p>
        </div>

        {/* Login/Register Tabs */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-forest-100">
            <TabsTrigger value="login" className="data-[state=active]:bg-forest-200">Login</TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-forest-200">Register</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-6">
            <Card className="bg-forest-50 border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-500 text-center">Sign In</CardTitle>
                <CardDescription className="text-forest-400 text-center">
                  Choose your role and sign in to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                    {error}
                  </div>
                )}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-forest-100 mb-6">
                    <TabsTrigger value="user" className="data-[state=active]:bg-forest-200">
                      <User className="w-4 h-4 mr-1" />
                      User
                    </TabsTrigger>
                    <TabsTrigger value="provider" className="data-[state=active]:bg-forest-200">
                      <Car className="w-4 h-4 mr-1" />
                      Provider
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="data-[state=active]:bg-forest-200">
                      <Shield className="w-4 h-4 mr-1" />
                      Admin
                    </TabsTrigger>
                  </TabsList>
                  {activeTab === 'admin' && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <button type="button" className={`px-3 py-2 rounded-md text-sm ${adminType === 'admin_state' ? 'bg-forest-400 text-white' : 'bg-forest-100 text-forest-500'}`} onClick={() => setAdminType('admin_state')}>State Admin</button>
                      <button type="button" className={`px-3 py-2 rounded-md text-sm ${adminType === 'admin_district' ? 'bg-forest-400 text-white' : 'bg-forest-100 text-forest-500'}`} onClick={() => setAdminType('admin_district')}>District Admin</button>
                      <button type="button" className={`px-3 py-2 rounded-md text-sm ${adminType === 'admin_zonal' ? 'bg-forest-400 text-white' : 'bg-forest-100 text-forest-500'}`} onClick={() => setAdminType('admin_zonal')}>Zonal Admin</button>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-forest-100 rounded-lg">
                      {getRoleIcon(activeTab)}
                      <div>
                        <p className="text-forest-500 font-medium capitalize">{activeTab} Account</p>
                        <p className="text-forest-400 text-sm">{getRoleDescription(activeTab)}</p>
                      </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-forest-500 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-forest-500 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 pr-10 bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-forest-400 hover:text-forest-500"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-forest-400 hover:bg-forest-500 text-white"
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </form>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-6">
            <Card className="bg-forest-50 border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-500 text-center">Create Account</CardTitle>
                <CardDescription className="text-forest-400 text-center">
                  Join Jharkhand&apos;s tourism community
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                    {error}
                  </div>
                )}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-1 bg-forest-100 mb-6">
                    <TabsTrigger value="user" className="data-[state=active]:bg-forest-200">
                      <User className="w-4 h-4 mr-1" />
                      User
                    </TabsTrigger>
                  </TabsList>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-forest-100 rounded-lg">
                      {getRoleIcon(activeTab)}
                      <div>
                        <p className="text-forest-500 font-medium capitalize">{activeTab} Account</p>
                        <p className="text-forest-400 text-sm">{getRoleDescription(activeTab)}</p>
                      </div>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-forest-500 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10 bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-forest-500 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-forest-500 mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-forest-500 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 pr-10 bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300"
                            placeholder="Create a password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-forest-400 hover:text-forest-500"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-forest-500 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="pl-10 bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300"
                            placeholder="Confirm your password"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-forest-400 hover:bg-forest-500 text-white"
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </form>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center">
          <p className="text-forest-400 text-sm">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-forest-500 hover:text-forest-600">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-forest-500 hover:text-forest-600">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
