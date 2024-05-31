const secondOptionOptions = [
    {
        value: 'free_option',
        label: 'Free Option',
        description: 'Enjoy this option completely free of charge with no additional fees.',
        priceAdjustment: 0,
    },
    {
        value: 'stay_flexible',
        label: 'Stay flexible',
        description: 'Pay at pick-up, free cancellation, and rebooking anytime at $5 per day',
        priceAdjustment: 5,
    },
    {
        value: 'premium_insurance',
        label: 'Premium insurance',
        description: 'Comprehensive insurance coverage at $8 per day',
        priceAdjustment: 8,
    },
    {
        value: 'additional_driver',
        label: 'Additional driver',
        description: 'Add an extra driver to your rental at $3 per day',
        priceAdjustment: 15,
    },
    // Add more options as needed
];

const mileageOptions = [
    {
        value: '30_km',
        label: '50 km',
        description: '+$0.16 / for every additional km',
        priceAdjustment: 3,
    },
    {
        value: '50_km',
        label: '50 km',
        description: '+$0.16 / for every additional km',
        priceAdjustment: 5,
    },
    {
        value: '70_km',
        label: '70 km',
        description: '+$0.25 / for every additional km at $0.25 per day',
        priceAdjustment: 7,
    },
    {
        value: 'unlimited',
        label: 'Unlimited kilometers',
        description: 'All kilometers are included in the price at $3.89 per day',
        priceAdjustment: 15,
    },
];

export { secondOptionOptions, mileageOptions };