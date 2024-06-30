<template>
  <div class="login-page">
    <div class="login-title">
      <svg role="graphics-symbol" viewBox="0 0 120 126" class="notionLogo"
           style="width: 30px; height: 30px; display: block; fill: inherit; flex-shrink: 0; margin-right: 10px;" @click="homeHandler">
        <path
          d="M 20.6927 21.9315C 24.5836 25.0924 26.0432 24.8512 33.3492 24.3638L 102.228 20.2279C 103.689 20.2279 102.474 18.7705 101.987 18.5283L 90.5477 10.2586C 88.3558 8.55699 85.4356 6.60818 79.8387 7.09563L 13.1433 11.9602C 10.711 12.2014 10.2251 13.4175 11.1939 14.3924L 20.6927 21.9315ZM 24.8281 37.9835L 24.8281 110.456C 24.8281 114.351 26.7745 115.808 31.1553 115.567L 106.853 111.187C 111.236 110.946 111.724 108.267 111.724 105.103L 111.724 33.1169C 111.724 29.958 110.509 28.2544 107.826 28.4976L 28.721 33.1169C 25.8018 33.3622 24.8281 34.8225 24.8281 37.9835ZM 99.5567 41.8711C 100.042 44.0622 99.5567 46.2512 97.3618 46.4974L 93.7143 47.2241L 93.7143 100.728C 90.5477 102.43 87.6275 103.403 85.1942 103.403C 81.2983 103.403 80.3226 102.186 77.4044 98.54L 53.5471 61.087L 53.5471 97.3239L 61.0964 99.0275C 61.0964 99.0275 61.0964 103.403 55.0057 103.403L 38.2148 104.377C 37.727 103.403 38.2148 100.973 39.9179 100.486L 44.2996 99.2717L 44.2996 51.36L 38.2158 50.8725C 37.728 48.6815 38.9431 45.5225 42.3532 45.2773L 60.3661 44.0631L 85.1942 82.0036L 85.1942 48.4402L 78.864 47.7136C 78.3781 45.0351 80.3226 43.0902 82.7569 42.849L 99.5567 41.8711ZM 7.5434 5.39404L 76.9175 0.285276C 85.4366 -0.445402 87.6285 0.0440428 92.983 3.93368L 115.128 19.4982C 118.782 22.1747 120 22.9034 120 25.8211L 120 111.187C 120 116.537 118.051 119.701 111.237 120.185L 30.6734 125.05C 25.5584 125.294 23.124 124.565 20.4453 121.158L 4.13735 99.9994C 1.21516 96.1048 0 93.191 0 89.7819L 0 13.903C 0 9.5279 1.94945 5.8785 7.5434 5.39404Z"></path>
      </svg>
      <div class="split-line"></div>
      <div class="lang" @click="langClickHandler">
        <svg role="graphics-symbol" viewBox="0 0 16 16" class="globe2"
             style="width: 16px; height: 16px; display: block; fill: rgb(145, 145, 142); flex-shrink: 0; margin-right: 4px;">
          <path
            d="M8 15.126C11.8623 15.126 15.0615 11.9336 15.0615 8.06445C15.0615 4.20215 11.8623 1.00293 7.99316 1.00293C4.13086 1.00293 0.938477 4.20215 0.938477 8.06445C0.938477 11.9336 4.1377 15.126 8 15.126ZM3.88477 3.76465C4.56836 3.11523 5.39551 2.61621 6.31836 2.34277C5.83301 2.82812 5.42285 3.51172 5.11523 4.3457C4.63672 4.19531 4.22656 3.99707 3.88477 3.76465ZM9.68848 2.34961C10.6045 2.62305 11.4316 3.11523 12.1084 3.76465C11.7734 4.00391 11.3633 4.19531 10.8848 4.35254C10.5771 3.51172 10.167 2.82812 9.68848 2.34961ZM8.47852 2.56836C9.0459 2.8418 9.56543 3.58008 9.93457 4.58496C9.4834 4.66699 8.99805 4.71484 8.47852 4.73535V2.56836ZM6.06543 4.58496C6.44141 3.58008 6.9541 2.8418 7.52148 2.56836V4.73535C7.00195 4.71484 6.5166 4.66699 6.06543 4.58496ZM2.05273 7.58594C2.14844 6.42383 2.58594 5.35059 3.25586 4.46875C3.67285 4.77637 4.21289 5.04297 4.8418 5.24121C4.66406 5.95215 4.54785 6.74512 4.51367 7.58594H2.05273ZM11.4863 7.58594C11.4521 6.74512 11.3359 5.95215 11.1582 5.24121C11.7871 5.04297 12.3271 4.7832 12.7373 4.46875C13.4141 5.35059 13.8516 6.42383 13.9473 7.58594H11.4863ZM5.49121 7.58594C5.52539 6.84082 5.62793 6.12988 5.78516 5.4873C6.33203 5.59668 6.91309 5.66504 7.52148 5.69238V7.58594H5.49121ZM8.47852 7.58594V5.69238C9.08691 5.66504 9.66797 5.59668 10.2148 5.4873C10.3721 6.12988 10.4746 6.84082 10.5088 7.58594H8.47852ZM2.05273 8.54297H4.51367C4.54785 9.39746 4.66406 10.1973 4.8418 10.915C4.21973 11.1133 3.68652 11.373 3.27637 11.6807C2.59277 10.792 2.14844 9.71191 2.05273 8.54297ZM5.49121 8.54297H7.52148V10.4707C6.91992 10.498 6.33203 10.5664 5.79199 10.6689C5.62793 10.0195 5.51855 9.29492 5.49121 8.54297ZM8.47852 10.4707V8.54297H10.5088C10.4814 9.29492 10.3721 10.0195 10.208 10.6689C9.66797 10.5664 9.08691 10.498 8.47852 10.4707ZM11.1582 10.915C11.3428 10.1973 11.4521 9.39746 11.4863 8.54297H13.9473C13.8516 9.71191 13.4072 10.792 12.7236 11.6807C12.3135 11.373 11.7803 11.1133 11.1582 10.915ZM8.47852 11.4277C8.99121 11.4482 9.47656 11.4961 9.9209 11.5781C9.55176 12.5625 9.03906 13.2939 8.47852 13.5605V11.4277ZM6.0791 11.5781C6.52344 11.4961 7.00879 11.4482 7.52148 11.4277V13.5605C6.96094 13.2939 6.44824 12.5625 6.0791 11.5781ZM3.90527 12.3848C4.24023 12.1523 4.65039 11.9609 5.12207 11.8105C5.42969 12.6309 5.83301 13.3008 6.30469 13.7793C5.40234 13.5059 4.58203 13.0205 3.90527 12.3848ZM10.8779 11.8105C11.3496 11.9609 11.7598 12.1523 12.0947 12.3848C11.418 13.0205 10.5977 13.5059 9.69531 13.7793C10.167 13.3008 10.5703 12.6309 10.8779 11.8105Z"></path>
        </svg>
        <span>English</span>

      </div>
    </div>
    <div class="login-container">
      <div class="login-wrap">
        <div class="floor1">Think it. Make it.</div>
        <div class="floor2">Log in to your Notion account</div>
      </div>
    </div>
    <div class="login-button">
      <div class="button-wrap">
        <div class="button-item" @click="loginHandler">
          <svg role="graphics-symbol" viewBox="0 0 20 20" class="googleLogo"
               style="width: 14px; height: 14px; display: block; fill: inherit; flex-shrink: 0; margin-right: 6px;">
            <g>
              <path
                d="M19.9996 10.2297C19.9996 9.54995 19.9434 8.8665 19.8234 8.19775H10.2002V12.0486H15.711C15.4823 13.2905 14.7475 14.3892 13.6716 15.0873V17.586H16.9593C18.89 15.8443 19.9996 13.2722 19.9996 10.2297Z"
                fill="#4285F4"></path>
              <path
                d="M10.2002 20.0003C12.9518 20.0003 15.2723 19.1147 16.963 17.5862L13.6753 15.0875C12.7606 15.6975 11.5797 16.0429 10.2039 16.0429C7.54224 16.0429 5.28544 14.2828 4.4757 11.9165H1.08301V14.4923C2.81497 17.8691 6.34261 20.0003 10.2002 20.0003Z"
                fill="#34A853"></path>
              <path
                d="M4.47227 11.9163C4.04491 10.6743 4.04491 9.32947 4.47227 8.0875V5.51172H1.08333C-0.363715 8.33737 -0.363715 11.6664 1.08333 14.4921L4.47227 11.9163Z"
                fill="#FBBC04"></path>
              <path
                d="M10.2002 3.95756C11.6547 3.93552 13.0605 4.47198 14.1139 5.45674L17.0268 2.60169C15.1824 0.904099 12.7344 -0.0292099 10.2002 0.000185607C6.34261 0.000185607 2.81497 2.13136 1.08301 5.51185L4.47195 8.08764C5.27795 5.71762 7.53849 3.95756 10.2002 3.95756Z"
                fill="#EA4335"></path>
            </g>
          </svg>
          Continue with Google
        </div>
        <div class="button-item" @click="loginHandler">
          <svg role="graphics-symbol" viewBox="0 0 170 170" class="appleLogo"
               style="width: 16px; height: 16px; display: block; fill: inherit; flex-shrink: 0; margin-right: 6px; margin-bottom: 2px;">
            <path
              d="m150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zm-31.26-123.01c0 8.1021-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.3113 11.45-8.597 4.62-2.2516 8.99-3.4968 13.1-3.71 0.12 1.0831 0.17 2.1663 0.17 3.2409z"></path>
          </svg>
          Continue with Apple
        </div>
        <div class="button-item active" @click="loginByEmail">
          <svg role="graphics-symbol" viewBox="0 0 30 30" class="key"
               style="width: 20px; height: 20px; display: block; fill: inherit; flex-shrink: 0; margin-right: 2px;">
            <path
              d="M14.757 4A5.724 5.724 0 009 9.748c0 2.364 1.389 4.456 3.586 5.335V23.6c0 .255.079.483.272.676l1.53 1.477a.578.578 0 00.808-.009l2.769-2.768a.598.598 0 000-.87l-1.591-1.574 2.232-2.232a.602.602 0 00-.017-.861l-2.171-2.18c2.628-1.116 4.087-3.13 4.087-5.511A5.733 5.733 0 0014.757 4zm0 5.344a1.55 1.55 0 01-1.547-1.547c0-.861.685-1.547 1.547-1.547a1.55 1.55 0 011.547 1.547 1.55 1.55 0 01-1.547 1.547z"></path>
          </svg>
          Single sign-on (SSO)
        </div>
      </div>
    </div>
    <div class="button-split-line"></div>
    <div class="login-form">
      <div class="form-wrap">
        <form>
          <label for="notion-email-input-2"
                 style="display: block; margin-bottom: 4px; font-size: 12px; color: rgb(120, 119, 116); font-weight: 500;">Email</label>
          <div class="notion-focusable-within"
               style="display: flex; align-items: center; width: 95%; font-size: 15px; line-height: 26px; position: relative; border-radius: 6px; box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset; background: transparent; cursor: text; padding: 4px 10px; margin-top: 4px; margin-bottom: 8px;">
            <input placeholder="Enter your email address..." type="email" autocomplete="username"
                   id="notion-email-input-2" aria-label="Enter your email address..."
                   v-model="form.email"
                   style="font-size: inherit; line-height: inherit;outline: none; border: none; background: none;user-select: none; width: 100%; display: block; resize: none; padding: 0px;">
          </div>
          <label for="notion-email-input-2"
                 style="display: block; margin-bottom: 4px; font-size: 12px; color: rgb(120, 119, 116); font-weight: 500;">Password</label>
          <div class="notion-focusable-within"
               style="display: flex; align-items: center; width: 95%; font-size: 15px; line-height: 26px; position: relative; border-radius: 6px; box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset; background: transparent; cursor: text; padding: 4px 10px; margin-top: 4px; margin-bottom: 8px;">
            <input placeholder="Enter your account password..." type="password" autocomplete="username"
                   id="notion-email-input-2" aria-label="Enter your account password..."
                   v-model="form.password"
                   style="font-size: inherit; line-height: inherit;outline: none; border: none; background: none;user-select: none; width: 100%; display: block; resize: none; padding: 0px;">
          </div>
          <div
            style="color: rgb(172, 171, 169); font-size: 12px; line-height: 16px; margin-top: 6px; margin-bottom: 18px; text-align: left; display: flex;">
            Use an organization email to easily collaborate with teammates
          </div>
          <div class="notion-focusable-within"
               style="display: flex; align-items: center; width: 95%; font-size: 14px; line-height: 20px; position: relative; border-radius: 4px; box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset; background: rgba(242, 241, 238, 0.6); cursor: text; padding: 0px; opacity: 0; height: 0px; pointer-events: none;">
            <input type="password" autocomplete="current-password" tabindex="-1" aria-hidden="true"
                   style="font-size: inherit; line-height: inherit; border: none; background: none; width: 100%; display: block; resize: none; padding: 0px;">
          </div>
          <div aria-disabled="false" role="button" tabindex="0" @click="continueBtnHandler"
               style="user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: inline-grid; align-items: center; justify-content: center; white-space: nowrap; height: 36px; border-radius: 4px; font-size: 14px; line-height: 1; padding-left: 12px; padding-right: 12px; font-weight: 500; background: rgb(35, 131, 226); box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset, rgba(15, 15, 15, 0.1) 0px 1px 2px; color: white; margin-top: 6px; margin-bottom: 12px; width: 95%;">
            <div style="display: flex; text-align: center; justify-content: center;">Continue</div>
          </div>

        </form>
        <div
          style="width: 100%; margin-top: 64px; margin-bottom: 0px; font-size: 12px; line-height: 16px; color: rgb(120, 119, 116); text-align: center; text-wrap: balance;">
          <p style="margin-bottom: 0px;">Your name and photo are displayed to users who invite you to a workspace using
            your email. By continuing, you acknowledge that you understand and agree to the <a
              href="https://www.notion.so/Personal-Use-Terms-of-Service-00e4e5d0f2b9411cbee6493f15779500"
              rel="noopener noreferrer" class="notion-link-blue"
              style="display: inline; color: rgb(172, 171, 169); text-decoration: none; user-select: none; cursor: pointer;">Terms
              &amp; Conditions</a> and <a href="https://www.notion.so/3468d120cf614d4c9014c09f6adc9091"
                                          rel="noopener noreferrer" class="notion-link-blue"
                                          style="display: inline; color: rgb(172, 171, 169); text-decoration: none; user-select: none; cursor: pointer;">Privacy
              Policy</a></p></div>
      </div>
    </div>
    <div class="no-account">
      No account ? <span @click="registerBtnHandler">Go Register Now</span>
    </div>
  </div>
</template>
<script>
import {userLoginApi} from "@/request/api"

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        email: '', // 邮箱
        password: '', // 密码
      }
    }
  },
  methods: {
    langClickHandler() {
      window.alert("暂时只支持英文")
    },
    // 点击icon回首页
    homeHandler(){
      this.$router.push('/')
    },
    // 通过邮箱账号登录
    loginByEmail() {

    },
    loginHandler() {
      this.$message.warning("暂不支持此登录方式")
    },
    registerBtnHandler() {
      this.$router.push('/register')
    },
    async continueBtnHandler() {
      console.log('form-->', this.form)
      try {
        if (!this.form.email) {
          this.$message.error("请填写邮箱")
          return
        }
        if (!this.form.password) {
          this.$message.error("请填写密码")
          return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
          this.$message.warning("请填写正确的邮箱")
          return
        }
        if (this.form.password.length <= 6) {
          this.$message.error("密码长度不能小于6")
          return
        }
        const params = {
          email: this.form.email,
          password: this.form.password
        }
        const {code, msg, data} = await userLoginApi(params)
        if (code === 200) {
          this.$message.success(msg)
          window.sessionStorage.setItem('token',data.token)
          window.sessionStorage.setItem('user',JSON.stringify(data.userInfo))
          setTimeout(() => {
            this.$router.push('/')
          },1000)
        }
      } catch (e) {
        console.error(`continue btn click error\n`, e)
      }
    }
  },
}
</script>
<style scoped lang="less">
.login-page {
  width: 1200px;
  margin: 0 auto;
  min-height: 200px;

  .login-title {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;

    .split-line {
      width: 1px;
      height: 30px;
      background-color: #f5f5f5;
    }

    .lang {
      display: flex;
      align-items: center;
      padding-left: 5px;
      cursor: pointer;

      span {
        margin-left: 5px;
      }
    }
  }

  .login-container {
    width: 100%;
    height: 113px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-wrap {
      .floor1 {
        font-size: 22px;
        font-weight: 600;
      }

      .floor2 {
        font-size: 22px;
        font-weight: 600;
        color: rgb(172, 171, 169);
      }
    }
  }

  .login-button {
    width: 100%;
    display: flex;
    flex-direction: column;

    .button-wrap {
      width: 340px;
      margin: 0 auto;

      .button-item {
        width: 340px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        border: 1px solid rgb(227, 226, 224);;
        border-radius: 6px;
        cursor: pointer;

        &.active {
          background-color: #ff6000;
          color: #fff;
        }
      }
    }
  }

  .button-split-line {
    width: 340px;
    margin: 20px auto;
    height: 1px;
    border-bottom: 1px solid rgba(227, 226, 224, 0.5);
  }

  .login-form {
    width: 100%;

    .form-wrap {
      width: 340px;
      height: 200px;
      margin: 0 auto;
    }
  }

  .no-account {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100px;
    align-items: center;
    font-size: 13px;

    span {
      text-decoration: underline;
      color: rgb(35, 131, 226);
      font-size: 16px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
</style>
