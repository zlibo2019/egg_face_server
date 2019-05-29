// 引入mockjs
const Mock = require('mockjs');
import { getStartReviewRecord, getClassTree } from './data';
 
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/start/getStartReviewRecord', 'post', getStartReviewRecord);
Mock.mock('/class/getClassTree', 'post', getClassTree);