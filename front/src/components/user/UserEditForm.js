import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import "./UserCard.css"
import * as Api from "../../api";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  //useState로 image_url 상태를 생성함.
  const [imageUrl, setImageUrl] = useState(user.image_url); 
  
  const [image, setImage] = useState(user.image_url); 
  const [progress , setProgress] = useState(0);

  const region = "ap-northeast-2";
  const bucket = "portfolio-10team";

  AWS.config.update({
    region: region,
    accessKeyId: "AKIAXTQ5B3SEERVAQOFP",//process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: "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"//process.env.S3_SECRET_ACCESS_KEY,
  });

  const changeImageHandler = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));

    // 이미지에 넣을 고유 id
    const image_id = uuidv4();
    const ext = "." + file.name.split(".")[1];
    const fileName = image_id + ext;

    const params = {
      Bucket: bucket,
      Key: "userImage/" + fileName, // 폴더경로 + uuid + 확장자명
      Body: file,
    };

    const upload = new AWS.S3({
      params: { Bucket: bucket },
      region: region,
    });

    upload.putObject(params)
      .on('httpUploadProgress', (data) => {
          setProgress(Math.round((data.loaded / data.total) * 100));
      })
      .send((err) => {
          if (err) console.log(err);
      });

    setImageUrl(`https://${bucket}.s3.${region}.amazonaws.com/userImage/${fileName}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
      image_url: imageUrl,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);
    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <div>
      <Card.Body >
        <Form onSubmit={handleSubmit} className="usercard">
          <Form.Group controlId="userEditImage" className="mb-3 userform">
            <img
              className="usercard-img"
              src={image}
            />
            <Form.Control
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={changeImageHandler}
            />
            {progress === 0 || progress === 100 ? 
              <span></span> : <span>{progress}%</span>
            }
          </Form.Group>

          <Form.Group controlId="useEditName" className="mb-3 userform">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          {/* <Form.Group controlId="userEditEmail" className="mb-3 userform">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group> */}

          <Form.Group controlId="userEditDescription" className="userform">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </div>
  );
}

export default UserEditForm;