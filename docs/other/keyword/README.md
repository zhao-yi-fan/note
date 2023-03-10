# 常用词汇

`qps` Queries Per Second，是数据库中的概念，每秒执行条数（查询），被引申到压测中来了，但是不包括插入、更新、删除操作，所以不建议用qps来描述系统整体的性能；


`TPS` Transactions Per Second，意思是每秒事务数，具体事务的定义，都是人为的，可以一个接口、多个接口、一个业务流程等等。一个事务是指事务内第一个请求发送到接收到最后一个请求的响应的过程，以此来计算使用的时间和完成的事务个数。


`SCF` Serverless Cloud Function 无服务器云函数

`gc`: generate component

`sfc`: single file component

