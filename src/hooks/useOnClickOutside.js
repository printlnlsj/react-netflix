import React, {useEffect} from 'react';

const UseOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            console.log('ref = ', ref.current);

            if(!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        // 컴포넌트가 언마운트 되면 이벤트 리스너 없애주기위해(초기화) return 사용
        return () => {
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
        };
    }, [ref, handler]);

    return (
        <div>

        </div>
    );
};

export default UseOnClickOutside;