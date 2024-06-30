<template>
  <!-- 待办日历页面 -->
  <div class="todo-page">
    <!-- 左侧抽屉 -->
    <el-drawer
      title="Add calender account"
      :visible.sync="drawer"
      direction="ltr"
      :before-close="handleClose">
      <div class="drawer-left-main">
        <el-form :model="todoForm" :rules="todoRules" ref="todoForm">
          <el-form-item label="Date" prop="date">
            <el-date-picker
              v-model="todoForm.date"
              type="datetimerange"
              align="right"
              start-placeholder="Start date"
              end-placeholder="End date"
              :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Todo things name" prop="name">
            <el-input v-model="todoForm.name" placeholder="Please enter todo things name"></el-input>
          </el-form-item>
          <el-form-item label="Todo things detail" prop="things">
            <el-input type="textarea" :rows="3" v-model="todoForm.things"
                      placeholder="Please write your todo things"></el-input>
          </el-form-item>
          <el-form-item label="status" prop="status">
            <el-radio v-model="todoForm.status" label="important">important</el-radio>
            <el-radio v-model="todoForm.status" label="time">time</el-radio>
          </el-form-item>
        </el-form>
        <div class="submit">
          <el-button type="primary" size="mini" @click="submitBtnHandler">Sumbit</el-button>
          <el-button type="danger" size="mini" @click="resetBtnHanler">Reset</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 日程详情 -->
    <el-dialog :title="todayDate + '\tThings detail'" :visible.sync="dialogVisible" width="70%" top="5vh">
      <div class="dialog-main">
        <div class="item" v-for="item in todayTodoList" :key="item.id">
          <el-card shadow="always" style="margin-bottom: 20px;">
            <div slot="header">
              <div class="name">
                <div class="text">
                  Things name: {{ item.thingsName }}
                </div>
                <el-popconfirm title="Confirm delete this todo things ?" @confirm="confrimDeleteHandler(item)"
                               confirm-button-text="confirm" cancel-button-text="cancle" confirm-button-type="danger">
                  <el-button slot="reference" style="float: right;padding: 5px" type="danger">Delete</el-button>
                </el-popconfirm>
              </div>

            </div>
            <div class="create-time item-line">
              <span class="title">Create time:</span>
              <span class="value">{{ item.createTime }}</span>
            </div>
            <div class="time-range item-line">
              <span class="title">Time range:</span>
              <span class="value">{{ item.startTime }} 至 {{ item.endTime }}</span>
            </div>
            <div class="things-name item-line">
              <span class="title">Things detail:</span>
              <span class="value">{{ item.thingsDetail }}</span>
            </div>
          </el-card>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">Close</el-button>
      </div>
    </el-dialog>
    <!-- 侧边部分 左侧 -->
    <div class="side-left">
      <!-- 日历部分 -->
      <div class="calender">
        <a-calendar :fullscreen="false" @select="selectHandler" mode="year"/>
      </div>
      <!-- 个人信息部分 -->
      <div class="user">
        <div class="user-wrap">
          <div class="userName">{{ user.userName }}</div>
          <div class="email-with-icon">
            <div class="icon">
              <img src="@/assets/background/email.png" alt="">
            </div>
            <div class="email">{{ user.userName }}</div>
          </div>
          <div class="add-btn" @click="addBtnClickHandler">
            <div class="icon">
              <img src="@/assets/background/add.png" alt="">
            </div>
            <div class="text">Add calendar account</div>
         </div>
        </div>
      </div>
    </div>
    <!-- 中间日历部分 -->
    <div class="main">
      <div class="top-container">
        <div class="month">{{ englishMonth }}</div>
        <div class="day">{{ day }}</div>
        <div class="year">{{ year }}</div>
      </div>
      <div class="main-container">
        <a-calendar @select="mainDateSelectHandler" v-model="currentDay" @change="mainDateChangeHandler">
          <ul slot="dateCellRender" slot-scope="value" class="events">
            <li v-for="item in getListData(value)" :key="item.content">
              <a-badge :status="item.type" :text="item.content"/>
            </li>
          </ul>
          <template slot="monthCellRender" slot-scope="value">
            <div v-if="getMonthData(value)" class="notes-month">
              <section>{{ getMonthData(value) }}</section>
              <span>Backlog number</span>
            </div>
          </template>
        </a-calendar>
      </div>
    </div>
    <!-- 侧边部分 右侧 -->
    <div class="side-right">
      <div class="search-container">
        <a-input-search placeholder="search things name" enter-button @search="onSearch"/>
      </div>
      <div class="things-list">
        <!-- 该用户尚未创建过任何日程 -->
        <div class="no-data" v-if="thingsList.length === 0">
          <a-empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            :image-style="{height: '60px',}"
          >
            <span slot="description"> Customize <a href="#API">No things todo</a> </span>
            <a-button type="primary" @click="openDrawer">
              Create Now
            </a-button>
          </a-empty>
        </div>
        <div class="things-data-container" v-else>
          <div class="things-item" v-for="item in thingsList" :key="item.id" @click="showDetailHandler(item)">
            <div class="create-time">{{ item.createTime }} By {{ item.userName }} created</div>
            <div class="things-name">Things name: {{ item.thingsName }}</div>
          </div>
        </div>
      </div>
      <div class="things-detail" v-if="!!todoThingsDetail">
        <div class="detail-title">Things Detail</div>
        <div class="detail-main" :class="todoThingsDetail.thingsStatus === 1 ? 'important' : 'time'">
          <div class="inner">
            <div class="item">
              <div class="key">Name:</div>
              <div class="value">{{ todoThingsDetail.thingsName }}</div>
            </div>
            <div class="item">
              <div class="key">User:</div>
              <div class="value">{{ todoThingsDetail.userName }}</div>
            </div>
            <div class="item">
              <div class="key">Create time:</div>
              <div class="value">{{ todoThingsDetail.createTime }}</div>
            </div>
            <div class="item">
              <div class="key">Range time:</div>
              <div class="value">{{ todoThingsDetail.startTime }} to {{ todoThingsDetail.endTime }}</div>
            </div>
            <div class="item">
              <div class="key">Detail:</div>
              <div class="value">{{ todoThingsDetail.thingsDetail }}</div>
            </div>
          </div>
          <div class="image">
            <!-- important #cc0041  time #1296db-->
            <img src="@/assets/background/important.png" alt="" v-if="todoThingsDetail.thingsStatus === 1">
            <img src="@/assets/background/time.png" alt="" v-else>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import {addApi, deleteApi, searchByDateApi, searchByNameApi, userTodoListApi} from "@/request/api";

export default {
  name: 'TodoView',
  created() {
    this.currentMonth = new Date()
    this.getAllTodoList()
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    if (user) {
      this.user = user;
    }
  },
  mounted() {
    this.getCurrentYear();
    this.getEnglishMonth();
  },
  data() {
    return {
      user: {},
      date: new Date(),
      drawer: false,// 抽屉是否打开
      todoForm: {
        date: '',
        things: '',
        name: '', // 日程名称
        status: '', // important 重要的 time 紧急的
      },
      // 校验规则
      todoRules: {
        date: [{required: true, message: 'Please choose things date', trigger: 'blur'}],
        things: [{required: true, message: 'Please write your todo things detail', trigger: 'blur'}],
        status: [{required: true, message: 'Please choose things status', trigger: 'blur'}],
        name: [{required: true, message: 'Please write your todo things name'}]
      },
      year: '', // 当前年份
      day: '', // 当前日期
      englishMonth: '', // 当前月份的英文表示
      dialogVisible: false, // 日程详情显示框
      todayTodoList: [], // 某一天的日程事项
      todayDate: '', // 某一天的日期
      thingsList: [], // 日程事项
      currentDay: '', // 中间日历组件默认展示的日期
      todoThingsDetail: null, // 日程详情对象
      allTodoList: [], // 全部待办事项
      allTodoMap: null, // 全部待办事项map结构数据
      currentMonth: '', // 当前月份
    }
  },
  methods: {
    dayjs,
    // 打开抽屉
    openDrawer() {
      this.drawer = true
    },
    // 点击日程查看日程详情
    async showDetailHandler(item) {
      this.todoThingsDetail = item
    },
    // 右侧搜索
    async onSearch(value) {
      try {
        if (!value) return
        const params = {
          createUser: JSON.parse(window.sessionStorage.getItem('user')).userId,
          keyword: value
        }
        const {code, data, msg} = await searchByNameApi(params)
        if(code === 200){
          this.$message.success('查询成功')
          this.thingsList = data
        }
      } catch (e) {
        console.error(e)
      }

    },
    async mainDateSelectHandler(date) {
      let clickDate = dayjs(date._d).format('YYYY-MM-DD')
      this.year = date._d.getFullYear()
      this.day = date._d.getDate()
      this.getEnglishMonth(date._d)
      await this.getTodoListByDate(clickDate)
      this.dialogVisible = true
    },
    async mainDateChangeHandler(val){
      this.currentMonth = val._d
      await this.getAllTodoList()
    },
    // 根据日期当前用户查询日程
    async getTodoListByDate(date) {
      try {
        const params = {
          createUser: JSON.parse(window.sessionStorage.getItem('user')).userId,
          startTime: date
        }
        const {code, data, msg} = await searchByDateApi(params)
        if (code === 200) {
          this.todayTodoList = data
          this.todayDate = date
        }
      } catch (e) {
        console.error('查询某一天的日程失败\n', e)
      }
    },
    // 左侧日历选择
    async selectHandler(val) {
      this.currentDay = val
      this.getEnglishMonth(val._d)
      this.currentMonth = val._d
      await this.getAllTodoList()
    },
    // 获取当前用户的待办事项
    async getAllTodoList() {
      try {
        if (!!window.sessionStorage.getItem('user')) {
          const params = {
            createUser: JSON.parse(window.sessionStorage.getItem('user')).userId,
            month: dayjs(this.currentMonth).format('YYYY-MM') // 查询当前月份的待办事件
          }
          const {code, data} = await userTodoListApi(params)
          if (code === 200) {
            this.allTodoList = data.map(item => {
              return {
                dateNum: (new Date(item.startTime)).getMonth() + 1 + '-' + (new Date(item.startTime)).getDate(),
                ...item
              }
            })
            this.allTodoMap = new Map()
            if (this.allTodoList.length > 0) {
              this.allTodoList.forEach(item => {
                if (!this.allTodoMap.has(item.dateNum)) {
                  this.allTodoMap.set(item.dateNum, new Array().concat(item))
                } else {
                  let old = this.allTodoMap.get(item.dateNum)
                  let newTodo = old.concat(item)
                  this.allTodoMap.set(item.dateNum, newTodo)
                }
              })
            }
            console.log('allTodoMap', this.allTodoMap)
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    // 获取日历中的待办事项
    getListData(value) {
      let date = value._d.getMonth() + 1 + '-' + value.date()
      // 将数组结构按照map结构划分 划分依据为 dateNum
      // let todoMap = new Map()
      let listData
      // if(this.allTodoList.length > 0){
      //   this.allTodoList.forEach(item => {
      //     console.log('foreach-->',item)
      //     if(!todoMap.has(item.dateNum)){
      //       todoMap.set(item.dateNum,[item])
      //     } else {
      //       let old = todoMap.get(item.dateNum)
      //       let newTodo = old.push(item)
      //       todoMap.set(item.dateNum,newTodo)
      //     }
      //   })
      //   // console.log('todoMap-->',todoMap)
      let callBackFn = (v, key) => {
        // console.log('v-->',v);
        // console.log('key-->',key);
        if (key === date) {
          listData = v.map(item => {
            return {
              type: item.thingsStatus === 1 ? 'error' : 'warning',
              content: item.thingsName
            }
          })
        }
      }
      this.allTodoMap && this.allTodoMap.forEach(callBackFn)
      // }
      return listData || [{type: 'success', content: 'No todo things'}];
    },
    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
    // 获取当前年份
    getCurrentYear() {
      let date = new Date()
      this.year = date.getFullYear()
      this.day = date.getDate()
    },
    // 获取当前月份的英文表示
    getEnglishMonth(date1) {
      let date
      if (!!date1) {
        date = date1
      } else {
        date = new Date()
      }
      let month = date.getMonth() + 1
      let englishMonth = 'January'
      switch (month) {
        case 1:
          englishMonth = 'January'
          break
        case 2:
          englishMonth = 'February'
          break
        case 3:
          englishMonth = 'March'
          break
        case 4:
          englishMonth = 'April'
          break
        case 5:
          englishMonth = 'May'
          break
        case 6:
          englishMonth = 'June'
          break
        case 7:
          englishMonth = 'July'
          break
        case 8:
          englishMonth = 'August'
          break
        case 9:
          englishMonth = 'September'
          break
        case 10:
          englishMonth = 'October'
          break
        case 11:
          englishMonth = 'November'
          break
        case 12:
          englishMonth = 'December'
          break
      }
      this.englishMonth = englishMonth
    },
    // 添加待办点击事件回调
    addBtnClickHandler() {
      this.drawer = true
    },
    handleClose(done) {
      this.$confirm('Confirm shutdown?')
        .then(_ => {
          for (const key in this.todoForm) {
            this.todoForm[key] = ''
          }
          done();
        })
        .catch(_ => {
        });
    },
    resetBtnHanler() {
      for (const key in this.todoForm) {
        this.todoForm[key] = ''
      }
    },
    // 用户确认删除某一事项
    async confrimDeleteHandler(item) {
      try {
        const params = {
          createUser: JSON.parse(window.sessionStorage.getItem('user')).userId,
          todoId: item.id
        }
        const {code, msg} = await deleteApi(params)
        if (code === 200) {
          this.$message.success(msg)
          setTimeout(async () => {
            this.dialogVisible = false
            await this.getAllTodoList()
          }, 1000)
        }
      } catch (e) {
        console.error(e)
      }
    },
    // 用户新建日程
    submitBtnHandler() {
      try {
        this.$refs.todoForm.validate(async (valid) => {
          if (valid) {
            console.log(this.todoForm)
            let user = JSON.parse(window.sessionStorage.getItem('user'))
            if (!!user) {
              const params = {
                createUser: user.userId,
                createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                thingsName: this.todoForm.name,
                thingsDetail: this.todoForm.things,
                thingsStatus: this.todoForm.status === 'important' ? 1 : 2,
                startTime: dayjs(this.todoForm.date[0]).format('YYYY-MM-DD HH:mm:ss'),
                endTime: dayjs(this.todoForm.date[1]).format('YYYY-MM-DD HH:mm:ss'),
              }
              const {code, msg} = await addApi(params)
              if (code === 200) {
                this.$message.success(msg)
                this.drawer = false
                for (let key in this.todoForm) {
                  this.todoForm[key] = ''
                }
                await this.getAllTodoList()
              }
            } else {
              this.$message.warning("您还未登录过，请先登录")
              setTimeout(() => {
                this.$router.push('/login')
              }, 1000)
            }
          } else {
            this.$message.error('Please write form correctly!')
          }
        })
      } catch (e) {
        console.error(`提交待办事项出错\n`, e)
      }
    }
  },
}
</script>

<style scoped lang="less">
/deep/ .el-card {
  .clearfix {
    width: 100%;

  }

  .name {
    font-size: 16px;
    color: #000;
    font-weight: bold;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .delete {
    padding: 5px;
  }

  .el-card__header {
    padding: 10px;
  }

  .item-line {
    padding: 2px 0;
    font-size: 15px;

    .title {
      color: #1a1a1a;
      font-weight: bold;
      margin-right: 5px;
      display: inline-block;
      width: 100px;
      text-align: right;
    }

    .value {
      color: #999;
    }
  }
}

/deep/ .drawer-left-main {
  width: 100%;
  height: 200px;
  padding: 10px 20px;
}

.todo-page {
  width: 100%;
  height: 100vh;
  display: flex;

  .side-left {
    width: 350px;
    height: 100%;
    border-right: 1px solid #f0f0f0;

    .calender {
      width: 100%;
      border-bottom: 1px solid #f0f0f0;

      /deep/ .el-calendar-day {
        height: 50px;
      }
    }

    .user {
      width: 100%;
      margin: 10px 0;
      border-bottom: 1px solid #f0f0f0;

      .user-wrap {
        width: 290px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        .userName {
          font-size: 18px;
          color: #1a1a1a;
          padding-left: 30px;
        }

        .email-with-icon {
          display: flex;
          align-items: center;
          padding: 10px 0;

          .icon {
            width: 26px;
            height: 24px;

            img {
              width: 100%;
            }
          }

          .email {
            font-size: 18px;
            color: #999;
            padding-left: 4px;
          }
        }

        .add-btn {
          display: flex;
          align-items: center;
          cursor: pointer;

          .icon {
            width: 26px;

            img {
              width: 100%;
            }
          }

          .text {
            font-size: 14px;
            color: #999;
            padding-left: 4px;
          }
        }
      }
    }

  }

  .side-right {
    width: 350px;
    height: 100%;
    border: 1px solid #f0f0f0;

    .search-container {
      width: 95%;
      margin: 10px auto;
    }

    .things-list {
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;

      .things-data-container {
        width: 95%;
        min-height: 140px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        .things-item {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 10px 5px;
          border: 1px solid #f0f0f0;
          cursor: pointer;
          border-radius: 6px;
          margin-bottom: 10px;

          &:hover {
            background-color: #1296db;
            color: #fff;
            transition: .7s;

            .create-time {
              color: #fff;
            }
          }

          .create-time {
            font-size: 14px;
            color: #1a1a1a;
            font-weight: 600;
          }

          .things-name {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .things-detail {
      width: 95%;
      margin: 10px auto;
      min-height: 100px;

      .detail-title {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #000;
        font-weight: bold;
      }

      .detail-main {
        position: relative;
        margin-bottom: 5px;
        padding: 5px;
        border: 1px solid #f0f0f0;
        border-radius: 6px;

        &.important {
          box-shadow: 2px 5px 5px #f5222d;

          &:hover {
            .item {
              .key {
                color: #fff;
              }

              .value {
                color: #fff;
              }
            }

            background-color: #f5222d;
            transition: .7s;
          }
        }

        &.time {
          box-shadow: 2px 5px 5px #faad14;

          &:hover {
            .item {
              .key {
                color: #fff;
              }

              .value {
                color: #fff;
              }
            }

            background-color: #faad14;
            transition: .7s;
          }
        }

        .item {
          width: 100%;
          display: flex;
          flex-direction: column;

          .key {
            font-size: 14px;
            color: #000;
            font-weight: bold;
          }

          .value {
            font-size: 14px;
            color: #1a1a1a;
            font-weight: 500;
          }
        }

        .image {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 50px;

          img {
            width: 100%;
          }
        }
      }
    }
  }

  .main {
    flex: 1;
    height: 100%;
    border: 1px solid #f0f0f0;

    .top-container {
      width: 95%;
      margin: 10px 2.5%;
      height: 60px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      font-size: 24px;
      color: #1a1a1a;
      font-weight: bold;

      .month {
        margin-right: 10px;
      }

      .day {
        margin-right: 10px;
      }
    }
  }
}
</style>
