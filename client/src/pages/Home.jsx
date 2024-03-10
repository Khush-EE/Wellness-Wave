import React from 'react'
import { Button, Carousel } from '../components/index.js'
import { useState, useEffect } from 'react';
import { Spinner } from '../components';
import noImage from '../assets/noImage.jpg'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Home() {

    const [headlines, setHeadlines] = useState([]);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 631);
        setLoading(true)
            ; (async () => {
                try {
                    const headResponse = await axios.get(`https://newsapi.org/v2/top-headlines?q=health&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`);
                    setHeadlines(headResponse.data.articles);
                    const articleResponse = await axios.get(`https://newsapi.org/v2/everything?q=health&apiKey=${import.meta.env.VITE_NEWS_API_KEY}&pageSize=6&page=${page}`)
                    setArticles(articleResponse.data.articles);
                    console.log(headResponse.data.articles);
                    // console.log(articleResponse.data.articles);
                } catch (e) {
                    console.log(e);
                } finally {
                    setLoading(false);
                }
            })()
    }, [page])

    return (
        <>
            <Carousel />
            {!loading ? <div className='w-full h-full relative flex items-start justify-start gap-10'>

                <div className='w-[30%] h-[100%] m-3 ml-5 top-0 left-0 z-10 flex flex-col items-start justify-start overflow-y-scroll'>
                    <h1 className='text-2xl font-bold underline mt-5'>Top Headlines Today</h1>
                    {
                        headlines.map((headline) => (
                            <div className='relative w-[100%]'>
                                <NavLink className='w-[100%] h-[20%] my-4 flex gap-6 items-center justify-start' to={headline.url} target='__blank'>
                                    <div className='w-[30%] h-[100%] bg-gray-200 p-2 rounded-sm'>
                                        <img src={headline.urlToImage || noImage} className='rounded-sm w-[100%] h-[100%] object-cover' />
                                    </div>
                                    <div>
                                        <div className='font-bold hover:underline'>{headline.title}</div>
                                        <div className='text-md font-semibold text-slate-400 flex justify-between w-full'>
                                            <p>{headline.source?.name}</p>
                                            <p>{headline.publishedAt.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <div className='w-[50%] h-[2px] bg-gray-200 shadow-2xl shadow-gray-200 absolute right-[20%] bottom-0'>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-[2px] h-[80%] bg-gray-200 shadow-2xl shadow-gray-200'>
                </div>
                <div className='w-[80%] h-full flex flex-col items-center justify-start'>
                    <h1 className='text-2xl font-bold underline mt-5'>Top Health News Articles Today</h1>
                    {articles.map((article, index) => (
                        <NavLink to={article.url} target='__blank' className='flex flex-col items-center justify-start'>
                            <div key={index} className='w-[90%] h-[30vh] rounded flex items-center justify-start gap-6 p-3 m-4 cursor-pointer hover:bg-gray-300 transition-colors'>
                                <div className='w-[30%] h-full rounded-lg bg-gray-100 border-2 border-gray-300'>
                                    <img src={article.urlToImage || noImage} className='w-[100%] h-[100%] p-4 object-cover rounded-lg' />
                                </div>
                                <div className='w-[65%] h-[100%] flex flex-col items-center gap-0 justify-start border-b-[0px] border-gray-200'>
                                    <h1 className='text-2xl text-yellow-600 font-semibold self-start'>{article.title}</h1>
                                    <div className='text-md font-semibold text-slate-400 flex justify-between w-full self-start'>
                                        <p>{article.source?.name}</p>
                                        <p>{article.publishedAt.slice(0, 10)}</p>
                                    </div>
                                    <p className='text-xl font-light text-black'>{article.description.slice(0, 200)}</p>
                                </div>
                            </div>
                            <div className='w-[50%] h-[2px] bg-gray-200 shadow-2xl shadow-gray-200'>
                            </div>
                        </NavLink>
                    ))}
                    <div className='p-4 px-10 flex justify-between w-full'>
                        <Button onClick={() => setPage((prev) => prev-1)} disabled={page===1} className='disabled:opacity-50'>Prev</Button>
                        <Button onClick={() => setPage((prev) => prev+1)} disabled={page===articles.totalResults/6}>Next</Button>
                    </div>
                </div>
            </div> : <Spinner />}
        </>
    )
}

export default Home