import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";

import useFetch from "./hooks/useFetch";
import UserCard from "./UserCard";

function NetworkScroll({ users }) {
    // TODO infinite scroll 구현
    /*
     * 어떤 요소를 계속 관찰해야 하므로 observer 생성해야 함!
     * IntersectionObserver(두 요소가 교차되었을 때 실행할 콜백, 옵션)
     */

    // 관찰하고 싶은 요소
    const observerRef = useRef(null);
    const [index, setIndex] = useState(0);

    // observer 초기화할때 전달하는 인자
    const options = {
        root: null, // 기본 null, 관찰 대상의 부모 요소 지정
        rootMargin: "20px", // 관찰하는 viewport margin 지정
        threshold: 1.0, // 관찰 요소와 얼마큼 겹쳤을 때 콜백 수행하도록 지정
    };

    const { usersForScroll, hasMore, isLoading } = useFetch(users, index);

    const observer = (node) => {
        if (isLoading) {
            // 로딩 중이면 return
            return;
        }

        if (observerRef.current) {
            // observerRef.current가 있으면 끊기
            observerRef.current.disconnect();
        }

        // observerRef.current 생성
        observerRef.current = new IntersectionObserver(([entry]) => {
            // entry가 교차되었고, 데이터가 더 있으면 index+1
            if (entry.isIntersecting && hasMore) {
                setIndex((idx) => idx + 1);
            }
        }, options);

        node && observerRef.current.observe(node);
    };

    return (
        <Container fluid>
            {usersForScroll.map((userForScroll) => (
                <UserCard
                    key={userForScroll.id}
                    user={userForScroll}
                    isNetwork
                />
            ))}
            <div ref={observer} />
            <>{isLoading && <span>Loading...</span>}</>
        </Container>
    );

    // return (
    //     <Container fluid>
    //         {users.map((user) => (
    //             <UserCard key={user.id} user={user} isNetwork />
    //         ))}
    //     </Container>
    // );
}

export default NetworkScroll;
