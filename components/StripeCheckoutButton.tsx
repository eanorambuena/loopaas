import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function StripeCheckoutButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })
    const data = await res.json()
    const stripe = await stripePromise
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Error iniciando pago')
    }
    setLoading(false)
  }

  return (
    <button onClick={handleCheckout} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
      {loading ? 'Redirigiendo...' : 'Pagar con Stripe'}
    </button>
  )
}
