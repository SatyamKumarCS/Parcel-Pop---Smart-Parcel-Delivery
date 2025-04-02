import { Link } from 'react-router';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Section from './Section';

export default function Footer() {
    return (
        <Section className={'bg-base-200 border-t border-border dark:border-dark-border'}>
            <div className="flex justify-between py-10 mobile-lg:flex-col mobile-lg:justify-center mobile-lg:gap-10 ">
                <div className="flex flex-col basis-1/3 items-center gap-2 order-1 mobile-lg:order-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 mobile-lg:justify-center">
                            <FaPhoneAlt className="text-lg" />
                            <span>+880 1608 505647</span>
                        </div>
                        <div className="flex items-center gap-2 mobile-lg:justify-center">
                            <FaEnvelope className="text-lg" />
                            <span>info@parcelpop.com.bd</span>
                        </div>
                        <div className="flex items-center gap-2 mobile-lg:justify-center mobile-lg:text-center mobile-lg:px-4">
                            <FaMapMarkerAlt className="text-lg" />
                            <span>
                                Level-3, Room No-408, Muktobangla Shopping Complex, Mirpur-1, Dhaka,
                                Bangladesh
                            </span>
                        </div>
                    </div>
                </div>
                <div className="basis-1/3 flex flex-col gap-4 items-center text-center mobile-lg:items-center order-2 mobile-lg:order-1">
                    <Link to={'/'}>
                        <img className="h-16" src="/logos/logo.svg" alt="" />
                    </Link>
                    <h5 className="w-4/5">We turn your vision into globally</h5>
                </div>
                <div className="basis-1/3 flex flex-col gap-4 text-right items-end mobile-lg:items-center order-3 mobile-lg:text-center">
                    <strong className="text-xl"> Get In Touch </strong>
                    <p>Questions or feedback? We&apos;d love to hear from you</p>
                </div>
            </div>
            <hr />
            <div className="text-center my-5">
                <p>@2024 ParcelPop | All Rights Reserved.</p>
            </div>
        </Section>
    );
}
