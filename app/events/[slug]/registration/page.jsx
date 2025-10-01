'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import useEventStore from '@/store/eventStore'
import { toast } from 'sonner'
import DynamicField from '../../components/DynamicField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/lib/api'
import openRazorpay from '@/lib/openRazorpay'

export default function RegistrationPage() {
  const { slug } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const referralCode = searchParams.get("ref") || null

  const { fetchRegistrationForm, registrationForm } = useEventStore()
  const [formData, setFormData] = useState({})
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (slug) fetchRegistrationForm(slug)
  }, [slug])

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const allFields = [
    ...(registrationForm?.defaultFields || []),
    ...(registrationForm?.customFields || [])
  ]

  //demo we add api real later for coupon 
  const applyCoupon = () => {
    if (couponCode === "WELCOME20") {
      setDiscount(20)
      toast.success("Coupon applied! 20% discount")
    } else {
      setDiscount(0)
      toast.error("Invalid coupon code")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedTicket) return toast.error("Please select a ticket")

    for (const field of allFields) {
      if (field.required && !formData[field.name]) {
        return toast.error(`${field.label} is required`)
      }
    }

    try {
      setSubmitting(true)

      const payload = new FormData()
      allFields.forEach(field => {
        const value = formData[field.name]
        if (field.type === "file" && value) {
          payload.append(field.name, value)
        } else if (field.type === "checkbox" && Array.isArray(value)) {
          payload.append(field.name, value.join(", ")) // ✅ FIX
        } else {
          payload.append(field.name, value || "")
        }
      })
      payload.append("ticketId", selectedTicket._id)
      if (couponCode) payload.append("couponCode", couponCode)
      if (referralCode) payload.append("referralCode", referralCode)

      // ✅ Send to backend -> create order
      const res = await api.post(`/event/register/${slug}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const { order, participant } = res.data

      if (selectedTicket.price > 0 && order) {
        // ✅ Open Razorpay checkout
        const paymentRes = await openRazorpay(
          order,
          participant.name,
          participant.email
        )

        // ✅ Send payment verification to backend
        await api.post(`/event/payment/verify`, {
          orderId: order.id,
          paymentId: paymentRes.razorpay_payment_id,
          signature: paymentRes.razorpay_signature,
          participantId: participant._id,
        })

        router.push(
          `/events/${slug}/success?paymentId=${paymentRes.razorpay_payment_id}&name=${participant.name}&email=${participant.email}&slug=${slug}`
        )
      } else {
        toast.success("Registration successful!")
        router.push(`/events/${slug}/success?name=${participant.name}&email=${participant.email}&slug=${slug}`)
      }

    } catch (err) {
      console.error(err.response?.data || err)
      toast.error(err.response?.data?.message || "Registration failed!")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-4 border rounded-md shadow">
      <h2 className="text-2xl font-bold mb-4">
        Register for {registrationForm?.eventDetails?.title}
      </h2>

      {allFields.map((field) => (
        <DynamicField
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleChange}
        />
      ))}

      {/* Ticket Selection */}
      <div>
        <h3 className="font-semibold mb-2">Choose Ticket</h3>
        <div className="space-y-2">
          {registrationForm?.tickets?.map((ticket) => (
            <label
              key={ticket._id}
              className={`flex items-center justify-between p-3 border rounded cursor-pointer ${
                selectedTicket?._id === ticket._id ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="ticket"
                value={ticket._id}
                checked={selectedTicket?._id === ticket._id}
                onChange={() => !ticket.soldOut && setSelectedTicket(ticket)}
                disabled={ticket.soldOut}
              />
              <span className="ml-2">{ticket.type}</span>
              <span className="ml-auto font-medium">₹{ticket.price}</span>
              {ticket.soldOut && <span className="ml-2 text-red-500">Sold Out</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Coupon */}
      <div className="space-y-2">
        <label className="font-semibold">Coupon Code</label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button type="button" onClick={applyCoupon}>Apply</Button>
        </div>
        {discount > 0 && <p className="text-green-600">Applied: {discount}% discount</p>}
      </div>

      {referralCode && (
        <p className="text-sm text-gray-600">
          Referral Code Applied: <span className="font-medium">{referralCode}</span>
        </p>
      )}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Submitting..." : "Submit & Pay"}
      </Button>
    </form>
  )
}
