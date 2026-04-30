import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';

const CustomCarousel = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (

        <div
            className='empty-response-container'
        >
            <div className='empty-response custom-shadow col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6' >
                <Carousel activeIndex={index} onSelect={handleSelect} interval={null}
                    className='Carousel-container'
                >
                    <Carousel.Item>
                        <div className="d-flex flex-column justify-content-center align-items-start carousel-item">
                            <h4>Transforming Education with AI-Powered Career Guidance</h4><br></br>
                            <p>Welcome to CareerTrail, your personalized career companion.</p>
                            <p>Our cutting-edge platform leverages the power of generative AI to empower students and cater to the education sector. With features like AI-driven resume analysis, mock interview simulations, and more, CareerTrail is revolutionizing the way we approach career development and education.</p>
                            <p><b>Meet the minds behind &rarr;</b></p>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="d-flex flex-column justify-content-center align-items-start carousel-item">
                            <div className="text-start">
                                <h4>Meet the minds behind</h4>
                                <div className='d-flex flex-column' >
                                    
                                    <div>
                                        <a href='https://www.linkedin.com/in/ananya-singh-28947528b/' target="_blank" rel="noopener noreferrer" style={{
                                         color: 'white',
                                         textDecoration: 'none',
                                         padding: '5px 5px 5px 5px',
                                         display: 'flex',
                                         alignItems: 'center', 
                                       }} >
                                            <FaLinkedin size={30} color="#0077B5" />
                                            ANANYA SINGH
                                        </a>
                                     
                                    </div>
                                    <div>
                                        <a href='https://www.linkedin.com/in/mohammad-rashid-576697264/' target="_blank" rel="noopener noreferrer" style={{
                                         color: 'white',
                                         textDecoration: 'none',
                                         padding: '5px 5px 5px 5px',
                                         display: 'flex',
                                         alignItems: 'center', 
                                       }} >
                                            <FaLinkedin size={30} color="#0077B5" />
                                            MOHAMMAD RASHID 
                                        </a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>


            </div>
        </div>

    )
}

export default CustomCarousel
