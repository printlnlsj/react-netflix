import React, {useEffect, useState} from 'react';

// ex) value : 검색어, delay : 500(0.5초)
const UseDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    // 예를 들어 value에 1을 입력.
    // 0.5초 딜레이있고 나서 state가 변함.
    // 하지만 0.5초 이전에 추가 입력이 있다면,
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        // handler 함수 딜레이 시간을 초기화 한다.
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    // 검색어를 리턴
    return debounceValue;
};

export default UseDebounce;