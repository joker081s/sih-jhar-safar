"use client";

import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function WalletPage() {
  const { walletConnected, walletAddress, balance, connectWallet, mockDeposit, pay } = useAppStore();
  const [amount, setAmount] = useState(100);
  const [payTo, setPayTo] = useState("provider_1");
  const [payAmount, setPayAmount] = useState(50);

  return (
    <div className="min-h-screen bg-forest-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-forest-500">Wallet</h1>
          <Button asChild variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </Button>
        </div>

        <Card className="bg-forest-50 border-forest-200 mb-6">
          <CardHeader>
            <CardTitle className="text-forest-500 flex items-center gap-2"><Wallet2 className="w-5 h-5" /> Wallet Status</CardTitle>
          </CardHeader>
          <CardContent>
            {!walletConnected ? (
              <Button className="bg-forest-400 hover:bg-forest-500" onClick={connectWallet}>Connect Wallet</Button>
            ) : (
              <div className="space-y-2 text-forest-500">
                <div><span className="text-forest-400">Address:</span> {walletAddress}</div>
                <div><span className="text-forest-400">Balance:</span> {balance.toFixed(2)} tokens</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-forest-50 border-forest-200 mb-6">
          <CardHeader>
            <CardTitle className="text-forest-500">Deposit (Mock)</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
            <Button className="bg-forest-400 hover:bg-forest-500" onClick={() => mockDeposit(amount)}>Deposit</Button>
          </CardContent>
        </Card>

        <Card className="bg-forest-50 border-forest-200">
          <CardHeader>
            <CardTitle className="text-forest-500">Pay Provider (Mock)</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-3">
            <Input placeholder="Provider ID" value={payTo} onChange={(e) => setPayTo(e.target.value)} />
            <Input type="number" value={payAmount} onChange={(e) => setPayAmount(parseFloat(e.target.value) || 0)} />
            <Button
              variant="outline"
              className="border-forest-300 text-forest-500 hover:bg-forest-100"
              onClick={() => pay(payAmount, payTo, "Service payment")}
            >
              Pay
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


