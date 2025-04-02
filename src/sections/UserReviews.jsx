import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import Section from '@/components/Section';

export default function UserReviews() {
    // ParcelPop User Reviews Data
    const reviews = [
        {
            id: 1,
            name: 'Ayesha Rahman',
            location: 'Dhaka, Bangladesh',
            review: 'ParcelPop has made my online business so much easier! Their deliveries are always on time.',
            rating: 5,
            imgSrc: '/userReviews/1.jpg',
        },
        {
            id: 2,
            name: 'John Smith',
            location: 'New York, USA',
            review: 'Super fast and reliable! I have used ParcelPop multiple times, and my packages have always arrived safely.',
            rating: 5,
            imgSrc: '/userReviews/2.jpg',
        },
        {
            id: 3,
            name: 'Maria Lopez',
            location: 'Toronto, Canada',
            review: 'I love the affordable rates and excellent customer service! Highly recommended for international deliveries.',
            rating: 4,
            imgSrc: '/userReviews/3.jpg',
        },
        {
            id: 4,
            name: 'Ahmed Hassan',
            location: 'Dubai, UAE',
            review: 'ParcelPop’s express delivery service is a game-changer! My parcels arrive quicker than expected every time.',
            rating: 5,
            imgSrc: '/userReviews/4.jpg',
        },
        {
            id: 5,
            name: 'Samantha Lee',
            location: 'London, UK',
            review: 'I have never had a lost or damaged package with ParcelPop. Their secure handling is impressive!',
            rating: 5,
            imgSrc: '/userReviews/5.jpg',
        },
    ];

    return (
        <Section className="py-8">
            <div className="">
                <h2 className="text-3xl font-bold text-center mb-4">What Our Customers Say</h2>
                <p className="text-center mb-8 ">
                    See what our happy customers have to say about their ParcelPop delivery
                    experience.
                </p>

                <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    loop={true}
                    pagination={{ clickable: true }}
                    modules={[Autoplay]}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1000: { slidesPerView: 3 },
                    }}
                    className="h-[500px]" // Set a fixed height for the Swiper container
                >
                    {reviews.map(review => (
                        <SwiperSlide key={review.id} className="h-full">
                            {' '}
                            {/* Ensure the slide takes full height */}
                            <div className="bg-card dark:bg-dark-card shadow-lg p-4 rounded-lg flex flex-col h-full">
                                {' '}
                                {/* Set height to full */}
                                <img
                                    src={review.imgSrc}
                                    alt={review.name}
                                    className="w-full h-[250px] object-cover rounded-lg mb-4" // Fixed height for the image
                                />
                                <div className="flex flex-col flex-grow">
                                    <blockquote className="text-lg mb-4 flex-grow">
                                        &quot;{review.review}&quot;
                                    </blockquote>
                                    <div className="flex items-center gap-2 mb-2">
                                        {Array(review.rating)
                                            .fill()
                                            .map((_, index) => (
                                                <span
                                                    key={index}
                                                    className="text-yellow-500 text-xl"
                                                >
                                                    ★
                                                </span>
                                            ))}
                                    </div>
                                    <h3 className="font-bold">{review.name}</h3>
                                    <p className="text-primary">{review.location}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Section>
    );
}
