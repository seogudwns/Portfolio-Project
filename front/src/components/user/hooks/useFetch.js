import React, { useCallback, useEffect, useState } from "react";
import * as Api from "../../../api";

function useFetch(users, index) {
    const [isLoading, setIsLoading] = useState(true);
    const [usersForScroll, setUsersForScroll] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const sendQuery = useCallback(async () => {
        const url = `users/${users[index]?.id}`;

        try {
            setIsLoading(true);

            const { data } = await Api.get(url);

            if (!data) {
                throw new Error("서버에 오류가 있습니다!");
            }

            setUsersForScroll((current) => [...current, data]);
            setHasMore(data !== undefined);
            setIsLoading(false);
        } catch (err) {
            throw new Error(`오류: ${err.message}`);
        }
    }, [index]);

    useEffect(() => {
        // index가 users크기보다 클 때 실행하면 오류
        if (index < users.length) {
            sendQuery();
        }
    }, [sendQuery, index]);

    return { usersForScroll, hasMore, isLoading };
}

export default useFetch;
