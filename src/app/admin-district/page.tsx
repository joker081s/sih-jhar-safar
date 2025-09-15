"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Users, Shield, } from "lucide-react";

export default function AdminDistrictPage() {
  const router = useRouter();
  const role = useAppStore((s) => s.role);
  useEffect(() => {
    if (role !== 'admin_district') {
      router.replace('/');
    }
  }, [role, router]);

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-forest-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-3">
              <button onClick={() => setActiveTab('overview')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <Shield className="w-4 h-4" /> Overview
                </div>
                <span className="text-forest-400 text-sm">District</span>
              </button>
              <button onClick={() => setActiveTab('providers')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <Users className="w-4 h-4" /> Providers
                </div>
                <span className="text-forest-400 text-sm">Manage</span>
              </button>
              <button onClick={() => setActiveTab('complaints')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <AlertTriangle className="w-4 h-4" /> Complaints
                </div>
                <span className="text-forest-400 text-sm">Handle</span>
              </button>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-forest-100 grid grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="providers">Providers</TabsTrigger>
                <TabsTrigger value="complaints">Complaints</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card className="bg-forest-50 border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-500">District Admin Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-forest-400">Manage providers and complaints within your district.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="providers">
                <Card className="bg-forest-50 border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-500">Providers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-forest-400">Provider management tools coming soon.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="complaints">
                <Card className="bg-forest-50 border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-500">Complaints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-forest-400">View and resolve district complaints here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}


