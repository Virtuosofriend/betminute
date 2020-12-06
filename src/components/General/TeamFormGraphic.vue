<template>
    <div class="teamform">

        <div 
            v-for="(data, index) in form"
            :key="index"
            class="teamform__icons"
            :class="{ 'win': data == 'W', 'loss': data == 'L', 'draw': data == 'D'}"
        >
            {{ data }}
        </div>
    </div>
</template>

<script>
export default {
    name:   "Team__form",

    props: {
        form: {
            required:   true,
            type:       String,
            default:    null
        }
    },

    data() {
        return {
            teamForm: ""
        }
    },

 
    watch: {
        form(newValue, oldValue) {
            if ( newValue != null ) {
                const values = newValue.split("");
                this.teamForm = values;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.teamform {
    display: flex;
    width: 100px;
    justify-content: center;
}

.teamform__icons {
    width: 100%;
    margin: auto .1em;
    border-radius: 5px;
    font-size: 12px;
    padding: .2em;
    text-align: center;
}

.teamform__icons.win {
    background-color: var(--theme-dark-success);
}

.teamform__icons.loss {
    background-color: var(--theme-dark-error);
}

.teamform__icons.draw {
    background-color: var(--theme-dark-warning);
}
</style>