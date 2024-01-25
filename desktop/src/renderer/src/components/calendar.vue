<script setup>
import { ref, defineProps, onMounted, computed } from 'vue';

const weekDays = ref(['日', '一', '二', '三', '四', '五', '六']);
const viewModel = ref('full');
const today = new Date();
const select = ref(new Date());
const displayDays = ref([]);
onMounted(() => {
    // displayDays.value = getCurrentWeek(today);
    displayDays.value = getMonthDisplayDays(today);
});
const formatSelectTime = computed(() => {
    const { year, month, day } = getYearMonthDay(select.value);
    return `${year}年${month}月${day}日`;
});

function getCurrentWeek(date) {
    const monday = date - date.getDay() * 86400000;
    const week = [];
    for (let i = 0; i < 7; i++) {
        week.push(new Date(monday + 86400000 * i));
    }
    return week;
}

function getMonthDisplayDays(date) {
    const { year, month } = getYearMonthDay(date);
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayOfDisplay = firstDayOfMonth - firstDayOfMonth.getDay() * 86400000;
    const displayDays = [];
    for (let i = 0; i < 35; i++) {
        displayDays.push(new Date(firstDayOfDisplay + 86400000 * i));
    }
    return displayDays;
}

function getYearMonthDay(date) {
    // 获取年份、月份和天数 
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()返回的月份是从0开始计数的，所以需要加1
    const day = date.getDate();

    // 返回包含这些信息的对象
    return {
        year,
        month,
        day
    };
}

function isToday(date) {
    const { year, month, day } = getYearMonthDay(date);
    const { year: y, month: m, day: d } = getYearMonthDay(new Date());
    // console.log(year, month, day, y, m, d);
    return year === y && month === m && day === d;
}
function isSelect(date) {
    const { year, month, day } = getYearMonthDay(date);
    const { year: y, month: m, day: d } = getYearMonthDay(select.value);
    return year === y && month === m && day === d;
}
function isInSelectMonth(date) {
    const { year, month } = getYearMonthDay(date);
    const { year: y, month: m } = getYearMonthDay(select.value);
    console.log(year, month, y, m);
    return month != m;
}
function daySelect(date) {
    if (!isInSelectMonth(date)) {
        select.value = date;
    }
}
function spreadCalendarBody() {
    if (viewModel.value === '') {
        displayDays.value = getMonthDisplayDays(select.value);
        viewModel.value = 'full';
    } else {
        displayDays.value = getCurrentWeek(select.value);
        viewModel.value = '';
    }
}
</script>

<template>
    <div class="calendar card">
        <div class="calendar_info">
            <span>{{ formatSelectTime }}</span>
        </div>
        <div class="calendar_header">
            <span v-for="i in 7" :key="`_d${i}`" class="week">{{ weekDays[i - 1] }}</span>
        </div>
        <div class="calendar_body" :class="viewModel">
            <span v-for="day in displayDays" class="day"
                :class="{ 'current': isToday(day), 'select': isSelect(day), 'not-select-month': isInSelectMonth(day) }"
                @click="daySelect(day)">
                {{ day.getDate() }}
            </span>
        </div>
        <div class="calendar_floor" @click="spreadCalendarBody">
            <div class="tip_button" :class="viewModel"></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.calendar {
    --body-item-width: 60px;
    --body-item-height: 60px;
    --header-height: 40px;
    width: calc(var(--body-item-width) * 7);
    height: auto;
    padding: 8px;
    .calendar_info {
        height: 60px;
        font-size: 30px;
        font-family: SmileySans;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .calendar_header {
        width: calc(var(--body-item-width) * 7);
        height: var(--header-height);
        display: flex;
        justify-content: space-around;

        .week {
            width: var(--body-item-width);
            height: 100%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            font-family: SmileySans;
        }
    }

    .calendar_body {
        width: calc(var(--body-item-width) * 7);
        height: var(--body-item-height);
        display: flex;
        flex-wrap: wrap;
        .day {
            width: var(--body-item-width);
            height: var(--body-item-height);
            border: 2px solid #FFFFFF;
            border-radius: 8px;
            box-sizing: border-box;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            font-family: SmileySans;
        }

        .day.select {
            border-color: #409EFF;
        }

        .day.select.current {
            background-color: #409EFF;
        }
        .day.not-select-month {
            color: #909399;
        }
    }

    .calendar_body.full {
        height: calc(var(--body-item-height) * 5);
    }

    .calendar_floor {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .tip_button {
            height: 8px;
            width: 50px;
            border-radius: 500px;
            background: #A8ABB2;
        }
        .tip_button.full {
            background: #C0C4CC;
        }
    }
}</style>