import { ThreeBounce } from 'better-react-spinkit'
import React from 'react'
import { Card, CardBody, Row } from 'reactstrap'

export default function CardThreeBounce() {
  return (
    <Row className="">
      <Card className="p-5" style={{ borderLeft: "2px solid #ced4da" }}>
        <CardBody className="p-5">
          <div className="d-flex align-items-center justify-content-center">
            <ThreeBounce size={20} color="#5b73e8" />
          </div>
        </CardBody>
      </Card>
    </Row>
  )
}
