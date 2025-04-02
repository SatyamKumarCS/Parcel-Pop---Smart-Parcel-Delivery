import Section from '@/components/Section';
import { Card } from '@/components/ui/card';
import { Truck, Package, Home, BarChart2 } from 'lucide-react';

const steps = [
    {
        icon: Package,
        title: 'Enter parcel details',
        description: 'Fill in sender and receiver info.',
    },
    {
        icon: Truck,
        title: 'Choose delivery speed',
        description: 'Select standard or express delivery.',
    },
    {
        icon: Home,
        title: 'Get it delivered',
        description: 'We pick up and deliver to your doorstep.',
    },
    {
        icon: BarChart2,
        title: 'Track in real-time',
        description: "Monitor your shipment's status anytime.",
    },
];

export default function HowItWorks() {
    return (
        <Section>
            <div className="py-12   flex flex-col lg:flex-row items-center gap-12">
                {/* Left Content */}
                <div className="lg:w-1/2">
                    <p className="text-primary dark:text-primary bg-primary/20 inline rounded-xl brightness-125 p-3 font-bold uppercase">
                        How It Works
                    </p>
                    <h2 className="text-4xl font-bold text-gray-900  my-4">
                        Digital Freight That Saves Your Time!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Logistics solutions refer to the management and coordination of the movement
                        of goods and resources from one place to another. The goal of logistics
                        solutions is to ensure that goods...
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {steps.map((step, index) => (
                            <Card
                                key={index}
                                className="p-4 flex items-start gap-4 bg-white shadow-md"
                            >
                                <step.icon className="w-12 h-12 text-accent" />
                                <div>
                                    <h3 className="font-bold text-lg">{step.title}</h3>
                                    <p className="text-gray-500 text-sm">{step.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative lg:w-1/2">
                    <img
                        src="/images/logistics-team.jpg"
                        alt="Logistics Team"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover"
                    />
                    {/* Overlapping Stats Box */}
                    <div className="absolute bottom-5 left-5 bg-accent text-white px-6 py-4 rounded-lg shadow-md flex items-center gap-3">
                        <Package className="w-10 h-10" />
                        <div>
                            <p className="text-3xl font-bold">458m</p>
                            <p className="text-sm">Delivered Goods</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
