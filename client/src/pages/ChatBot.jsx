import React, { useEffect, useState } from 'react'
import { Button, Input } from '../components/index'
import { useForm } from "react-hook-form"
import { OpenAI } from "openai"
import { useSelector } from "react-redux"
import profilePic from "../assets/profilePic.jpg"
import bot from "../assets/bot.jpg"
// import axios from "axios";

function ChatBot() {

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            query: ""
        }
    });
    
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const submit = async (data) => {
        setLoading(true);
        setValue("query", "")
        try {
            const openai = new OpenAI({
                apiKey: import.meta.env.VITE_OPENAI_API_KEY,
                dangerouslyAllowBrowser: true
            })
            setChats((prev) => [{ role: 'user', content: data.query }, ...prev])
            const response = await openai.chat.completions.create({
                messages: [...chats, { role: "user", content: data.query }],
                model: "gpt-3.5-turbo"
            })
            setChats((prev) => [{ role: 'assistant', content: response.choices[0].message.content }, ...prev])
            // console.log(response);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const suggestions = [ "The impact of social media on mental health", "Mental health stigma and ways to reduce it", "Strategies for managing stress and anxiety", "Mental health challenges faced by college students", "The connection between physical health and mental well-being", "The benefits of mindfulness and meditation for mental health", "Understanding different mental health disorders", "The importance of self-care and setting boundaries for mental health", "The role of therapy and counseling in mental health treatment", "Mental health in the workplace and promoting a healthy work environment" ]

    return (
        <div className='w-[100vw] h-[80vh] overflow-hidden mt-[15vh] flex items-start justify-center gap-6'>
            <div className='w-[30%] h-[95%] flex flex-col items-start justify-start gap-4 border-2 border-slate-200 bg-slate-50 bg-opacity-50 shadow-xl rounded-lg m-4 p-3 overflow-scroll'>
                <h1 className='text-2xl font-semibold text-yellow-600 underline' >Suggestions</h1>
                {suggestions.map((suggestion, index) => <h1 key={index} className='border-2 rounded-lg bg-gray-200 bg-opacity-50 shadow-sm hover:bg-gray-200 cursor-pointer p-2' onClick={() => setValue("query", suggestion)}>
                    {suggestion}
                </h1>)}
            </div>
            <div className='w-[70%] h-[95%] flex flex-col border-2 shadow-xl border-slate-200 rounded-lg items-start justify-between m-4 p-3'>
                <div className='w-[100%] h-[85%] flex flex-col-reverse gap-0 p-3 overflow-y-scroll bg-opacity-50 bg-slate-200 rounded-sm'>
                    {chats.map((chat, index) => (
                        <div key={index} className={`flex items-start ${(chat.role === 'assistant')?'':'flex-row-reverse'}`}>
                            <img src={chat.role === 'assistant'?bot:profilePic} className='w-[50px] h-[50px] object-cover rounded-full ' />
                            <p className='bg-yellow-200 bg-opacity-50 rounded-lg break-words relative max-w-[70%] text-lg border-0 m-3 p-4'>{chat.content}<span className='text-sm text-gray-600 absolute bottom-2 right-2'>{(new Date).toLocaleTimeString('en-US').slice(0, 4)}</span></p>
                        </div>
                    ))}
                </div>
                <div>
                    <form onSubmit={handleSubmit(submit)} className='flex items-center justify-center gap-2'>
                        <Input name='query' register={register} placeholder='Search Here...' />
                        <Button type='submit' className='disabled:opacity-50 w-[7vw] h-[7vh] font-normal hover:bg-yellow-700 transition-colors' disabled={loading}>Ask</Button>
                        <Button className='w-[7vw] h-[7vh] font-normal bg-transparent border-2 border-yellow-600 hover:bg-yellow-600 transition-colors'>New Chat</Button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ChatBot