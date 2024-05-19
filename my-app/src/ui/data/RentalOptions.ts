const secondOptionOptions = [
    {
        value: 'free_option',
        label: 'Free Option',
        description: 'Enjoy this option completely free of charge with no additional fees.',
        priceAdjustment: 0, // No additional cost per day for free option
    },
    {
        value: 'stay_flexible',
        label: 'Stay flexible',
        description: 'Pay at pick-up, free cancellation, and rebooking anytime at $5 per day',
        priceAdjustment: 5, // Additional cost per day for stay flexible
    },
    {
        value: 'premium_insurance',
        label: 'Premium insurance',
        description: 'Comprehensive insurance coverage at $8 per day',
        priceAdjustment: 8, // Additional cost per day for premium insurance
    },
    {
        value: 'additional_driver',
        label: 'Additional driver',
        description: 'Add an extra driver to your rental at $3 per day',
        priceAdjustment: 15, // Additional cost per day for an additional driver
    },
    // Add more options as needed
];

const mileageOptions = [
    {
        value: '30_km',
        label: '50 km',
        description: '+$0.16 / for every additional km',
        priceAdjustment: 3, // No additional cost per day for 400 km
    },
    {
        value: '50_km',
        label: '50 km',
        description: '+$0.16 / for every additional km',
        priceAdjustment: 5, // No additional cost per day for 400 km
    },
    {
        value: '70_km',
        label: '70 km',
        description: '+$0.25 / for every additional km at $0.25 per day',
        priceAdjustment: 7, // Additional cost per day for 200 km
    },
    {
        value: 'unlimited',
        label: 'Unlimited kilometers',
        description: 'All kilometers are included in the price at $3.89 per day',
        priceAdjustment: 15, // Additional cost per day for unlimited kilometers
    },
    // Add more options as needed
];

export { secondOptionOptions, mileageOptions };