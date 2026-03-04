// Dummy notification data and types

export const NotificationType = {
    SYSTEM: 'system',
    EVENT: 'event',
    TICKET: 'ticket',
    ORGANIZATION: 'organization',
    PAYMENT: 'payment',
    SECURITY: 'security',
    SOCIAL: 'social',
};

export const NotificationPriority = {
    LOW: 'low',
    NORMAL: 'normal',
    HIGH: 'high',
    URGENT: 'urgent',
};

export const NotificationCategory = {
    SYSTEM: 'system',
    EVENTS: 'events',
    PAYMENTS: 'payments',
    ALERTS: 'alerts',
    SOCIAL: 'social',
};

// Default user preferences
export const defaultPreferences = {
    push: {
        enabled: false,
        categories: {
            [NotificationCategory.SYSTEM]: false,
            [NotificationCategory.EVENTS]: false,
            [NotificationCategory.PAYMENTS]: false,
            [NotificationCategory.ALERTS]: false,
            [NotificationCategory.SOCIAL]: false,
        },
    },
    inApp: {
        enabled: false,
        categories: {
            [NotificationCategory.SYSTEM]: false,
            [NotificationCategory.EVENTS]: false,
            [NotificationCategory.PAYMENTS]: false,
            [NotificationCategory.ALERTS]: false,
            [NotificationCategory.SOCIAL]: false,
        },
    },
    quietHours: {
        enabled: false,
        startTime: '22:00',
        endTime: '08:00',
    },
    soundEnabled: false,
    desktopNotifications: false,
};

// Helper function to format time ago
export function formatTimeAgo(dateString) {
    // Parse ISO date string and convert to local timezone
    const date = new Date(dateString);
    
    // Handle invalid dates
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    // Handle future dates
    if (seconds < 0) {
        return 'Just now';
    }

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;
    
    // For older dates, show formatted date in local timezone
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Get priority color
export function getPriorityColor(priority) {
    const colors = {
        [NotificationPriority.LOW]: 'muted',
        [NotificationPriority.NORMAL]: 'default',
        [NotificationPriority.HIGH]: 'secondary',
        [NotificationPriority.URGENT]: 'destructive',
    };
    return colors[priority] || 'default';
}
