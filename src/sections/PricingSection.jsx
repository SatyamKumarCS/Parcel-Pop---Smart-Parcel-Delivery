const PricingSection = () => {
    return (
        <div className=" py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Pricing Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Pricing Card 1 */}
                    <div className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-semibold mb-4">$59.00</h3>
                        <p className="text-gray-600 mb-4">per month</p>
                        <h4 className="text-xl font-bold mb-4">Category-1</h4>
                        <ul className="mb-6">
                            <li className="mb-2">Basic Package</li>
                            <li className="mb-2">Super Fast Transport</li>
                            <li className="mb-2">24/7 Delivery Support</li>
                            <li className="mb-2">Secured Transportation</li>
                            <li className="mb-2">Quick Customer Deal</li>
                        </ul>
                    </div>

                    {/* Repeat for other pricing cards if needed */}
                </div>
            </div>
        </div>
    );
};

export default PricingSection;
