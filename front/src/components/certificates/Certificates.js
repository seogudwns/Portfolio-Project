import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";
import ThemeContext  from "../Theme";

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleAddClick = () => {
    setIsAdding((current) => !current);
  };

  useEffect(() => {
    // "certificates/list/유저id"로 GET 요청
    Api.get("certificates/list", portfolioOwnerId).then(res => {
      setCertificates(res.data);
    });
  }, [portfolioOwnerId]);

  return (
      <Card className="mb-2">
        <Card.Body className={`${theme}`} style={{borderRadius:"0.25rem"}}>
          <Card.Title className="component-name">자격증</Card.Title>
          {certificates.map(certificate => (
            <Certificate
              certificate={certificate}
              setCertificates={setCertificates}
              isEditable={isEditable}
            />
          ))}
          {isEditable && (
              <Row className="mt-3 text-center mb-4">
                  <Col sm={{ span: 20 }}>
                      <Button
                          className="btn btn-primary"
                          onClick={handleAddClick}
                      >
                          {!isAdding ? "+" : "-"}
                      </Button>
                  </Col>
              </Row>
          )}
          {isEditable && isAdding ? (
              <CertificateAddForm
                  portfolioOwnerId={portfolioOwnerId}
                  setIsAdding={setIsAdding}
                  setCertificates={setCertificates}
              />
          ) : (
              <></>
          )}
        </Card.Body>
    </Card>
  );
}

export default Certificates;
