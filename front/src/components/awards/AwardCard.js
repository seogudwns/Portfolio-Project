import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function AwardCard({ award, setIsEditing, isEditable, setAwards }) {
  const { title, description, id, when_date } = award;

  const deleteHandler = async () => {
    try {
      if (window.confirm("정말로 수상정보를 삭제 하시겠습니까?")) {
        await Api.delete(`awards/${award.id}`);
        setAwards(current => {
          return current.filter(item => item.id !== id);
        });
      }
    } catch (e) {
      alert("수상정보를 제대로 삭제하지 못했습니다.", e);
    }
  };

  const URLCheck = str => {
    let regex =
      /(([a-zA-Z0-9]+:\/\/)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\.[A-Za-z]{2,4})(:[0-9]+)?(\/.*)?)/;

    const resultURL = str.replace(regex, '<a target="_blank" href="$1">$1</a>');

    return (
      <span
        className="text-muted"
        dangerouslySetInnerHTML={{ __html: resultURL }}
      ></span>
    );
  };

  return (
    <>
      <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{title}</span>
            <br />
            {URLCheck(description)}
            <br />
            <span className="text-muted">{when_date}</span>
          </Col>
          {isEditable && (
            <Col lg={1} xs={true}>
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="mr-3"
              >
                편집
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="mr-3 mt-1"
                onClick={() => deleteHandler()}
              >
                삭제
              </Button>
            </Col>
          )}
        </Row>
      </Card.Text>
    </>
  );
}

export default AwardCard;
