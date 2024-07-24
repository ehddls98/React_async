import React from 'react';

function PromisePage(props) {

    const loop = (name) => {
        //random 0 < 1 ex) 0.1234213
        const random = Math.floor((Math.random() * 100)) + 1;
        for(let i = 0; i < random; i++) {
            console.log(`${name} : ${i}`);
        }
    }

    const testPromise1 = async() => {
        const response = {
            status: 200,
            data: ""
        }
        loop("test1");
        if(Response.status === 400) {
            throw new Error(); //reject와 같은 역할을 함
        }
        return response; //return이 resolve와 같은 역할을 함 즉 async를 붙이면 resolve, reject를 쓸 필요가 없음
    }

    const testPromise = () => {
        return new Promise((resolve, reject) => {
            loop("test1");
            resolve("test1 반복 완료"); 
        });
    }

    const testPromise2 = () => {
        return new Promise((resolve, reject) => {
            loop("test2");
            resolve("test2 반복 완료");
        });
    }

    const testPromise3 = () => {
        return new Promise((resolve, reject) => {
            loop("test3");
            resolve("test3 반복 완료");
        });
    }

    //testPromise 4와 5는 같은 동작을 하는 코드다.
    const testPromise4 = (num) => {
        return new Promise((resolve, reject) => {
            console.log("test4");
            if(num === 0) {
                reject("test4 오류!!!"); //throw를 쓰지 않기 때문에 return을 써줘야 함
                //reject는 즉시 에러를 던지지 않고 나머지 코드들이 실행된 후 에러를 던짐
                return;
            }
            resolve("test4 성공!!");
        });
    }

    const testPromise5 = async(num) => {
        console.log("test5");
        if(num === 0) {
            throw new Error("test5 오류!!!"); 
            //reject와 같은 역할을 함, 
            //reject와 다른점은 즉시 에러를 던짐
        }
        return "test5 성공!!!";
    }

    const handleClick1 = () => {
        testPromise().then(r => {
            console.log(r);
            testPromise2().then(r => {
                console.log(r);
                testPromise3().then(r => {
                    console.log(r);
                });
            });
        });
    }

    const handleClick2 = async() => { //async를 붙이면 handleClick2도 promise(비동기 함수)가 됨, async를 쓰면 resolve를 쓸 필요가 없음
        const r = await testPromise(); //await은 promise의 코드 가독성을 높여줌
        console.log(r);
        const r2 = await testPromise2();
        console.log(r2);
        const r3 = await testPromise3();
        console.log(r3);
    }

    //testPromise 4, 5, 는 둘 다 promise 이기 때문에 .then()을 쓸 수 있다는 것을 보여주는 코드
    const handleClick3 = () => {
        //async를 쓰지 않으면 .then() .catch()를 써야함
        testPromise4(0)
        .then(r => { //testPromise4의 resolve를 받으면 then으로 넘어감
            console.log(r);
            testPromise5(0)
            .then(r => { // testPromise5의 resolve를 받으면 then으로 넘어감
                console.log(r);
            })
            .catch(e => {
                console.error(e);
            });
        })
        .catch(e => {
            console.error(e);
            testPromise5(0)
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.error(e);
            });
        });
    }

    const handleClick4 = async() => {
        //async를 사용하면 try catch를 쓸 수 있음
        try {
            const r = await testPromise4(0);
            console.log(r);
        } catch (e) {
            console.error(e);
        }
        
        try {
            const r = await testPromise5(0);
            console.log(r);
        } catch (e) {
            console.error(e);
        }
        
    }

    return (
        <div>
            <button onClick={handleClick1}>버튼1</button>
            <button onClick={handleClick2}>버튼2</button>
            <button onClick={handleClick3}>버튼3</button>
            <button onClick={handleClick4}>버튼4</button>
        </div>
    );
}

export default PromisePage;