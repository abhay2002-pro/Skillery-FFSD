import {
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Textarea,
    VStack,
  } from '@chakra-ui/react';

import React, { useState } from 'react';

// import './SignUp';

const SignUp = (event) => {
    const [enteredName, setEnteredName] = useState('');

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPwd, setEnteredpwd] = useState('');

    const [enteredcnfPwd, setEnteredcnfpwd] = useState('');


    const [error,setError] = useState({
        enteredName: false,
        enteredEmail: false,
        enteredPwd: false,
        enteredcnfPwd: false
    })


    const NameChangeHandler = (event) => {
        setEnteredName(event.target.value);
        if(event.target.value===''){
            setError({...error,enteredName:true});
        }
        else{
            setError({...error,enteredName:false});
        }
    };

    const EmailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
        if(event.target.value===''){
            setError({...error,enteredEmail: 'Email is Required'})
        }

        else{
            setError({...error,enteredEmail: false});
        }
    };

    const pwdChangeHandler = (event) => {
        setEnteredpwd(event.target.value);
        if(event.target.value===''){
            setError({...error,enteredPwd:true});
        }
        else{
            setError({...error,enteredPwd:false});
        }
    };

    const cnfpwdChangeHandler = (event) => {
        setEnteredcnfpwd(event.target.value);
        if(event.target.value===''){
            setError({...error,enteredcnfPwd:'Password is required'});
        }
        else{
            setError({...error,enteredcnfPwd:false});
        }
    };


    const submitHandler = (event) => {
        event.preventDefault();

        if(enteredName===''){
            setError({...error,enteredName: true})
        }

       else if(enteredEmail===''){
            setError({...error,enteredEmail:'Email is Required'});
        }

        else if(enteredPwd===''){
            setError({...error,enteredPwd: true})
        }

        else if(enteredcnfPwd===''){
            setError({...error,enteredcnfPwd: 'Required'})
        }

        else if(enteredcnfPwd !== enteredPwd) {
            setError({
              ...error,
              enteredcnfPwd: "Password and confirm password should be same",
            });
            return;
          }

        else{


        const submittedData = {
            name: enteredName,
            email: enteredEmail,
            password: enteredPwd,
            cnfpassword: enteredcnfPwd
        };

        console.log(submittedData);
    }
    }

    return (
        <Container minH={'95vh'} maxW="container.sm" paddingY="8">
            <VStack h="full" justifyContent="center" spacing="16">
        <Heading children="Create Account for Skillery" m={'8'} /> 
            <form style={{width: "100%"}} onSubmit={submitHandler}>

              <FormControl isInvalid={error.enteredName}> 
                <FormLabel htmlFor="name" children="Name"/>
                <Input type="text" id="name" name="name" value={enteredName} onChange={NameChangeHandler} 
                focusBorderColor='yellow.500'/>
                <FormErrorMessage>Name is required!</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error.enteredEmail}>
                <FormLabel htmlFor="email" children="Email Address"/>
                <Input type="text" id="email" name="email" value={enteredEmail} onChange={EmailChangeHandler} 
                focusBorderColor='yellow.500'/>
                <FormErrorMessage>Email is Required.</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error.enteredPwd}>
                <FormLabel htmlFor="pwd" children="Enter Password"/>
                <Input type="password" id="pwd" name="pwd" value={enteredPwd} onChange={pwdChangeHandler} autoComplete="on"
                focusBorderColor='yellow.500'
                />
                <FormErrorMessage>Password is required.</FormErrorMessage>
                </FormControl>
             <FormControl  isInvalid={error.enteredcnfPwd}>
                <FormLabel htmlFor="cnfpwd" children="Confirm Password"/>
                <Input type="password" id="cnfpwd" name="cnfpwd" value={enteredcnfPwd} onChange={cnfpwdChangeHandler} autoComplete="on"
                focusBorderColor='yellow.500'/>
                <FormErrorMessage>{error.enteredcnfPwd}</FormErrorMessage>
                </FormControl> 

                <Button my="4" colorScheme="yellow" type="submit">
                Submit
            </Button>
            </form>
        </VStack>  
        </Container>
    );
}

export default SignUp;