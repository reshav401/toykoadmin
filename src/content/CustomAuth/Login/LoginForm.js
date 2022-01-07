import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
    Button,
    Grid,
    TextField,
    CircularProgress,
    FormControl,
    Box,
    Card,
    Tooltip,
    Typography,
    Container,
    Alert,
    styled
} from '@mui/material';

import {Formik} from 'formik';
import * as Yup from 'yup';

import { createApiEndpoint, ENDPOINTS } from 'src/apiServices';

const TopWrapper = styled(Box)(
    () => `
        display : flex;
        width : 100%;
        flex : 1;
        padding : 20px;
    `
)

const initialValues = {
    Username : '',
    Password : '',
    Submit : null
}

function LoginForm() {
    const router = useRouter();
    const [isVisible , setIsVisible] = useState(false)
    const [errMessage, setErrMessage] = useState("")

    const {backTo} = router.query
    console.log(backTo)

    const validationSchema = Yup.object().shape({
        Username : Yup.string()
            .max(255)
            .required('The Username is required'),
        Password :  Yup.string()
            .max(255)
            .required('The password is required')
    })

    useEffect(() => {
        if (!errMessage) {
            setIsVisible(false)
            return
        }
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
            setErrMessage(null)
        }, 5000)
        return () => clearTimeout(timer);
    }, [errMessage])

    const onLogin = async (values) => {
        try {
            values = {
                ...values,
                Username : values.Username.trim()
            }
            const data = await createApiEndpoint(ENDPOINTS.LOGIN).login(values)
            localStorage.setItem('Token', data.data.Token)
            localStorage.setItem('Role', data.data.Role)
            localStorage.setItem('Name', data.data.Name)
            
            router.push( backTo? 
                backTo 
                    : 
                '/dashboards/'
            )
        
        } catch(err){
            console.log("err : ", err)
            setErrMessage("The provided Username and Password is not entered Correctly.")
        }
    }

    return(
        <Container maxWidth="sm">
            <Box
                variant="h2"
                sx={{
                    mb: 1,
                    px: 10
                }}
                align='center'
            >
                <Image
                    src = {"/static/images/patanjaliLogo/logo.png"}
                    alt="Picture of the author"
                    layout = "responsive"
                    height = "4"
                    width = "16"
                />
            </Box>
            {/* <Logo /> */}
            <Card
                sx={{
                    mt: 3,
                    px: 4,
                    pt: 5,
                    pb: 5
                }}
            >
                <Box>
                    <Typography
                        variant="h2"
                        sx={{
                            mb: 1
                        }}
                    >
                        Sign in
                    </Typography>
                    <Typography
                        variant="h4"
                        color="text.secondary"
                        fontWeight="normal"
                        sx={{
                            mb: 3
                        }}
                    >
                        Fill in the fields below to sign into your account .
                    </Typography>
                </Box>

                <Formik
                    initialValues = { initialValues }
                    validationSchema = { validationSchema }
                    onSubmit={ async (values, {setErrors}) => {
                        await onLogin(values, setErrors)
                    }} 
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        touched,
                        values
                    }) => (
                        <form onSubmit = {handleSubmit}>
                            { isVisible && 
                                (
                                    <Typography 
                                        variant = "caption" 
                                        display = "block" 
                                        gutterBottom color ="red"
                                        sx={{
                                            
                                        }}
                                    >  
                                        {errMessage}
                                    </Typography>
                                )
                            }
                            <TextField
                                error={Boolean(touched.email && errors.Username)}
                                fullWidth
                                margin="normal"
                                autoFocus
                                helperText={touched.email && errors.Username}
                                label='Username'
                                name="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="Username"
                                value={values.Username}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(touched.password && errors.password)}
                                fullWidth
                                margin="normal"
                                helperText={touched.password && errors.password}
                                label='Password'
                                name="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="Password"
                                value={values.Password}
                                variant="outlined"
                            />

                            
                            

                            <Grid sx={{ pt: 4 }} align = "center">
                                <Button   
                                    fullWidth
                                    type="submit"
                                    startIcon={
                                    isSubmitting ? <CircularProgress size="1rem" /> : null
                                    }
                                    disabled={Boolean(errors.submit) || isSubmitting}
                                    variant="contained"
                                >
                                    Login
                                </Button>
                            </Grid> 
                        </form>

                    )}

                </Formik>

        
            </Card>
          </Container>
    )
}

export default LoginForm;