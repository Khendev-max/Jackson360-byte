"use server"

interface MailchimpData {
  email: string
  rememberMe: boolean
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function submitToMailchimp(data: MailchimpData) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
    console.error("[v0] Missing Mailchimp environment variables")
    return {
      success: false,
      error:
        "Mailchimp configuration is missing. Please add MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID, and MAILCHIMP_SERVER_PREFIX to your environment variables.",
    }
  }

  if (!isValidEmail(data.email)) {
    console.error("[v0] Invalid email format:", data.email)
    return {
      success: false,
      error: `Invalid email format: ${data.email}. Please enter a valid email address.`,
    }
  }

  try {
    const response = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: data.email.toLowerCase().trim(),
          status: "subscribed",
          merge_fields: {
            REMEMBERME: data.rememberMe ? "Yes" : "No",
          },
        }),
      },
    )

    const result = await response.json()

    if (!response.ok) {
      if (response.status === 400 && result.title === "Member Exists") {
        console.log("[v0] Member already exists in Mailchimp:", data.email)
        return {
          success: true,
          message: "Email already registered",
        }
      }

      console.error("[v0] Mailchimp API error:", {
        status: response.status,
        body: result,
        email: data.email,
      })
      return {
        success: false,
        error: result.title || "Failed to submit to Mailchimp",
        details: result.detail,
      }
    }

    console.log("[v0] Successfully submitted to Mailchimp:", {
      email: data.email,
      status: result.status,
    })
    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error("[v0] Error submitting to Mailchimp:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
