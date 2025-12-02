const getDefaultConfig = () => ({
    title: 'Event Feedback',
    description: 'Your feedback is invaluable in helping us improve future events. Please take a few minutes to share your honest thoughts and experiences.',
    questions: [
        // Personal Information
        {
            id: 'attendeeName',
            type: 'text',
            question: 'Your Name',
            placeholder: 'Enter your full name',
            required: true
        },
        {
            id: 'attendeeEmail',
            type: 'text',
            question: 'Email Address',
            placeholder: 'your.email@example.com',
            required: true
        },
        {
            id: 'attendeeType',
            type: 'select',
            question: 'You attended this event as a',
            required: true,
            placeholder: 'Please Select',
            options: [
                { value: 'student', label: 'Student' },
                { value: 'professional', label: 'Working Professional' },
                { value: 'business_owner', label: 'Business Owner' },
                { value: 'educator', label: 'Educator/Teacher' },
                { value: 'researcher', label: 'Researcher/Academic' },
                { value: 'other', label: 'Other' }
            ]
        },

        // Event Discovery & Registration
        {
            id: 'howDidYouHear',
            type: 'select',
            question: 'How did you hear about this event?',
            required: true,
            placeholder: 'Please Select',
            options: [
                { value: 'social_media', label: 'Social Media (Instagram, Twitter, LinkedIn, etc.)' },
                { value: 'friend_colleague', label: 'Friend or Colleague' },
                { value: 'email', label: 'Email Newsletter' },
                { value: 'website', label: 'Organization Website' },
                { value: 'advertisement', label: 'Online Advertisement' },
                { value: 'previous_event', label: 'Attended Previous Events' },
                { value: 'other', label: 'Other' }
            ]
        },
        {
            id: 'registrationExperience',
            type: 'rating',
            question: 'How easy was the registration process?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Very Difficult',
            maxLabel: 'Very Easy'
        },

        // Overall Event Experience
        {
            id: 'overallSatisfaction',
            type: 'rating',
            question: 'Overall, how satisfied were you with the event?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Not Satisfied',
            maxLabel: 'Extremely Satisfied'
        },
        {
            id: 'overallEntertainment',
            type: 'rating',
            question: 'How entertaining was the event?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Boring',
            maxLabel: 'Fantastic'
        },
        {
            id: 'expectationsMet',
            type: 'rating',
            question: 'Did the event meet your expectations?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Not at All',
            maxLabel: 'Exceeded Expectations'
        },

        // Content & Program
        {
            id: 'contentQuality',
            type: 'rating',
            question: 'How would you rate the quality of content/presentations?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Poor',
            maxLabel: 'Excellent'
        },
        {
            id: 'contentRelevance',
            type: 'rating',
            question: 'How relevant was the content to your interests/needs?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Not Relevant',
            maxLabel: 'Very Relevant'
        },
        {
            id: 'speakersQuality',
            type: 'rating',
            question: 'How knowledgeable and engaging were the speakers/presenters?',
            required: false,
            min: 1,
            max: 10,
            minLabel: 'Poor',
            maxLabel: 'Excellent'
        },

        // Organization & Logistics
        {
            id: 'eventOrganization',
            type: 'rating',
            question: 'How well-organized was the event?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Poorly Organized',
            maxLabel: 'Perfectly Organized'
        },
        {
            id: 'timeManagement',
            type: 'rating',
            question: 'How well was time managed during the event?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Poorly Managed',
            maxLabel: 'Excellently Managed'
        },
        {
            id: 'staffHelpfulness',
            type: 'rating',
            question: 'How helpful and friendly was the event staff?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Unhelpful',
            maxLabel: 'Very Helpful'
        },

        // Venue & Facilities
        {
            id: 'venueLocation',
            type: 'rating',
            question: 'How convenient was the venue location?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Inconvenient',
            maxLabel: 'Very Convenient'
        },
        {
            id: 'venueFacilities',
            type: 'rating',
            question: 'How would you rate the venue facilities (seating, lighting, acoustics)?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Poor',
            maxLabel: 'Excellent'
        },
        {
            id: 'venueAmenities',
            type: 'rating',
            question: 'How were the amenities (restrooms, refreshments, WiFi)?',
            required: false,
            min: 1,
            max: 10,
            minLabel: 'Poor',
            maxLabel: 'Excellent'
        },

        // Networking & Engagement
        {
            id: 'networkingOpportunities',
            type: 'rating',
            question: 'Were there adequate networking opportunities?',
            required: false,
            min: 1,
            max: 10,
            minLabel: 'None',
            maxLabel: 'Plenty'
        },
        {
            id: 'engagementLevel',
            type: 'rating',
            question: 'How engaged did you feel during the event?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Not Engaged',
            maxLabel: 'Highly Engaged'
        },

        // Value & Impact
        {
            id: 'valueForMoney',
            type: 'rating',
            question: 'Do you feel the event provided value for money?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Not at All',
            maxLabel: 'Definitely'
        },
        {
            id: 'knowledgeGained',
            type: 'rating',
            question: 'How much new knowledge or insights did you gain?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'None',
            maxLabel: 'A Great Deal'
        },
        {
            id: 'inspirationLevel',
            type: 'rating',
            question: 'After the event, how inspired did you feel?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Not Inspired',
            maxLabel: 'Fired Up!'
        },

        // Qualitative Feedback
        {
            id: 'bestAspects',
            type: 'textarea',
            question: 'What were the best aspects of the event?',
            placeholder: 'Please share what you enjoyed most about the event...',
            required: true,
            rows: 4
        },
        {
            id: 'areasForImprovement',
            type: 'textarea',
            question: 'What aspects of the event could be improved?',
            placeholder: 'Please share your suggestions for improvement...',
            required: false,
            rows: 4
        },
        {
            id: 'favoriteSession',
            type: 'textarea',
            question: 'Which session/activity did you find most valuable and why?',
            placeholder: 'Tell us about your favorite part of the event...',
            required: false,
            rows: 3
        },
        {
            id: 'additionalComments',
            type: 'textarea',
            question: 'Any additional comments or suggestions?',
            placeholder: 'Feel free to share any other thoughts or feedback...',
            required: false,
            rows: 4
        },

        // Future Engagement
        {
            id: 'recommendationLikelihood',
            type: 'rating',
            question: 'How likely are you to recommend this event to others?',
            required: true,
            min: 1,
            max: 10,
            minLabel: 'Not Likely',
            maxLabel: 'Extremely Likely'
        },
        {
            id: 'futureAttendance',
            type: 'select',
            question: 'Would you attend future events from this organizer?',
            required: true,
            placeholder: 'Please Select',
            options: [
                { value: 'definitely', label: 'Definitely Yes' },
                { value: 'probably', label: 'Probably' },
                { value: 'maybe', label: 'Maybe' },
                { value: 'probably_not', label: 'Probably Not' },
                { value: 'definitely_not', label: 'Definitely Not' }
            ]
        },
        {
            id: 'topicsOfInterest',
            type: 'textarea',
            question: 'What topics would you like to see covered in future events?',
            placeholder: 'Share topics or themes you would be interested in...',
            required: false,
            rows: 3
        }
    ]
});

export { getDefaultConfig };