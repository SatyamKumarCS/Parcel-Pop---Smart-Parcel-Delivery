import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, Globe } from 'lucide-react';

const services = [
    {
        icon: <Truck size={40} className="text-orange-500" />,
        title: 'Express Delivery',
        description: 'Get your parcels delivered in the shortest time possible.',
    },
    {
        icon: <Clock size={40} className="text-blue-500" />,
        title: 'Standard Delivery',
        description: 'Affordable and reliable delivery for your everyday needs.',
    },
    {
        icon: <Globe size={40} className="text-green-500" />,
        title: 'International Shipping',
        description: 'Send parcels worldwide with seamless logistics support.',
    },
];

export default function OurServices() {
    return (
        <section className="py-16 ">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                        >
                            <CardHeader className="flex items-center justify-center">
                                {service.icon}
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-xl font-semibold text-center">
                                    {service.title}
                                </CardTitle>
                                <p className="text-gray-600 text-center mt-2">
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
