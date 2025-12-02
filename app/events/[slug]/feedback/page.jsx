'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/lib/api';
import RatingScale from './components/RatingScale';
import FeedbackQuestion from './components/FeedbackQuestion';
import SelectQuestion from './components/SelectQuestion';
import { SpinnerCustom } from '@/components/ui/spinner';
import { getDefaultConfig } from './components/dummy-data';

export default function EventFeedbackPage() {
    const params = useParams();
    const router = useRouter();
    const eventSlug = params.slug;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbackConfig, setFeedbackConfig] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({});

    // Fetch feedback form configuration from API
    useEffect(() => {
        const fetchFeedbackConfig = async () => {
            try {
                setIsLoading(true);
                // const response = await api.get(`/events/${eventSlug}/feedback/config`);
                // setFeedbackConfig(response.data);

                const initialData = {};
                // response.data.questions?.forEach(question => {
                //     initialData[question.id] = question.type === 'rating' ? 0 : '';
                // });
                setFormData(initialData);
                setFeedbackConfig(getDefaultConfig());
                setFormData(getDefaultFormData());
            } catch (error) {
                console.error('Error fetching feedback config:', error);
                // Fallback to default configuration
                setFeedbackConfig(getDefaultConfig());
                setFormData(getDefaultFormData());
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeedbackConfig();
    }, [eventSlug]);


    const getDefaultFormData = () => {
        const data = {};
        const config = getDefaultConfig();
        config.questions.forEach(question => {
            data[question.id] = question.type === 'rating' ? 0 : '';
        });
        return data;
    };

    const handleChange = (questionId, value) => {
        setFormData(prev => ({ ...prev, [questionId]: value }));
    };

    const validateForm = () => {
        if (!feedbackConfig?.questions) return false;
        for (const question of feedbackConfig.questions) {
            if (question.required) {
                const value = formData[question.id];
                if (question.type === 'rating' && (!value || value === 0)) {
                    toast.error(`Please answer: ${question.question}`);
                    return false;
                }
                if ((question.type === 'text' || question.type === 'textarea' || question.type === 'select') && !value?.trim()) {
                    toast.error(`Please answer: ${question.question}`);
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsSubmitting(true);

            await api.post(`/events/${eventSlug}/feedback`, {
                responses: formData,
                submittedAt: new Date().toISOString()
            });

            toast.success('Thank you for your feedback!');

            setTimeout(() => {
                router.push(`/events/${eventSlug}`);
            }, 1500);

        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error(error.response?.data?.message || 'Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        <SpinnerCustom />
    }

    return (
        <div className="h-dvh bg-background py-2 px-4">
            <div className="mx-auto">
                <div className="bg-card border rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="border-b bg-primary px-6 py-8">
                        <h1 className="text-3xl font-bold text-primary-foreground mb-2">
                            {feedbackConfig?.title || 'Event Feedback'}
                        </h1>
                        <p className="text-primary-foreground/80">
                            {feedbackConfig?.description || 'Please share your feedback about the event.'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {feedbackConfig?.questions?.map((question, index) => (
                                <div key={question.id}>
                                    {question.type === 'rating' && (
                                        <RatingScale
                                            question={question.question}
                                            value={formData[question.id]}
                                            onChange={(value) => handleChange(question.id, value)}
                                            required={question.required}
                                            min={question.min}
                                            max={question.max}
                                            minLabel={question.minLabel}
                                            maxLabel={question.maxLabel}
                                        />
                                    )}

                                    {(question.type === 'text' || question.type === 'textarea') && (
                                        <FeedbackQuestion
                                            question={question.question}
                                            value={formData[question.id]}
                                            onChange={(value) => handleChange(question.id, value)}
                                            required={question.required}
                                            type={question.type}
                                            placeholder={question.placeholder}
                                            rows={question.rows}
                                        />
                                    )}

                                    {question.type === 'select' && (
                                        <SelectQuestion
                                            question={question.question}
                                            value={formData[question.id]}
                                            onChange={(value) => handleChange(question.id, value)}
                                            options={question.options}
                                            required={question.required}
                                            placeholder={question.placeholder}
                                            className='w-full'
                                        />
                                    )}

                                    {index < feedbackConfig.questions.length - 1 && (
                                        <div className="mt-8 border-t" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex gap-3">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}