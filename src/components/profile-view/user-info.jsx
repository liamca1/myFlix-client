import React from "react";
import { Row, Col, Container } from 'react-bootstrap'

export function UserInfo({ email, name }, props) {
    return (
        <Container fluid>
         <Row><h4>Your profile</h4></Row>
        <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{name}</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Password:</Col>
        <Col className="value">******</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{email}</Col>
        </Row>
        </Container>
    )
}