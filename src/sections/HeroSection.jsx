import Section from '../components/Section';
import TrackParcel from '../components/TrackParcel';
import GradientEffect1 from '../components/utils/GradientEffect1';
import { TypeAnimation } from 'react-type-animation';

export default function HeroSection() {
    return (
        <Section className={'!my-10 relative'}>
            <div className="flex tablet-lg:flex-col-reverse">
                <div className="basis-1/2 flex flex-col justify-center gap-5 tablet-lg:px-10 mobile-lg:px-2">
                    <h1>Manage Parcels with Ease and Precision</h1>
                    <h5>
                        Streamline your parcel tracking, delivery, and management process with
                        ParcelPop – your ultimate parcel management solution.
                    </h5>
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed out once, initially
                            'Track your shipments in real-time.',
                            1000, // wait 1s before replacing "Mice" with "Hamsters"
                            'Simplify parcel management.',
                            1000,
                            'Deliver with confidence.',
                            1000,
                        ]}
                        wrapper="h5"
                        speed={50}
                        repeat={Infinity}
                        className="!text-secondary"
                    />
                    <TrackParcel />
                </div>
                <div className="basis-1/2 tablet-lg:px-10 mobile-lg:px-2">
                    <img src="/arts/HeroImage.svg" alt="" />
                </div>
            </div>

            <GradientEffect1 />
        </Section>
    );
}
