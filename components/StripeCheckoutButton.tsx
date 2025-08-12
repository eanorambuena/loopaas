import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function StripeCheckoutButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

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
      toast({
        title: 'Error iniciando pago',
        description: data.error || 'No se pudo iniciar el proceso de pago. Intenta nuevamente o contacta soporte.',
        variant: 'destructive',
      })
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={
        `w-full py-3 text-lg font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2
        bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600
        shadow-lg hover:shadow-xl text-white border-2 border-emerald-600
        ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.03] active:scale-95'}`
      }
      style={{ letterSpacing: 1 }}
    >
      <svg className="w-6 h-6 mr-2" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#635BFF"/><path d="M23.5 16.5C23.5 19.5376 21.0376 22 18 22C14.9624 22 12.5 19.5376 12.5 16.5C12.5 13.4624 14.9624 11 18 11C21.0376 11 23.5 13.4624 23.5 16.5Z" fill="white"/></svg>
      {loading ? 'Redirigiendo a Stripe...' : 'Comprar ahora con Stripe'}
    </button>
  )
}
