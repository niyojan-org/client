import { formatFullTimeline } from "@/lib/timelineFormate";

const normalizeDynamicFields = (fields) => {
    const out = {};
    for (const [key, val] of Object.entries(fields || {})) {
        out[key] = Array.isArray(val) ? val.join(", ") : val ?? "";
    }
    return out;
};

export const validateFormData = (formData, registrationForm) => {
    const errors = {};
    const allFields = [
        ...(registrationForm?.defaultFields || []),
        ...(registrationForm?.customFields || []),
    ];

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

export const prepareRegistrationPayload = (formData, ticketId, registrationForm, couponCode) => {
    const defaultFieldNames = registrationForm?.defaultFields?.map(f => f.name) || ['name', 'email', 'phone'];
    const customFieldNames = registrationForm?.customFields?.map(f => f.name) || [];

    const payload = {
        ticketId
    };

    // Add default fields
    defaultFieldNames.forEach(fieldName => {
        if (formData[fieldName]) {
            payload[fieldName] = formData[fieldName];
        }
    });

    // Add optional codes
    if (formData.referralCode) {
        payload.referralCode = formData.referralCode;
    }
    if (couponCode) {
        payload.couponCode = couponCode;
    }

    // Add custom fields as dynamicFields
    const dynamicFields = {};
    customFieldNames.forEach(fieldName => {
        if (formData[fieldName] !== undefined && formData[fieldName] !== null) {
            dynamicFields[fieldName] = formData[fieldName];
        }
    });

    if (Object.keys(dynamicFields).length > 0) {
        payload.dynamicFields = normalizeDynamicFields(dynamicFields);
    }

    return payload;
};

export const GetSuccessData = (data) => {
    if (!data) return null;

    // Check if this is a group registration
    const isGroupRegistration = data.data?.groupId && data.data?.participants && Array.isArray(data.data.participants);

    if (isGroupRegistration) {

        const leader = data.data.participants.find(p => p.isGroupLeader) || data.data.participants[0];
        return {
            registrationId: data.data.groupId || leader?._id || "",
            message: data.message || "",
            eventName: data.data.event?.title || "",
            eventDate: data.data.event?.sessions ? formatFullTimeline(data.data.event.sessions) : "",
            eventLocation: (data.data.event?.sessions?.[0]?.venue?.name || "") + (data.data.event?.sessions?.[0]?.venue?.address || "") || "Venue TBD",
            ticketType: leader?.ticket?.type || "",
            ticketPrice: leader?.ticket?.price || 0,
            isPaid: (leader?.ticket?.price || 0) > 0,
            isGroup: true,
            groupName: leader?.groupInfo?.groupName || "",
            participants: data.data.participants.map(p => ({
                name: p.name,
                email: p.email,
                phone: p.phone,
                isLeader: p.isGroupLeader || false,
            })),
            participantCount: data.data.participants.length,
            totalAmount: data.data?.payment?.amount || 0,
            qrCode: "",
            eventSlug: data.data.event?.slug || "",
        };
    }

    // Individual registration
    const SUCCESS_DATA = {
        registrationId: data.data?.participant?._id || "",
        message: data.message || "",
        eventName: data.data?.event?.title || "",
        eventDate: data.data?.event?.sessions ? formatFullTimeline(data.data.event.sessions) : "",
        eventLocation: (data.data?.event?.sessions?.[0]?.venue?.name || "") + (data.data?.event?.sessions?.[0]?.venue?.address || "") || "Venue TBD",
        ticketType: data.data?.participant?.ticket?.type || "",
        ticketPrice: data.data?.participant?.ticket?.price || 0,
        isPaid: (data.data?.participant?.ticket?.price || 0) > 0,
        isGroup: data.data?.participant?.ticket?.isGroupTicket || false,
        participants: [{
            name: data.data?.participant?.name || "",
            email: data.data?.participant?.email || "",
            phone: data.data?.participant?.phone || "",
        }],
        participantCount: 1,
        totalAmount: 0,
        qrCode: "",
        eventSlug: data.data?.event?.slug || "",
    }

    return SUCCESS_DATA
}

export const prepareGroupRegistrationPayload = (groupData, ticketId, registrationForm, couponCode) => {
    const DATA = {
        groupName: groupData.groupName,
        groupLeader: groupData.leader,
        groupMembers: groupData.groupMembers,
        ticketId,
        couponCode
    }
    return DATA;
}

export { normalizeDynamicFields };