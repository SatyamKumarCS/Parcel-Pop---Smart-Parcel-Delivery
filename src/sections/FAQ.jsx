import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';
import Section from '@/components/Section';

export default function FAQ() {
    return (
        <Section className="py-12">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className=" font-bold text-center mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            How does ParcelPop&apos;s delivery system work?
                        </AccordionTrigger>
                        <AccordionContent>
                            ParcelPop offers fast and secure delivery services. You place an order,
                            and we pick it up from the sender and deliver it to the recipient. Our
                            tracking system keeps you updated at every step.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can I track my parcel?</AccordionTrigger>
                        <AccordionContent>
                            You can track your parcel in real-time using your tracking ID on our
                            website or mobile app.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>What are the delivery time estimates?</AccordionTrigger>
                        <AccordionContent>
                            Standard delivery takes 2-5 business days, while express delivery can be
                            completed within 24-48 hours, depending on the location.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>
                            Does ParcelPop handle international shipping?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes, we provide international shipping services with affordable rates
                            and fast delivery times.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger>
                            What should I do if my package is delayed?
                        </AccordionTrigger>
                        <AccordionContent>
                            If your package is delayed beyond the estimated time, please contact our
                            customer support team for assistance.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </Section>
    );
}
