const sortTickets = (tickets) => {
    return tickets.map(ticket => {
        const soldPercentage = (ticket.sold / ticket.capacity) * 100;
        let badge = null;
        if (soldPercentage >= 40 && ticket.capacity >= 50) {
            badge = 'best';
        } else if (soldPercentage >= 25 && ticket.capacity >= 50) {
            badge = 'interesting';
        }
        return {
            ...ticket,
            soldPercentage: Math.round(soldPercentage),
            badge
        };
    }).sort((a, b) => {
        const badgePriority = { 'best': 3, 'interesting': 2, null: 1 };
        const priorityDiff = (badgePriority[b.badge] || 0) - (badgePriority[a.badge] || 0);
        if (priorityDiff !== 0) return priorityDiff;
        return a.price - b.price;
    });
};

export { sortTickets };