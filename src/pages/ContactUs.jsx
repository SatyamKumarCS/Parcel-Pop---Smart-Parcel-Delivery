const ContactUs = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
            <p className="mt-4 text-gray-600">
                Have questions? Reach out to us anytime! Our team is here to help.
            </p>

            <div className="mt-6 text-left">
                <h2 className="text-xl font-semibold text-gray-700">📍 Address</h2>
                <p className="text-gray-600">123 ParcelPop St, Delivery City, DC 45678</p>

                <h2 className="text-xl font-semibold text-gray-700 mt-4">📞 Phone</h2>
                <p className="text-gray-600">+1 234 567 890</p>

                <h2 className="text-xl font-semibold text-gray-700 mt-4">📧 Email</h2>
                <p className="text-gray-600">support@parcelpop.com</p>
            </div>

            {/* Contact Form */}
            <form className="mt-6 space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2  rounded-lg bg-input dark:bg-dark-input focus:ring-2 focus:ring-primary"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2  rounded-lg bg-input dark:bg-dark-input focus:ring-2 focus:ring-primary"
                />
                <textarea
                    placeholder="Your Message"
                    className="w-full p-2  rounded-lg bg-input dark:bg-dark-input focus:ring-2 focus:ring-primary"
                    rows="4"
                ></textarea>
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
