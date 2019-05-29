# hongqiao

虹桥二中项目

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```
#  sequelize-auto  根据数据库表结构生成模型
```
全局安装sequelize-auto安装及依赖模块后，就可使用该模块生成模型了。语法结构如下：

sequelize-auto -h 10.11.0.4  -d scm_mainjyh -u sa  -x "123" -p "1433"  --dialect "mssql"  -o "./model" -t "S_ZXFC0201"
在以上参数中，除-h、-d参数外，其它参数都是可选的。各参数选项说明如下：

-h, --host - 数据库的IP/主机名 [必选]
-d, --database - 数据库名 [必选]
-u, --user - 数据库的用户名。默认将根据数据库类型的默认用户生成数据库名
-x, --pass - 数据库的密码。默认为空
-p, --port - 数据库连接端口。默认为所使用数据库类型的默认端口号
-c, --config - JSON文件，用于Sequelize构造函数的'options'选项对象。参见：http://itbilu.com/nodejs/npm/VkYIaRPz-.html#api-init
-o, --output - 模型输出目录。默认会在当前目录下生成'./models'目录
-e, --dialect - 所使用的数据库类型(驱动类型)。默认为mysql
-a, --additional - 一个包含模型定义参数的JSON文件。参见：http://itbilu.com/nodejs/npm/VkYIaRPz-.html#api-instance-define
-t, --tables - 指定所要导出的表，逗号分隔。默认为全部
```
# 初始化 Migrations 配置文件和目录
```
npx sequelize init:config
npx sequelize init:migrations
```
# 升级数据库
```
npx sequelize db:migrate
如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
npx sequelize db:migrate:undo
可以通过 `db:migrate:undo:all` 回退到初始状态
npx sequelize db:migrate:undo:all
```