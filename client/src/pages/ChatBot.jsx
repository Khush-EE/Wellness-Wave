import React, { useState } from 'react'
import { Button, Input } from '../components/index'
import { useForm } from "react-hook-form"
import { OpenAI } from "openai"
import profilePic from "../assets/profilePic.jpg"
import bot from "../assets/bot.jpg"

function ChatBot() {

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            query: ""
        }
    });

    // const openAi = new OpenAIApi(configuration);
    //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
    //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

    //8c6889813fca47d7913fc3fee0d3f675
    //f802647c64cb4449acb270d7f19eac36
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
            console.log(response);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-[100vw] h-[80vh] overflow-hidden mt-[15vh] flex items-start justify-center gap-6'>
            <div className='w-[30%] h-[95%] border-2 border-slate-200 bg-slate-50 bg-opacity-50 shadow-xl rounded-lg m-4 p-3'>
                Chat History and suggestion
            </div>
            <div className='w-[70%] h-[95%] flex flex-col border-2 shadow-xl border-slate-200 rounded-lg items-start justify-between m-4 p-3'>
                <div className='w-[100%] h-[85%] flex flex-col-reverse gap-0 p-3 overflow-y-scroll bg-opacity-50 bg-slate-200 rounded-sm'>
                    {chats.map((chat, index) => (
                        <div key={index} className={`flex items-start ${(chat.role === 'assistant')?'':'flex-row-reverse'}`}>
                            <img src={chat.role === 'assistant'?bot:profilePic} className='w-[50px] h-[50px] object-cover rounded-full ' />
                            <p className='bg-yellow-200 bg-opacity-50 rounded-lg break-words max-w-[70%] text-lg border-0 m-4 p-3'>{chat.content}</p>
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