import Section from '@/components/Section';

const TeamExpertise = () => {
    return (
        <Section>
            <div className="container mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left: Image */}
                <div className="relative w-full ">
                    <img
                        src={'/images/team-expertise.jpg'}
                        alt="Freight & Warehousing"
                        className="rounded-lg"
                    />
                </div>

                {/* Right: Content */}
                <div>
                    <h4 className="text-accent dark:text-accent bg-accent/20 rounded-xl inline p-3 font-semibold tracking-wide uppercase mb-2">
                        Team Expertise
                    </h4>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 my-4">
                        We Provide Full Assistance in <br /> Freight & Warehousing
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Netus senectus neque primis cum fermentum hac dictum luctus leo faucibus
                        bibendum sem conubia sodales vitae eros orci, platea porttitor scelerisque
                        nec dis mollis venenatis quam.
                    </p>

                    {/* Progress Bars */}
                    <div className="space-y-4">
                        <ProgressBar label="Air Freight" percentage={86} color="bg-accent" />
                        <ProgressBar label="Land Transport" percentage={95} color="bg-accent" />
                        <ProgressBar label="Ocean Freight" percentage={55} color="bg-accent" />
                    </div>
                </div>
            </div>
        </Section>
    );
};

const ProgressBar = ({ label, percentage, color }) => {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-gray-800 font-medium">{label}</span>
                <span className="text-gray-800 font-medium">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                    className={`${color} h-2.5 rounded-full`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default TeamExpertise;
