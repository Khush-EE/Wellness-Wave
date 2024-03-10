import React, { useState } from 'react'
import WriteEditor from '../components/WriteEditor.jsx'
import { useForm } from 'react-hook-form'
import { Input, Button } from "../components/index.js"

function WriteForum() {

    const [tags, setTags] = useState([]);

    const { register, handleSubmit, control, getValues } = useForm();

    const addTag = () => {
        let value = getValues("tag");
        console.log(value)
        setTags((prev) => prev?.filter((tag) => tag !== value))
        setTags((prev) => [value, ...prev])
        console.log(tags)
    }

    const submit = async (data) => {
        console.log(data);
    }

    const allTagsList = ["Anxiety", "Depression", "ADHD", "Bullying", "Psychosis", "Schizophrenia", "Addictions", "Suicide", "Disorders", "Abuse"]

    return (
        <div className='w-full h-full mt-[10vh]'>
            <form onSubmit={handleSubmit(submit)} className='w-full h-full flex flex-col items-center justify-start'>
                <Input name='title' register={register} placeholder='Title...' />
                <div className='w-full flex items-center justify-start'>
                    <div className='w-[30%] h-full flex flex-col items-center justify-center border-2 m-6 rounded-xl'>
                        <div className='flex items-center justify-center'>
                            <select {...register("tag")} className='w-[10vw] h-[5vh] p-2 m-2 rounded-lg'>
                                {allTagsList.map((tag, index) => <option key={index} value={tag}>
                                    {tag}
                                </option>)}
                            </select>
                            <Button onClick={addTag} className='w-[5vw] h-[5vh]' type='button'>Add</Button>
                        </div>
                        <div className='bg-slate-transparent rounded-lg p-2 m-0 flex items-start justify-start flex-wrap gap-4 border-0 max-w-[25vw]'>
                            {tags?.map((tag, index) => <div key={index} className='bg-slate-200 p-2 m-2 flex flex-wrap rounded-xl'>
                                {tag}
                            </div>)}
                        </div>
                    </div>
                    <WriteEditor name='description' control={control} defaultValue='Write Here...' />
                </div>
            </form>
        </div>
    )
}

export default WriteForum