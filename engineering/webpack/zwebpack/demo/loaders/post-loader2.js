function loader (source){
  console.log('post-loader2');
  return source
}
// loader.pitch = ()=>{
//   console.log('pitch post-loader2');
// }
module.exports = loader