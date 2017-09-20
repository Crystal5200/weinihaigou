<template>
<div>
    <div class="quantity-selector clearfix">
        <span class="reduce" @click="reduce()" :class="{disable : val==1||count==0}">－</span>
        <input type="text" v-model="val" class="number" readonly="true" />
        <span class="add" @click="add()" :class="{disable : val==count||count==0}">＋</span>
    </div>
</div>
</template>


<script>
export default {
    props : ['number', 'count', 'index1', 'index2'],
    data : function() {
        return {
            // 如果你项修改传入组件的参数，那么就像下面这样写
            val :  this.number
        }
    },
    watch: {

        // 观察组件内部数量的变化，并通过$emit触发父组件的对应事件，从而将子组件数量的变化传递给父组件
        val() {
            if ( !/^\d*$/.test(this.val) || /^0/.test(this.val) ) {
                this.val = 1;
            }
            if ( parseInt(this.val) > this.count ) {
                this.val = this.count > 0 ? this.count : 1;
            }
            this.$emit('cb', {
                val : this.val,
                index1 : this.index1,
                index2 : this.index2
            });
        },

        // 观察父组件的库存变化，从而改变子组件的数量值（主要是当父组件的库存为0时，重置子组件的数量为1，并通过触发并通过$emit触发父组件的对应事件，从而将子组件数量的变化传递给父组件）
        count() {
            if ( this.count == 0 ) {
                this.val = 1;
            }
            this.$emit('cb', {
                val : this.val,
                index1 : this.index1,
                index2 : this.index2
            });
        }
    },
    mounted : function() {
        this.init();
        if ( this.val > this.count ) {
            this.val = this.count;
        }
    },
    methods : {
        add() {
            this.init();
            if ( this.val + 1 > this.count ) {
                return;
            }
            this.val += 1;
            this.$emit('cb1', {
                val : 1,
                index1 : this.index1,
                index2 : this.index2
            });
        },
        reduce() {
            this.init();
            if ( this.val - 1 <= 0 || this.count == 0 ) {
                return;
            }
            this.val -= 1;
            this.$emit('cb2', {
                val : -1,
                index1 : this.index1,
                index2 : this.index2
            });
        },
        init() {
            this.val = parseInt(this.val);
        }
    }
}
</script>

<style scoped>
.quantity-selector {
    width: 8.571rem;
    line-height: 2.9rem;
    border: 1px solid #d1d6e4;
    border-radius: 3px;
}
.quantity-selector .reduce,
.quantity-selector .add {
    float: left;
    width: 33.33%;
    border-right: 1px solid #d1d6e4;
    text-align: center;
    cursor: pointer;
}
.quantity-selector .number {
    float: left;
    width: 33.33%;
    height: 2.857rem;
    padding: .5rem 0;
    line-height: 1rem;
    border: none;
    text-align: center;
}
.quantity-selector .add {
    border-left: 1px solid #d1d6e4;
    border-right: none;
}
.quantity-selector  .disable {
    color: #d2d2d2;
}
</style>
