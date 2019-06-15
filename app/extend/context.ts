import { Context } from 'egg';

export default {
  success(this: Context, res: any) {
    this.body = res;
    this.status = 200;
  },
  failed(this: Context, res: any) {
    const ts = (Date.now() / 1000).toString();
    res.ts = ts;
    this.body = res;
    this.status = 201;
  },
};
