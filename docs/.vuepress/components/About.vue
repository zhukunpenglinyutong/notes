<template>
    <div class="my-main-container">
        <div class="my-container">
          <el-card class="my-card" :body-style="{ padding: '0px' }">
              <div style="height: 50px; margin: 0;"></div>
              <a 
                class="my-avatar-link" 
                @click="clickAvatar"
                :class="{ 'my-rotate': canRotate }"
                >
                  <img class="my-avatar" :src="$withBase('/avatar.jpg')">
              </a>
              <div class="my-title" style="text-align: center">Xerrors</div>
              <br>
              <p>🚩</p>
              <p>计科大三在读</p>
              <p>菜鸡 弱鸡 垃圾</p>
              <br>
              <p>
                <img class="my-svg" :src="$withBase('/svg/quote-left.svg')" type="image/svg+xml"/>
                  敬畏代码 敬畏技术
                <img class="my-svg" :src="$withBase('/svg/quote-right.svg')" type="image/svg+xml"/>
              </p>
              <br>
              <p>💒</p>
              <p>江苏 · 无锡</p>
              <br>
              <div class="my-something">
                  <a href="https://github.com/zhukunpenglinyutong">
                    <img class="my-svg" :src="$withBase('/svg/github.svg')" type="image/svg+xml"/>
                  </a>
                  <a href="270750933@qq.com">
                    <img class="my-svg" :src="$withBase('/svg/mail.svg')" type="image/svg+xml"/>
                  </a>
                  <a href="https://dev.tencent.com/u/Xerrors">
                    <img class="my-svg" :src="$withBase('/svg/tencent.svg')" type="image/svg+xml"/>
                  </a>
              </div>
          </el-card>
          <div class="my-button-box">
            <div class="my-go-home">
              <router-link to="/" style="color: white;">Home</router-link>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      canRotate: false
    }
  },
  methods: {
    clickAvatar() {
      this.count += 1
      if (this.count > 10) {
        this.canRotate = true
      }
    }
  }
};
</script>

<style scoped>
.my-main-container {
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items: center;/*指定垂直居中*/
    width: 100%;
    height: 100vh;
    background:url(../public/dark.png) #444;
    user-select: none;
}

h1, h2, h3, p {
    color: #eee;
}
.my-title {
  color: #eee;
  font-size: 2.5rem;
}

.my-button-box {
  margin-top: 2rem;
  height: 3rem;
}

.my-go-home {
  opacity: 0;
  animation: showup 1s 0.5s forwards;
  color: white;
}

.my-container {
  margin: 0 auto;
  text-align: center;
}

.my-card {
    color: #c9e4d7;
    width: 370px;
    height: 600px;
    margin: 0 auto;
    border: 0px;
    /* animation: showup 1s forwards; */
}

.el-card__body{
  height: 100%;
}

.my-card *{
  display: block;
  margin: 5px auto;
}

.my-svg {
  margin: 5px;
  width: 25px; 
  height: 25px;
  display: inline-block;
}

.my-avatar {
  display: block;
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius:50%;
  border: 3px solid #ffffff
}

.my-something {
  margin: 0 auto;
  align-self: flex-end;
}

.my-something a {
  display: inline-block;
}

.my-rotate {
  animation: myrotate linear 2s infinite;
}

@keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

@keyframes showup {
  0% {
    transform: translateY(6rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes showbtn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes myrotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>