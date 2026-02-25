/* 
1、
失败 error==
 */
/* const test = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('失败')
      }, 3000)
    })
    console.log(result);
  } catch (error) {
    console.log(error, 'error==');
  }
}
test() */



/* 
2、
error1 失败
result2 失败
 */
/* new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('失败')
  }, 3000)
}).then((result1) => {
  console.log('result1', result1);
  return result1
}).catch((error1) => {
  console.log('error1', error1);
  return error1
}).then((result2) => {
  console.log('result2', result2);
}, (error2) => {
  console.log('error2', error2);
}) */


/* 
3、
error1 Error: 报错啦
 */
/* new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('报错啦'))
  }, 3000)
}).then((result1) => {
  console.log('result1', result1);
  return result1
}).catch((error1) => {
  console.log('error1', error1);
  return error1
}) */


/* 
4、
Uncaught (in promise) Error: 报错啦
 */
/* new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('报错啦'))
  }, 3000)
}).then((result1) => {
  console.log('result1', result1);
  return result1
}) */



/* 
4、 加了catch就不阻塞代码了，finally依然阻塞
 */
// => 11111111111
/* function aaa(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('报错啦'))
    }, 3000)
  }).then((result1) => {
    console.log('result1', result1);
    return result1
  }).catch(()=>{

  })
}
async function bbb(){
  await aaa()
  console.log('11111111111');
}

bbb() */

// => Uncaught (in promise) Error: 报错啦
/* function aaa(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('报错啦'))
    }, 3000)
  }).then((result1) => {
    console.log('result1', result1);
    return result1
  }).finally(()=>{

  })
}
async function bbb(){
  await aaa()
  console.log('11111111111');
}

bbb() */






