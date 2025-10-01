'use client';
// aur ye wala mere registration form hai
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useEventStore from '@/store/eventStore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';

export default function RegistrationPage() {
  const { slug } = useParams();
  const router = useRouter();

  const {
    fetchEventBySlug,
    fetchRegistrationForm,
    registrationForm,
    singleEvent,
    loadingSingleEvent,
    error,
  } = useEventStore();

  const [formData, setFormData] = useState({});
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchEventBySlug(slug);
      fetchRegistrationForm(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (registrationForm?.tickets?.length === 1) {
      setSelectedTicketId(registrationForm.tickets[0]._id);
    }
  }, [registrationForm?.tickets]);

  const { eventDetails, defaultFields, customFields, tickets, sessions } = registrationForm || {};
  const allFields = [...(defaultFields || []), ...(customFields || [])];
  const eventId = singleEvent?._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    for (let field of allFields) {
      if (field.required && !formData[field.name]) {
        setFormError(`Please fill the required field: ${field.label}`);
        return false;
      }
    }
    if (tickets?.length > 0 && !selectedTicketId) {
      setFormError('Please select a ticket');
      return false;
    }
    setFormError(null);
    return true;
  };

  async function openRazorpay(order, name, email) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: order.amount * 100,
          currency: order.currency,
          name: 'Event Registration',
          order_id: order.razorpayOrderId,
          handler: function (response) {
            console.log(response);
            api.post(`/payment/check-status`, response)
              .then(res => {
                if (res.data.success) {
                  router.push(`/events/${slug}/success?paymentId=${response.razorpay_payment_id}&name=${name}&email=${email}&message=${res.data.message || ''}`);
                } else {
                  setFormError(res.data.message || 'Payment failed');
                }
              })
              .catch(err => {
                setFormError(err.response?.data?.message || 'Payment verification failed');
              });

            resolve();
          },
          prefill: {
            name,
            email,
          },
          modal: {
            ondismiss: () => {
              setFormError('Payment popup closed');
              reject(new Error('Payment cancelled'));
            },
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      script.onerror = () => {
        setFormError('Failed to load Razorpay SDK');
        reject(new Error('Failed to load Razorpay SDK'));
      };
      document.body.appendChild(script);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!validate() || !eventId) return;

    const { name, email, phone, ...rest } = formData;
    const selectedTicket = tickets.find(t => t._id === selectedTicketId);
    if (!selectedTicket) return setFormError('Please select a valid ticket');

    const payload = {
      name,
      email,
      phone,
      ticketId: selectedTicketId,
      dynamicFields: rest,
    };

    try {
      setSubmitting(true);
      const res = await api.post(`/event/register/${eventId}`, payload);
      const data = res.data;

      if (data.success) {
        if (selectedTicket.price === 0) {
          alert('Registered successfully! No payment required.');
          setFormData({});
          setSelectedTicketId(null);
          router.push(`/events/${slug}/success?name=${name}&email=${email}`);
        } else if (data.code === 'PAYMENT_INITIATED' && data.order) {
          await openRazorpay(data.order, name, email);
          setFormData({});
        } else {
          alert('Registered successfully!');
          router.push(`/events/${slug}/success?name=${name}&email=${email}`);
        }
      } else {
        setFormError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to submit registration');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingSingleEvent || !registrationForm) {
    return <p className="text-center py-10">Loading registration form...</p>;
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-md border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{eventDetails?.title}</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Enter your details to register for this event.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {allFields.map(({ name, label, type, required, placeholder }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}{required && ' *'}</Label>
              <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder || ''}
                required={required}
                value={formData[name] || ''}
                onChange={handleChange}
                disabled={submitting}
                autoComplete="off"
              />
            </div>
          ))}

          {tickets?.length > 0 && (
            <div>
              <Label className="block mb-1">Select Ticket *</Label>
              {tickets.length === 1 ? (
                <div className="p-3 rounded border bg-gray-50 text-sm text-gray-700">
                  <strong>{tickets[0].type}</strong> — ₹{tickets[0].price}
                </div>
              ) : (
                <Select onValueChange={setSelectedTicketId} value={selectedTicketId || ''} disabled={submitting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a ticket" />
                  </SelectTrigger>
                  <SelectContent>
                    {tickets.map((ticket) => (
                      <SelectItem key={ticket._id} value={ticket._id} disabled={ticket.soldOut}>
                        {ticket.type} — ₹{ticket.price} {ticket.soldOut && '(Sold Out)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Submitting...' : 'Make Paymen'}
          </Button>
        </form>

        {sessions?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Event Sessions</h3>
            <ul className="space-y-3">
              {sessions.map((s) => (
                <li key={s._id} className="bg-gray-100 p-4 rounded shadow-sm border text-sm">
                  <p><strong>{s.title}</strong>: {s.description}</p>
                  <p className="text-gray-700 mt-1">
                    {new Date(s.startTime).toLocaleString()} → {new Date(s.endTime).toLocaleString()}
                  </p>
                  <p className="text-gray-500">
                    {s.venue.name}, {s.venue.city}, {s.venue.state}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
