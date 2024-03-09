
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar2';
import SearchResultsLists from '../components/SearchResultsLists';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            windowWidth: window.innerWidth,
            results: [], // State for search results
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ windowWidth: window.innerWidth });
    };

    setResults = (results) => {
        this.setState({ results });
    };

    render() {
        const { windowWidth, results } = this.state;
        const marginBottom = windowWidth >= 768 ? '2rem' : '110rem';

        return (
            <div style={{ marginBottom }}>
                <div className=" mt-32 bg-white flex flex-col items-center justify-center overflow-hidden overflow-y-scroll z-20 ">
                    <div className="r m-6 max-h-48 overflow-hidden overflow-y-scroll position-absolute z-30 top-28 bg-white rounded-2xl no-scrollbar ">
                        <SearchBar setResults={this.setResults} />
                        <SearchResultsLists results={results} />
                    </div>
                </div>
                <div className="  flex  flex-wrap  h-screen md:space-x-24 ">
                
                    <div id=' First-dropdown-scroll' className='  mt-36 md:mt-0 mb-80 md:mb-8 rounded-2xl'>
                        <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3 rounded-2xl w-96 hover: bg-orange-400">
                            <a className="navbar-brand text-3xl text" href="#">Description</a>
                            <ul className="nav nav-pills">
                                
                                <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
                                <ul className="dropdown-menu">
                                    <li ><a className="dropdown-item" href="#scrollspyHeading1">First</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li ><a className="dropdown-item" href="#scrollspyHeading2">Second</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#scrollspyHeading3">Third</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#scrollspyHeading4">Fourth</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#scrollspyHeading5">Fifth</a></li>
                                </ul>
                                </li>
                            </ul>
                            </nav>
                            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className=" no-scrollbar scrollspy-example bg-body-tertiary p-3 rounded-2 h-80 w-96 overflow-hidden overflow-y-scroll " tabindex="0">
                            <h2 id="scrollspyHeading1 " className=' text-2xl' >Articles and Resources:</h2>
                            <p className=' hover:bg-orange-200'>Access a wealth of articles, guides, and resources covering various mental health topics, from coping mechanisms to treatment options.</p>
                            <li><hr className=" divide-orange-400"/></li>
                            <h2 id="scrollspyHeading2" className=' text-2xl'>Online Therapy:</h2>
                            <p className=' hover:bg-orange-200'>Connect with licensed therapists from the comfort of your home through our secure online therapy platform. Receive personalized support and guidance tailored to your unique needs.</p>
                            <li><hr className="divide-orange-400"/></li>
                            <h2 id="scrollspyHeading3" className=' text-2xl'>Support Groups:</h2>
                            <p className=' hover:bg-orange-200'> Join virtual support groups facilitated by trained professionals and connect with others who may be experiencing similar challenges. Share your experiences, receive encouragement, and build a supportive community.</p>
                            <li><hr className="divide-orange-400"/></li>
                            <h2 id="scrollspyHeading4" className=' text-2xl'>Self-Assessment Tools: </h2>
                            <p className=' hover:bg-orange-200'>Take advantage of our self-assessment tools to gain insight into your mental health status and identify areas that may require attention. These tools are designed to empower you to take proactive steps towards improvement.</p>
                            <li><hr className="divide-orange-400"/></li>
                            <h2 id="scrollspyHeading5" className=' text-2xl'>24/7 Helpline:</h2>
                            <p className=' hover:bg-orange-200'> In times of crisis or distress, our 24/7 helpline is available to provide immediate support and assistance. Our team of trained professionals is here to listen, offer guidance, and connect you with additional resources if needed.</p>
                            </div>
                    </div> 
                    
                    <div id='news-para' className="  container md:w-1/3  md:mt-20" >
                        <ul className="container rounded-xl">
                            <li>
                                <h2 className='text-2xl'>Licensed and Experienced Professionals:</h2>
                                <p>Our team consists of licensed mental health professionals with years of experience in their respective fields. They have undergone rigorous training and education to provide evidence-based care and support.</p>
                            </li>
                            <hr />
                            <li>
                                <h2 className='text-2xl'>Continuing Education and Training:</h2>
                                <p>Our professionals are committed to staying up-to-date with the latest advancements and best practices in mental health care. They regularly participate in continuing education and training programs to enhance their skills and knowledge.</p>
                            </li>
                            <hr />
                            <li>
                                <h2 className='text-2xl'>Evidence-Based Practices:</h2>
                                <p>We prioritize evidence-based practices in our approach to mental health care. Our professionals utilize scientifically proven therapeutic techniques and treatment modalities to ensure the effectiveness of interventions.</p>
                            </li>
                            <hr />
                            <li>
                                <h2 className='text-2xl'>Holistic Approach to Wellness:</h2>
                                <p>We take a holistic approach to mental health and wellness, considering the interconnectedness of physical, emotional, and social factors. Our professionals address all aspects of well-being to promote comprehensive healing and growth.</p>
                            </li>
                            <hr />
                            <li>
                                <h2 className='text-2xl'>Ethical Standards and Confidentiality:</h2>
                                <p>We adhere to strict ethical standards and confidentiality guidelines to ensure the privacy and confidentiality of our clients. Your personal information and therapeutic sessions are treated with the utmost discretion and respect.</p>
                            </li>
                            <hr />
                            <li>
                                <h2 className='text-2xl'>Client Satisfaction and Feedback:</h2>
                                <p>We value client feedback and continuously strive to improve the quality of our services based on client experiences and suggestions. Your satisfaction and well-being are our top priorities.</p>
                            </li>
                            <hr />
                            <li>
                                <h2 className='text-2xl'>Comprehensive Screening and Selection Process:</h2>
                                <p>We carefully screen and select our doctors and therapists to ensure they meet our high standards of expertise, professionalism, and compassion. Each professional undergoes a thorough background check and verification process.</p>
                            </li>
                            <hr />
                        </ul>

                    </div>
                    <div id="first-box-third col" className='  '>
                        

                        <div id='Counsellors-carousel' className=' '>
                            <div id="carouselExampleCaptions" className="carousel slide w-96 h-auto md:mb-3 ">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                
                                <div className="carousel-inner">
                                    <div class="carousel-item active">
                                    <img src="https://felicity-uploads.s3.ap-south-1.amazonaws.com/profile/1634818300669-6V0Vd.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLITOL2MEF2TPDFP%2F20240307%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240307T095354Z&X-Amz-Expires=18000&X-Amz-Signature=06a36d563efcddb47c6334b718cdcca4ae660d42604423a9419a5808c1261315&X-Amz-SignedHeaders=host" className="d-block w-100 rounded-xl drop-shadow-2xl" alt="..."/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Puja Roy</h5>
                                        <p>Puja, a gold medallist in psychology, has been practicing professionally...</p>
                                    </div>
                                    </div>
                                    <div className="carousel-item">
                                    <img src="https://felicity-uploads.s3.ap-south-1.amazonaws.com/profile/51f49d8d03ec34ee754f0fa6e717e64a-rs.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLITOL2MEF2TPDFP%2F20240307%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240307T095510Z&X-Amz-Expires=18000&X-Amz-Signature=e1cea0d9fdb5c17a1fee41993b96825985708ae06514b530f3ef4dab5c1e052d&X-Amz-SignedHeaders=host" className="d-block w-100 rounded-xl drop-shadow-2xl" alt="..."/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Ahana Ghosh</h5>
                                        <p>Ahana is a Counselling Psychologist. She has extensive experience working with ...</p>
                                    </div>
                                    </div>
                                    <div className="carousel-item">
                                    <img src="https://felicity-uploads.s3.ap-south-1.amazonaws.com/profile/2125f388db5eed63783a10babc68e0b9-rs.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLITOL2MEF2TPDFP%2F20240307%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240307T095630Z&X-Amz-Expires=18000&X-Amz-Signature=03f818f5846ab81425e37780d659009ccfd2c559d23b051c54f01586f9388949&X-Amz-SignedHeaders=host" className="d-block w-100 rounded-xl drop-shadow-2xl" alt="..."/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Akshita Sidardhan</h5>
                                        <p>She is an empathetic and impassioned psychologist. She has a deep desire...</p>
                                    </div>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>

                            </div>
                            <Link to="/News" type="button" className="btn btn-outline-warning flex justify-center position-relative md:mb-72 ">View All Counsellors</Link>
                        </div>

                    </div>
                </div>

                <div id='Second-dropdown-scroll' className=' '>
                    <div>
                        <div className=' position-relative bottom-80 rounded-2xl md:my-0 '>
                                <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3 rounded-2xl w-96 hover: bg-orange-400">
                                    <a className="navbar-brand text-3xl text" href="#">Services We Provide</a>
                                    <ul className="nav nav-pills">
                                        
                                        <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
                                        <ul className="dropdown-menu">
                                            <li ><a className="dropdown-item" href="#scrollspyHeading1">First</a></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li ><a className="dropdown-item" href="#scrollspyHeading2">Second</a></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><a className="dropdown-item" href="#scrollspyHeading3">Third</a></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><a className="dropdown-item" href="#scrollspyHeading4">Fourth</a></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><a className="dropdown-item" href="#scrollspyHeading5">Fifth</a></li>
                                        </ul>
                                        </li>
                                    </ul>
                                    </nav>
                                    <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className=" no-scrollbar scrollspy-example bg-body-tertiary p-3 rounded-2 h-80 w-96 overflow-hidden overflow-y-scroll " tabindex="0">
                                    <h2 id="scrollspyHeading1 " className=' text-2xl' >Individual Therapy: </h2>
                                    <p className=' hover:bg-orange-200'>Access a wealth of articles, guides, and resources covering various mental health topics, from coping mechanisms to treatment options.</p>
                                    <li><hr className=" divide-orange-400"/></li>
                                    <h2 id="scrollspyHeading2" className=' text-2xl'>Family Therapy: </h2>
                                    <p className=' hover:bg-orange-200'>Assistance for families dealing with conflicts, transitions, or behavioral issues within the family unit.</p>
                                    <li><hr className="divide-orange-400"/></li>
                                    <h2 id="scrollspyHeading3" className=' text-2xl'>Medication Management: </h2>
                                    <p className=' hover:bg-orange-200'> Join virtual support groups facilitated by trained professionals and connect with others who may be experiencing similar challenges. Share your experiences, receive encouragement, and build a supportive community.</p>
                                    <li><hr className="divide-orange-400"/></li>
                                    <h2 id="scrollspyHeading4" className=' text-2xl'>Emergency Response: </h2>
                                    <p className=' hover:bg-orange-200'>Coordination with emergency services and mental health professionals to ensure timely and appropriate intervention during crises.</p>
                                    <li><hr className="divide-orange-400"/></li>
                                    <h2 id="scrollspyHeading5" className=' text-2xl'>Workshops and Webinars:</h2>
                                    <p className=' hover:bg-orange-200'>Educational workshops and webinars covering topics such as stress management, mindfulness, and mental health awareness.</p>
                                </div>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Slider;
