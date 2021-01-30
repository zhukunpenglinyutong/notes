<template>
	<div class="color-picker">
		
		<!-- 自己写的，借鉴 https://juejin.cn/post/6913729045997813768 -->
		<div @click="setTheme" class="toggle">
			<div class="night">🌜</div>
			<div class="day">🌞</div>
			<input type="checkbox" class="switch" :class="{'switch_uncheck': themeValue === 'light', 'switch_check': themeValue === 'dark'}" />
		</div>

	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import ModePicker from './ModePicker'
import applyMode from './applyMode'

export default {
  name: 'UserSettings',
  directives: {
    'click-outside': ClickOutside
  },
  components: {
    // ModePicker
  },
  data () {
    return {
	  themeValue: (new Date().getHours() >= 18 || new Date().getHours() < 6) ? 'dark' : 'light'
    }
  },
  // 为了在保证 modePicker 在 SSR 中正确开关，并实现管理，Mode 组件将负责 modePicker 关闭的情况
  mounted () {
	// modePicker 关闭时默认使用主题设置的模式
	// const themeMode = this.$themeConfig.mode || 'auto'
    // const { modePicker } = this.$themeConfig
    // if (modePicker === false) {
    //   // 为 'auto' 模式设置监听器
    //   if (themeMode === 'auto') {
    //     window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
    //       applyMode(themeMode)
    //     })
    //     window.matchMedia('(prefers-color-scheme: light)').addListener(() => {
    //       applyMode(themeMode)
    //     })
    //   }
	//   applyMode(themeMode)
	//   this.getThemeValue();
	// }
	// this.themeValue = document.documentElement.style.getPropertyValue('--card-color') == '#ffffff' ? 'light' : 'dark',
  },
  methods: {

	// 设置样式
    setTheme () {

		// 容错处理
		if (this.themeValue == '') {
			const hour = new Date().getHours()
			if (hour < 6 || hour >= 18) this.themeValue = 'dark'
			else this.themeValue = 'light'
		}

		// 设置属性
		this.themeValue == 'light'
			? applyMode('dark')
			: applyMode('light');

		this.getThemeValue();

	},

	// 获取当前是什么主题 暗：dark | 亮：light
	getThemeValue() {
		this.themeValue = document.documentElement.style.getPropertyValue('--card-color') == '#ffffff' ? 'light' : 'dark'
	}
  }
}
</script>

<style lang="stylus">
@require '../../styles/mode.styl'
.color-picker {
	position: relative;
	margin-right: 20px;

	.color-button {
		align-items: center;
		height: 100%;
		.iconfont {
			font-size 1.4rem
			color: $accentColor
		}
	}
	.color-picker-menu {
		position: absolute;
		top: 40px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 150;
		&.menu-transition-enter-active,
		&.menu-transition-leave-active {
			transition: all 0.25s ease-in-out;
		}
		&.menu-transition-enter,
		&.menu-transition-leave-to {
			top: 50px;
			opacity: 0;
		}
		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}
	}
}
@media (max-width: $MQMobile) {
	.color-picker {
		margin-right: 1rem;
		.color-picker-menu {
			left: calc(50% - 35px);
			&::before {
				left: calc(50% + 35px);
			}
		}
	}
}

.switch {
	width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #4d4d4d;
    position: relative;
    background-clip: content-box;
    display: inline-block;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    user-select: none;
    outline: none;
	cursor: pointer;
}
.switch::before {
	position: absolute;
    top: 1px;
    left: 1px;
    width: 20px;
    height: 20px;
    border: 1px solid #4d4d4d;
    border-radius: 50%;
    background-color: #fafafa;
    content: '';
    position: absolute;
    border-radius: 50%;
    margin: auto;
    transition: .3s;
	z-index: 3;
	cursor: pointer;
}

.switch_uncheck::before {
    left: 2px;
    transition: .3s;
}
.switch_check {
    background-color: #4d4d4d;
    transition: .6s;
}
.switch_check::before {
    left: 26px;
    transition: .3s;
}


.toggle {
	top: 1px;
	lef: -6px;
	cursor: pointer;
	position: relative;
}
.night {
	position: absolute;
	left: 10px;
	z-index: 2;
	top: -2px;
	user-select: none;
	cursor: pointer;
}
.day {
	position: absolute;
	z-index: 2;
    top: -2px;
    right: 10px;
	user-select: none;
	cursor: pointer;
}
</style>
