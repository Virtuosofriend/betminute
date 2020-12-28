<template>
    <v-container>
            <div class="sidebar--wrapper">
                <div class="sidebar--intro">
                    <div class="sidebar--logo">
                        <img src="../assets/core/logo.png">
                        <h5>BetMinute</h5>
                    </div>

                    <div class="sidebar--user">
                        <img :src="avatar">
                    </div>

                    <div class="sidebar--user-info">
                        <p class="username">
                            {{ username }}
                            <span class="d-block">
                                {{ $t( `Sidebar.paid_${user.paid}` ) }}
                            </span>
                        </p>

                        <div class="stats">
                            <div class="stats--box">
                                <i class="fas fa-piggy-bank"></i> 
                                <p>
                                    {{ banka.banka_info.balance }} <span> {{ $t( `Banka.total` ) }}</span>
                                </p> 
                            </div>
                            <div class="stats--box">
                                <i class="fas fa-balance-scale"></i>
                                <p>
                                    {{ banka.banka_info.balance_daily }} <span>{{ $t( `Banka.daily` ) }}</span>
                                </p> 
                            </div> 
                        </div>
                    </div>
                </div>

                <div class="sidebar--menu">
                    <router-link 
                        v-for="links in menubar" 
                        :key="links.label" 
                        :to="{ name: links.path }"
                    >
                        {{ $t( `Sidebar.${links.path}` ) }}
                    </router-link>

                    <div class="sidebar--menu__logout">
                        <v-btn
                            text
                            color="error"
                            small
                            @click="logout()"
                        >
                            {{ $t( `Sidebar.logout` ) }}
                        </v-btn>
                    </div>
                </div>  
            </div>
        </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import menu from '../components/General/Menu';

export default {
    name:   "Menu__sidebar",

    data() {
        return {
            menubar:    menu.menubar,
            username:   localStorage.getItem("bm_user"),
            avatar:     localStorage.getItem("bm_avatar")
        }
    },

    computed: {
        ...mapGetters({
            user:       "user/information",
            banka:      "user/banka"
        }),

        ...mapState({
            socket:     state => state.socket.socket
        })
    },

    methods: {
        fetchUserBanka() {
            this.$store.dispatch("user/fetchUserBank");
        },

        logout() {
            this.$store.dispatch("auth/logout").then(() => {
                this.$router.push("/login");
            });
        },
    },

    watch: {
        socket(newVal) {
            if ( newVal == 1) {
                this.fetchUserBanka();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar--wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height:  100vh;
    padding-bottom: .5em;
    
}

.sidebar--intro {
    padding: 0em 0em 2em 0em;
    width: 100%;
}

.sidebar--logo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sidebar--logo img {
    width: 36px;
    object-fit: contain;
}

.sidebar--logo h5 {
    padding-left: .5em;
}

.sidebar--user {
    margin-top: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sidebar--user img {
    object-fit: contain;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid var(--theme-dark-10);
}

.sidebar--user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.username {
    padding: 2em 0em 1em 0em;
    width: 100%;
    color: var(--theme-dark-30);
    font-weight: 600;
    text-align: center;
}

.username span {
    color: var(--theme-dark);
    font-size: 80%;
}

.sidebar--user-info .stats {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 60px;
}
.sidebar--user-info .stats > .stats--box {
    width: 100%;
    text-align: center;
}

.sidebar--user-info .stats > .stats--box:last-of-type {
    border-left: 1px solid var(--theme-dark-border);
}

.sidebar--user-info .stats i {
    color: var(--theme-dark);
    margin-right: .5em;
}

.sidebar--user-info .stats p {
    color: var(--theme-dark-30);
    font-size: 12px;
    display: inline-block;
    font-weight: 600;
}

.sidebar--user-info .stats p span {
    color: var(--theme-dark);
    display: block;
    font-weight: 300;
}

.sidebar--menu {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4em  1.5em;
}

.sidebar--menu a {
    width: 100%;
    padding: .5em 1.5em;
    text-align: left;
    text-decoration: none;
    font-size: 14px;
    line-height: 28px;
    font-weight: 400;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    color: var(--theme-dark);
}

.sidebar--menu .sidebar--menu__logout {
    padding-left: 8px;
    margin-top: 50px;
}

.sidebar--menu__logout button {
    text-transform: initial;
    letter-spacing: initial;
    font-size: 14px;
    font-weight: 600;
}

.sidebar--menu a:last-child {
    margin-bottom: 2em;
}

.sidebar--menu a:hover {
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
    color: var(--theme-dark-active);
}

.sidebar--menu a.router-link-active {
    color: var(--theme-dark-active);
}

.sidebar--actions {
    width: 100%;
    display: flex;
    justify-content: center;
}

.sidebar--actions-low {
    margin-top: auto;
    padding: 2em 0em 0em 1.5em;
    width: 100%;
}

.sidebar--actions-low a {
    padding-left: 0em;
}

.sidebar--actions-low a:first-child {
    border-top: 1px solid var(--theme-dark-10);
    padding-top: 2em;
}
</style>