<template>
    <div class="navmenu-container">
        <div class="navbar" :class="{mgRnull: index === data.length - 1}"
             :style="ifBlock" v-for="(item,index) in data" :key="index"
             :mgSpan="index == data.length-1">
            <div class="nav-div" @click="item.disable == true? '':navClick(index,item)"
                 @mouseover="mouseoverMenu(index,item)" @mouseout="mouseoutMenu(index,item)"
                 :class="{actives:(active == index || over == index),menuStyle,disableClass: item.disable == true}">
                <img :src="(active == index || over == index) ? (item.iconActive? item.iconActive:item.icon) : item.icon"
                     class="icon" v-if="item.icon" name="caret">
                <dd class="dtdd" :style="dtPLeft" v-show="expand"><span>{{item.title}}</span></dd>
                <img class="arrow" :src="defArrow" alt="箭头" v-show="expand"
                     :class="{ imgActive:item.isSubShow && item.submenus}">
            </div>
            <div class="sub-menu" v-show="data[index].isSubShow">
                <div class="scorll-div" v-for="(sub,subindex) in data[index].submenus" :key="subindex"
                     :class="{actives: subindex === active2}"
                     @click="twoClick(subindex,sub,$event,index)" v-show="expand">
                    <!--<img :src="item.active === index ? (item.iconActive? item.iconActive:item.icon) : item.icon"-->
                    <!--class="icon" v-if="item.icon" name="caret">-->
                    <dd class="dtdd">{{sub.title}}</dd>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

	export default {
		props: {
			data: {
				type: Array,
				default() {
					return []
				}
			},
			actives: {// 设置选中样式
				type: String,
				default() {
					return ''
				}
			},
			blocks: {//‘block’是块级元素，其他都是行内元素
				type: String,
				default() {
					return 'block'
				}
			},
			dtPLeft: {//dt 设置块级元素的paddingLeft值
				type: String,
				default() {
					return 'padding-left:10%;'
				}
			},
			colorDd: {//dd 设置按钮的文本颜色//////不能要，不然选中的样式加不上
				type: String,
				default() {
					return ''
				}
			},
			menuStyle: {//设置整个按钮的样式
				type: String,
				default() {
					return ''
				}
			},
			mgSpan: {//有magin间距的导航，设置为数字，没有单位（默认是以%计算）
				type: String,
				default() {
					return '0'
				}
			},
			arrowShow: {//是否右侧箭头图标
				type: Boolean,
				default() {
					return true
				}
			},
			expand: {   //是否显示按钮文字和右侧图标180403添加
				type: Boolean,
				default: true
			},
			defArrow: {   //右侧图标180720添加
				type: String,
				default: require('./icons/arrowW.png')
			},
			clickActive1: {   //一级导航点击赋值180720添加
				type: [String, Number],
				default: 0
			},
			clickActive2: {   //一级导航点击赋值180720添加
				type: [String, Number],
				default: -1
			}
		},
		data() {
			return {
				active: this.clickActive1,
				over: this.active,
				subShow: false,
				active2: this.clickActive2
			}
		},
		computed: {
			navbarWidth() {
				return (100 - ((this.data.length - 1) * this.mgSpan)) / this.data.length + '%'
			},
			navbarStyle() {
				return [{
					'width': this.navbarWidth,
					'display': 'inline-block',
					'margin-right': this.mgSpan + '%'
				}]
			},
			ifBlock() {
				let b = [{'display': 'block', 'text-align': 'left'}]
				return this.blocks == 'block' ? b : this.navbarStyle
			}
		},
		methods: {
			mouseoverMenu(index, item) {
				this.over = index;
			},
			mouseoutMenu(index, item) {
				this.over = -1;
			},
			navClick(index, item) {
				//点击打开菜单
				this.active = index;
				this.active2 = -1;
				this.$emit('click', index, item)
				if (!item.isSubShow) {
					//点击一个让所有的菜单都关闭
					this.data.forEach(element => {
						element.isSubShow = false;
					});
					//当前的显示
					item.isSubShow = true;
					// console.log('当前打开')
				} else {
					//点击一个让所有的菜单都关闭
					this.data.forEach(element => {
						element.isSubShow = false;
					});
					//当前的关闭
					item.isSubShow = false;
					// console.log('当前关闭')
				}
			},
			twoClick(sindex, item, event, fidx) {
				this.active2 = sindex
				this.active = -1;
				this.$emit('click', sindex, item);// 180906将index值换成子节点index（不知其他地方有无影响）
				item.isSubShow = true;
				event.cancelBubble = true;
			}
		},
		mounted() {
			//让所有的菜单都关闭
			this.data.forEach(element => {
				element.isSubShow = false;
			});
		},
		created() {
		}
	}

</script>

<style scoped type="text/scss" lang="scss">


    .navmenu-container {
        font-size: 0.12rem;

        .navbar {
            line-height: 6vh;
            position: relative;
            .nav-div {
                width: 100%;
                min-height: 6vh;
                position: relative;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                clear: both;
                text-align: left;
                .imgActive {
                    transform: rotate(90deg);
                }
                /*&:hover {
                  background: #eee;
                }*/
            }
            /*&:hover {
                background-color: #424854;
                border-left: 5px solid #08874D;
                border-right: 5px solid #424854;
            }*/

            .actives {
                color: #409EFF;
            }
            .disableClass {
                cursor: not-allowed;
            }
            .disableClass:hover {
                background: transparent;
            }
            .icon {
                display: inline-block;
                transition: transform .3s;
                //0322改变布局
                position: absolute;
                left: 10px;
                margin: auto;
                top: 0;
                bottom: 0;
                z-index: 10;
            }
            img, span {
                vertical-align: middle;
            }
            .dtdd { //dd,dt
                height: 6vh;
                line-height: 6vh;
                font-size: 0.8vw;
                display: inline-block;
                vertical-align: middle;
                padding-left: 35%;
            }
            .arrow {
                position: absolute;
                right: 10%;
                margin: auto;
                top: 0;
                bottom: 0;
                z-index: 10;
            }
            dt {
                text-align: center;

                img {
                    vertical-align: middle;
                }
            }

            .sub-menu { //二级导航
                width: 100%;
                .scorll-div {
                    position: relative;
                    min-height: 6vh;
                    /*&:hover {
                      background: #eee;
                    }*/

                    dd {
                        display: block;
                        font-size: 12px;
                        cursor: pointer;
                        padding-left: 80px;
                        /*border-top: 1px solid #374954;*/
                    }
                    &:nth-last-child(1) dd {
                        /*border-bottom: 1px solid #374954;*/
                    }
                }

            }
        }
        /*.navbar:hover .scorll-div {*/
        /*-webkit-transform: translate(0, 0);*/
        /*-moz-transform: translate(0, 0);*/
        /*-ms-transform: translate(0, 0);*/
        /*transform: translate(0, 0);*/
        /*-webkit-transition: all 3s 1s;*/
        /*-moz-transition: all 3s 1s;*/
        /*-ms-transition: all 3s 1s;*/
        /*-o-transition: all 3s 1s;*/
        /*transition: all 3s 1s;*/
        /*}*/

        .mgRnull {
            margin-right: 0 !important;
        }
    }

</style>
