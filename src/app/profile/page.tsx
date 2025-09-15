"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  ArrowLeft,
  Shield,
  Car,
  Settings
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

export default function ProfilePage() {
  const storeUser = useAppStore((s) => s.user);
  const setUserStore = useAppStore((s) => s.setUser);
  const role = useAppStore((s) => s.role);
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    joinDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (storeUser) {
      setUser(storeUser);
      setFormData({
        name: storeUser.name || '',
        email: storeUser.email || '',
        phone: storeUser.phone || '',
        location: (storeUser as any).location || 'Jharkhand, India',
        joinDate: new Date().toISOString().split('T')[0]
      });
    } else {
      router.push('/login');
    }
  }, [router, storeUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      setUserStore({ name: formData.name, email: formData.email, phone: formData.phone });
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || 'Jharkhand, India',
      joinDate: user?.joinDate || new Date().toISOString().split('T')[0]
    });
    setIsEditing(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'user': return <User className="w-5 h-5" />;
      case 'provider': return <Car className="w-5 h-5" />;
      case 'admin': return <Shield className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'user': return 'bg-forest-100 text-forest-600';
      case 'provider': return 'bg-blue-100 text-blue-600';
      case 'admin': return 'bg-red-100 text-red-600';
      default: return 'bg-forest-100 text-forest-600';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-forest-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-forest-500 mx-auto"></div>
          <p className="mt-4 text-forest-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-forest-500 hover:text-forest-600 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-forest-500">Profile Settings</h1>
          <p className="text-forest-400">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="bg-forest-50 border-forest-200">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-forest-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  {getRoleIcon(role || 'user')}
                </div>
                <CardTitle className="text-forest-500">{user.name}</CardTitle>
                <CardDescription className="text-forest-400">
                  <Badge className={getRoleColor(role || 'user')}>
                    {(role || 'user').toUpperCase()}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-forest-500">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-forest-500">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-forest-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{user.location || 'Jharkhand, India'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-forest-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined {new Date(user.joinDate || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="bg-forest-50 border-forest-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-forest-500">Account Information</CardTitle>
                    <CardDescription className="text-forest-400">
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="bg-forest-400 hover:bg-forest-500"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isLoading ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="border-forest-300 text-forest-500 hover:bg-forest-100"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="border-forest-300 text-forest-500 hover:bg-forest-100"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-forest-500 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-forest-500 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-forest-500 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-forest-500 mb-1">
                        Location
                      </label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="joinDate" className="block text-sm font-medium text-forest-500 mb-1">
                      Join Date
                    </label>
                    <Input
                      id="joinDate"
                      name="joinDate"
                      type="date"
                      value={formData.joinDate}
                      onChange={handleInputChange}
                      disabled={true}
                      className="bg-forest-50 border-forest-200 text-forest-500 placeholder-forest-300 focus:ring-forest-300 disabled:opacity-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="bg-forest-50 border-forest-200 mt-6">
              <CardHeader>
                <CardTitle className="text-forest-500">Account Actions</CardTitle>
                <CardDescription className="text-forest-400">
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-forest-100 rounded-lg">
                    <div>
                      <h3 className="font-medium text-forest-500">Change Password</h3>
                      <p className="text-sm text-forest-400">Update your account password</p>
                    </div>
                    <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                      Change
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-forest-100 rounded-lg">
                    <div>
                      <h3 className="font-medium text-forest-500">Notification Settings</h3>
                      <p className="text-sm text-forest-400">Manage your notification preferences</p>
                    </div>
                    <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-forest-100 rounded-lg">
                    <div>
                      <h3 className="font-medium text-forest-500">Privacy Settings</h3>
                      <p className="text-sm text-forest-400">Control your privacy and data sharing</p>
                    </div>
                    <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
