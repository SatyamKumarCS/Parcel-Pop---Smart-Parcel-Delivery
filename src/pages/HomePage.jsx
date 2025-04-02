import Page from '@/components/Page';
import AppStatistics from '@/sections/AppStatistics';
import FAQ from '@/sections/FAQ';
import FeaturesSection from '@/sections/FeaturesSection';
import HeroSection from '@/sections/HeroSection';
import HowItWorks from '@/sections/HowItWorks';
import OurServices from '@/sections/OurServices';
import TeamExpertise from '@/sections/TeamExpertise';
// import PricingSection from '@/sections/PricingSection';
import TopDeliveryMen from '@/sections/TopDeliveryMen';
import UserReviews from '@/sections/UserReviews';

export default function HomePage() {
    return (
        <Page>
            <HeroSection />
            <AppStatistics />
            <FeaturesSection />
            <TopDeliveryMen />
            <TeamExpertise />
            <HowItWorks />
            <OurServices />
            {/* <PricingSection /> */}
            <UserReviews />
            <FAQ />
        </Page>
    );
}
