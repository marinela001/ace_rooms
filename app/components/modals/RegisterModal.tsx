'use client'

import useRegisterModal from '@/app/hooks/userRegisterModal';
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { FieldValues, useForm,SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';


function RegisterModal() {


    const registerModal =useRegisterModal();
    const loginModal = useLoginModal();


    const [isLoading,setIsLoading] = useState(false);
    const { register, handleSubmit,formState: { errors } } = useForm<FieldValues>({
       defaultValues:{
        name:'',
        email:'',
        password:''}
    });


    const onsubmit : SubmitHandler <FieldValues> = (data)=>{

        setIsLoading(true);

        axios.post('api/register',data).then((res)=>{
            registerModal.onClose();
            if(res.status===200){
              toast.success('User registered succesfully!')
            }
        })
        .catch((error)=>{

          toast.error('Something went wrong!')
        })
        .finally(()=>{
            setIsLoading(false)
        })

        
 
        
        
        



    } 

    const onToggle = useCallback(() => {
    
      registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])
    
    const bodyContent = (
          
            <div className='flex flex-col gap-3'>
              <Heading
              title='Welcome to Ace Rooms'
              subtitle='Create a new Account'
              center={true}
              />
              <Input  id='email' label='Email' register={register} disabled={isLoading} errors={errors} required/>
              <Input  id='name' label='Name' register={register} disabled={isLoading} errors={errors} required/>
              <Input  id='password' type='password' label='Password' register={register} disabled={isLoading} errors={errors} required/>

            </div>
          )


    const footerContent = (

      <div className="flex flex-col gap-2">

        <hr />
        <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={()=>{signIn('google')}}
        />
        
        <Button
        outline
        label='Continue with GitHub'
        icon={AiFillGithub}
        onClick={()=>{signIn('github')}}
        />
     <div className="text-[gray] flex flex-row gap-1 justify-center">
          Already have an acount ?{' '}
<div className="cursor-pointer" onClick={()=>{onToggle()}}>
              Log In now</div>
        </div>
      </div>
    )

  return (
    <div>
      <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title='Register'
      actionLabel='continue'
      onSubmit={handleSubmit(onsubmit)}
      body={bodyContent}
      footer={footerContent}
      />
    </div>
  )
}

export default RegisterModal
