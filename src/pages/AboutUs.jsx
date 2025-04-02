const AboutUs = () => {
    return (
        <div className="">
            {/* Hero Section */}
            <div className="relative bg-primary py-20 text-center text-primary-foreground dark:text-dark-primary-foreground">
                <h1 className="text-5xl font-bold mb-4 text-primary-foreground dark:text-dark-primary-foreground">
                    About ParcelPop
                </h1>
                <p className="text-xl max-w-2xl mx-auto text-primary-foreground dark:text-dark-primary-foreground">
                    Delivering trust, speed, and reliability to every doorstep.
                </p>
            </div>

            {/* Company Overview */}
            <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                <h2 className="text-4xl font-semibold mb-6">Who We Are</h2>
                <p className="mt-4 text-lg ">
                    ParcelPop is a tech-driven logistics company dedicated to providing{' '}
                    <span className="">fast, secure, and cost-effective</span> parcel deliveries.
                    Whether you&apos;re an individual or a business, we ensure{' '}
                    <span className="">seamless delivery experiences</span> with real-time tracking
                    and top-notch customer service.
                </p>
            </div>

            {/* Our Mission & Values */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className=" shadow-lg p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="mt-2 ">
                        To revolutionize parcel delivery with{' '}
                        <span className="">real-time tracking</span>,{' '}
                        <span className="">secure handling</span>, and{' '}
                        <span className="">affordable pricing</span>. We believe in making logistics
                        simple, <span className="">efficient, and reliable</span> for everyone.
                    </p>
                </div>
                <div className=" shadow-lg p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                    <ul className="mt-2  space-y-2">
                        <li>
                            ✔️ <span className="">Speed & Efficiency</span> - Timely deliveries you
                            can count on.
                        </li>
                        <li>
                            ✔️ <span className="">Customer-Centric</span> - Your satisfaction is our
                            top priority.
                        </li>
                        <li>
                            ✔️ <span className="">Security First</span> - Every package is handled
                            with care.
                        </li>
                        <li>
                            ✔️ <span className="">Innovation</span> - We use the latest tech for
                            smooth operations.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-primary  py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-semibold mb-8 text-primary-foreground dark:text-dark-primary-foreground">
                        Why Choose ParcelPop?
                    </h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="/10 p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-primary-foreground dark:text-dark-primary-foreground">
                                🚀 Fast Deliveries
                            </h3>
                            <p className="mt-2 text-primary-foreground dark:text-dark-primary-foreground">
                                We ensure on-time deliveries with real-time tracking.
                            </p>
                        </div>
                        <div className="/10 p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-primary-foreground dark:text-dark-primary-foreground">
                                🔒 Secure Handling
                            </h3>
                            <p className="mt-2 text-primary-foreground dark:text-dark-primary-foreground">
                                Every parcel is handled with utmost care and security.
                            </p>
                        </div>
                        <div className="/10 p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-primary-foreground dark:text-dark-primary-foreground">
                                💰 Affordable Rates
                            </h3>
                            <p className="mt-2 text-primary-foreground dark:text-dark-primary-foreground">
                                Get the best prices without compromising on quality.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet Our Team */}
            <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h2 className="text-4xl font-semibold mb-6 ">Meet Our Team</h2>
                <p className="mt-4 text-lg ">
                    We are a team of{' '}
                    <span className="">
                        logistics experts, tech innovators, and customer service professionals
                    </span>
                    , working together to ensure seamless parcel deliveries.
                </p>

                {/* Placeholder for team members */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className=" shadow-lg p-6 rounded-lg">
                        <div className="w-32 h-32 bg-gray-500  mx-auto rounded-full"></div>
                        <h3 className="mt-6 text-xl font-semibold">John Doe</h3>
                        <p className="text-gray-600">CEO & Founder</p>
                    </div>
                    <div className=" shadow-lg p-6 rounded-lg">
                        <div className="w-32 h-32 bg-gray-500  mx-auto rounded-full"></div>
                        <h3 className="mt-6 text-xl font-semibold">Jane Smith</h3>
                        <p className="text-gray-600">Head of Operations</p>
                    </div>
                    <div className=" shadow-lg p-6 rounded-lg">
                        <div className="w-32 h-32 bg-gray-500  mx-auto rounded-full"></div>
                        <h3 className="mt-6 text-xl font-semibold">Mike Johnson</h3>
                        <p className="text-gray-600">Lead Developer</p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-primary text-center py-16">
                <h2 className="text-4xl font-semibold text-primary-foreground dark:text-dark-primary-foreground ">
                    Ready to Ship Your Parcel?
                </h2>
                <p className="mt-4 text-lg text-primary-foreground dark:text-dark-primary-foreground">
                    Get started today with{' '}
                    <span className="text-primary-foreground dark:text-dark-primary-foreground">
                        fast, secure, and affordable
                    </span>{' '}
                    deliveries.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
