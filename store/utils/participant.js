import { formatFullTimeline } from '@/lib/timelineFormate';

const normalizeDynamicFields = (fields) => {
  const out = {};
  for (const [key, val] of Object.entries(fields || {})) {
    out[key] = Array.isArray(val) ? val.join(', ') : (val ?? '');
  }
  return out;
};

export const validateFormData = (formData, registrationForm) => {
  const errors = {};
  const allFields = [...(registrationForm?.defaultFields || []), ...(registrationForm?.customFields || [])];

  let firstErrorField = null;

  allFields.forEach((field) => {
    if (field.required) {
      const value = formData[field.name];

      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors[field.name] = `${field.label} is required`;
        if (!firstErrorField) {
          firstErrorField = field.name;
        }
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    firstErrorField,
  };
};

export const prepareRegistrationPayload = (formData, ticketId, registrationForm, couponCode, slug) => {
  const payload = {
    ticketId,
    eventId: slug,
    // referralCode: 'Xdd', TODO: future implementation for referral code, need to add it in registration form response from backend
  };
  if (formData.referralCode) {
    payload.referralCode = formData.referralCode;
  }
  if (couponCode) {
    payload.couponCode = couponCode;
  }
  payload.participants = [formData];
  return payload;
};

export const GetSuccessData = (data) => {
  if (!data) return null;

  // Handle new response format with separate registration and participants
  const registration = data.registration || data.data;
  const participants = data.participants || [];
  
  // Check if this is a group registration
  const isGroup = registration?.groupInfo?.groupName || registration?.groupInfo?.totalMembers > 1 || participants.length > 1;
  
  if (isGroup && participants.length > 0) {
    // Group registration
    const leader = participants.find((p) => p.isGroupLeader) || participants[0];
    const ticketInfo = registration?.pricing || {};
    
    return {
      registrationId: registration?._id || leader?._id || '',
      message: data.message || 'Registration Confirmed',
      eventName: registration?.eventDetails?.title || '',
      eventDate: registration?.eventDetails?.sessions ? formatFullTimeline(registration.eventDetails.sessions) : '',
      eventLocation:
        (registration?.eventDetails?.sessions?.[0]?.venue?.name || '') +
        (registration?.eventDetails?.sessions?.[0]?.venue?.address || '') ||
        'Venue TBD',
      ticketType: registration?.ticketInfo?.type || '',
      ticketPrice: registration?.ticketInfo?.price || ticketInfo?.subtotal || 0,
      isPaid: registration?.status === 'PAID' || ticketInfo?.total > 0,
      isGroup: true,
      groupName: registration?.groupInfo?.groupName || 'Group Registration',
      participants: participants.map((p) => ({
        name: p.name,
        email: p.email,
        phone: p.phone,
        isLeader: p.isGroupLeader || p._id === leader._id,
      })),
      participantCount: participants.length,
      totalAmount: ticketInfo?.total || 0,
      qrCode: '',
      eventSlug: registration?.eventDetails?.slug || '',
      redirect: data.redirect || null,
    };
  }

  // Individual registration
  const participant = participants?.[0];
  const ticketInfo = registration?.pricing || {};
  
  const SUCCESS_DATA = {
    registrationId: registration?._id || participant?._id || '',
    message: data.message || 'Registration Confirmed',
    eventName: registration?.eventDetails?.title || '',
    eventDate: registration?.eventDetails?.sessions ? formatFullTimeline(registration.eventDetails.sessions) : '',
    eventLocation:
      (registration?.eventDetails?.sessions?.[0]?.venue?.name || '') +
      (registration?.eventDetails?.sessions?.[0]?.venue?.address || '') ||
      'Venue TBD',
    ticketType: registration?.ticketInfo?.type || '',
    ticketPrice: registration?.ticketInfo?.price || ticketInfo?.subtotal || 0,
    isPaid: registration?.status === 'PAID' || ticketInfo?.total > 0,
    isGroup: false,
    participants: participant
      ? [
          {
            name: participant.name || '',
            email: participant.email || '',
            phone: participant.phone || '',
          },
        ]
      : [],
    participantCount: 1,
    totalAmount: ticketInfo?.total || 0,
    qrCode: '',
    eventSlug: registration?.eventDetails?.slug || '',
    redirect: data.redirect || null,
  };

  return SUCCESS_DATA;
};

export const prepareGroupRegistrationPayload = (groupData, ticketId, registrationForm, couponCode) => {
  const DATA = {
    groupName: groupData.groupName,
    groupLeader: groupData.leader,
    groupMembers: groupData.groupMembers,
    ticketId,
    couponCode,
  };
  return DATA;
};

export { normalizeDynamicFields };
