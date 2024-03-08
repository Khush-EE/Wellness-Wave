import React, { useEffect, useState } from 'react';
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import pic4 from "../assets/pic4.jpg";
import { Button, Spinner } from "./index";
import axios from "axios";

function Carousel() {
    const [headlines, setHeadlines] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const headResponse = await axios.get("https://newsapi.org/v2/top-headlines?q=health&apiKey=0683efddcc9b4d739020691b27b2a593");
                setHeadlines(headResponse.data.articles);
                const articleResponse = await axios.get("https://newsapi.org/v2/everything?q=health&apiKey=0683efddcc9b4d739020691b27b2a593&pageSize=6")
                setArticles(articleResponse.data.articles);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        const slider = document.getElementById('slider');
        let counter = 0;
        setInterval(() => {
            if (slider) {
                if (counter === 3) {
                    counter = 0;
                } else {
                    counter++;
                }
                slider.style.transform = `translateX(-${counter * 100}%)`
            }
        }, 5000);

        return () => clearInterval();
    }, []);

    return (
        <>

======
            <div className='w-[100vw] h-[100vh] relative overflow-hidden'>
                <div className='w-full h-full absolute z-10 left-0 bottom-0 flex flex-col items-start justify-end gap-0 bg-slate-400 bg-opacity-70'>
                    <h1 className='text-6xl text-yellow-50 opacity-85 p-2 backdrop-blur-sm font-extrabold rounded-sm mx-16'>Welcome To <span className='text-yellow-600'>Sukoon Space!</span></h1>
                    <p className='text-2xl text-yellow-50 opacity-70 w-[70%] backdrop-blur-sm p-2 rounded-lg mb-[0%] font-bold mx-16 text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quis odio ab officiis minus rem accusamus cupiditate cumque praesentium quisquam! Doloribus quasi earum minus nesciunt, praesentium vero iusto nihil. Aperiam, eos eveniet! Ipsam delectus perferendis obcaecati nostrum dicta quo autem distinctio labore cum. Aperiam optio commodi nihil beatae quae inventore iure nemo sunt vel expedita.</p>
                    <div className='w-full ml-20 mt-8 mb-32'>
                        <Button className='mx-4 opacity-70'>Get Help</Button>
                        <Button className='mx-4 opacity-70 text-center'>Explore More</Button>
                    </div>
                </div>
                <div className='w-full h-full absolute top-0 left-0 transition duration-300 scroll-smooth ' id='slider'>
                    <img src={pic2} className='absolute left-0 top-0 w-full h-full object-cover' />
                    <img src={pic1} className='absolute left-[100%] top-0 w-full h-full object-cover' />
                    <img src={pic3} className='absolute left-[200%] top-0 w-full h-full object-cover' />
                    <img src={pic4} className='absolute left-[300%] top-0 w-full h-full object-cover' />
                </div>
            </div>
            {!loading ? <div className='w-full h-full flex items-center justify-start gap-10'>
                <div className='w-[30%] h-full flex flex-col items-center justify-start'></div>
                <div className='w-[60%] h-full flex flex-col items-center justify-start'>
                    {articles.map((article, index) => (
                        <div key={index} className='w-[80%] h-[20%] border-2'>
                            <div>{article.title}</div>
                            <p>{article.description}</p>
                        </div>
                    ))}
                </div>
            </div> : <Spinner />}
        </>
    );
}

export default Carousel;
