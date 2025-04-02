import { ShieldCheck, Truck, MapPin, CheckCircle, DollarSign, Headset, Leaf } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Section from '@/components/Section';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import GradientEffect1 from '@/components/utils/GradientEffect1';

export default function FeaturesSection() {
    const features = [
        {
            icon: <ShieldCheck size={32} className="text-primary" />,
            title: 'Parcel Safety',
            description: 'Your parcels are handled with utmost care and security.',
        },
        {
            icon: <Truck size={32} className="text-primary" />,
            title: 'Super Fast Delivery',
            description: 'Experience lightning-fast delivery with our optimized logistics.',
        },
        {
            icon: <MapPin size={32} className="text-primary" />,
            title: 'Live Tracking',
            description: 'Track your parcel in real-time from pickup to delivery.',
        },
        {
            icon: <CheckCircle size={32} className="text-primary" />,
            title: 'Reliable Service',
            description: 'We ensure timely and consistent delivery, every time.',
        },
        {
            icon: <DollarSign size={32} className="text-primary" />,
            title: 'Affordable Pricing',
            description: 'Get cost-effective delivery solutions without hidden fees.',
        },
        {
            icon: <Headset size={32} className="text-primary" />,
            title: '24/7 Customer Support',
            description: 'Our team is available around the clock to assist you.',
        },
        {
            icon: <Leaf size={32} className="text-primary" />,
            title: 'Eco-Friendly Packaging',
            description: 'We use sustainable materials for a greener future.',
        },
    ];

    const bgColors = [
        'bg-blue-100 dark:bg-blue-900/20',
        'bg-green-100 dark:bg-green-900/20',
        'bg-yellow-100 dark:bg-yellow-900/20',
        'bg-red-100 dark:bg-red-900/20',
        'bg-purple-100 dark:bg-purple-900/20',
        'bg-pink-100 dark:bg-pink-900/20',
        'bg-gray-100 dark:bg-gray-900/20',
    ];

    return (
        <Section className={'relative'}>
            <div className="container mx-auto text-center">
                <div className="bg-card/20 dark:bg-dark-card/20 p-8 rounded-xl border border-border dark:border-dark-border shadow-lg backdrop-blur-md">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                        <div className="text-left max-w-lg">
                            <div className="text-sm font-semibold uppercase tracking-wide text-primary bg-primary/10 px-4 py-1 inline-block rounded-xl brightness-125">
                                Features
                            </div>
                            <h2 className="text-3xl font-bold mt-3">What we provide</h2>
                            <p className="mt-2 text-muted-foreground dark:text-dark-muted-foreground">
                                We offer seamless parcel delivery with top-notch security, real-time
                                tracking, and ultra-fast logistics to enhance your experience.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <Carousel>
                            <CarouselContent>
                                {features.map((feature, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="basis-1/3 mobile-lg:basis-1/2 mobile-sm:basis-full"
                                    >
                                        <Card
                                            className={`shadow-md hover:shadow-lg transition p-6 text-foreground dark:text-dark-foreground border-0 h-full ${
                                                bgColors[index % bgColors.length]
                                            }`}
                                        >
                                            <CardHeader className="flex items-center justify-center flex-col text-center">
                                                <div className="bg-accent dark:bg-dark-accent p-4 rounded-full flex justify-center items-center border border-border dark:border-dark-border">
                                                    {feature.icon}
                                                </div>
                                                <CardTitle className="mt-4 text-lg font-semibold">
                                                    {feature.title}
                                                </CardTitle>
                                                <CardDescription className="mt-2 text-muted-foreground dark:text-dark-muted-foreground">
                                                    {feature.description}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="absolute -top-10 right-10">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>

            <GradientEffect1 />
        </Section>
    );
}
