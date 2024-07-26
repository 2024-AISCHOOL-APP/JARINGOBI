import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Formik } from 'formik';
import * as yup from 'yup';
import './SignupStyle.css';

const schema = yup.object().shape({
    ID: yup.string().required('ID is required'),
    Password: yup.string().required('Password is required'),
    Name: yup.string().required('Name is required'),
    Nick: yup.string().required('Nick is required'),
    Email: yup.string().email('Invalid email format').required('Email is required'),
    Addr: yup.string().required('Addr is required'),
    Gender: yup.string().required('성별을 선택해주세요').oneOf(['남', '여'], '성별을 선택해주세요')
});

const Signup = () => {
    return (
        <div>
            <Navbar className='Navbar'>
                <Container className='Container'>
                    <Navbar.Brand className='Navlogo' href="/">PennyWise</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="/Main"><img src='img/con0.png' alt="Link Icon" /></Nav.Link>
                            <Nav.Link href="#about"><img src='img/con3.png' alt='Link Icon' /></Nav.Link>
                            <Nav.Link href="/Community"><img src='img/con1.png' alt='Link Icon' /></Nav.Link>
                            <Nav.Link href="#about"><img src='img/con2.png' alt='Link Icon' /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="form-container"> {/* 폼을 우측으로 이동시키기 위한 컨테이너 */}
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        ID: '',
                        Password: '',
                        Name: '',
                        Nick: '',
                        Email: '',
                        Addr: '',
                        Gender: ''
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group as={Col} md="4" controlId="validationFormik01">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ID"
                                        value={values.ID}
                                        onChange={handleChange}
                                        isValid={touched.ID && !errors.ID}
                                        isInvalid={!!errors.ID}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.ID}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik02">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="Password"
                                        value={values.Password}
                                        onChange={handleChange}
                                        isValid={touched.Password && !errors.Password}
                                        isInvalid={!!errors.Password}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                                    <Form.Label>Name</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            name="Name"
                                            value={values.Name}
                                            onChange={handleChange}
                                            isValid={touched.Name && !errors.Name}
                                            isInvalid={!!errors.Name}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>Nick</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Nick"
                                        value={values.Nick}
                                        onChange={handleChange}
                                        isValid={touched.Nick && !errors.Nick}
                                        isInvalid={!!errors.Nick}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Nick}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationFormik04">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="abc@naver.com"
                                        name="Email"
                                        value={values.Email}
                                        onChange={handleChange}
                                        isValid={touched.Email && !errors.Email}
                                        isInvalid={!!errors.Email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationFormik05">
                                    <Form.Label>Addr</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="광주 신창로 161번길 34"
                                        name="Addr"
                                        value={values.Addr}
                                        onChange={handleChange}
                                        isValid={touched.Addr && !errors.Addr}
                                        isInvalid={!!errors.Addr}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Addr}</Form.Control.Feedback>
                                </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="남"
                                        name="Gender"
                                        value="남"
                                        onChange={handleChange}
                                        isInvalid={!!errors.Gender}
                                        feedback={errors.Gender}
                                        feedbackType="invalid"
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="여"
                                        name="Gender"
                                        value="여"
                                        onChange={handleChange}
                                        isInvalid={!!errors.Gender}
                                        feedback={errors.Gender}
                                        feedbackType="invalid"
                                    />
                                </div>
                            </Form.Group>
                            <Button type="submit">회원가입</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Signup;
